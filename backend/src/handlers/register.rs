use argon2::{self, Config};
use actix_web::{web::Json, HttpResponse, Responder, StatusCode};
use rand_core::OsRng;
use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, Transport};
use serde::{Deserialize, Serialize};
use lettre::{AsyncSmtpTransport, AsyncTransport, MessageBuilder};
use http::StatusCode;
use crate::auth_services::{get_token, AuthKeys, Claims,decode_token};

pub async fn registerHandler(Json(login_info): Json<LoginInfo>, keys: web::Data<AuthKeys>) -> Result<HttpResponse, StatusCode>{
    let email = &LoginInfo.username;
    let password = &LoginInfo.password;
    if !is_valid_user(email, password).await {
        return Err(StatusCode::UNAUTHORIZED);
    }
 
     let hashed_password = hash_password(password).await?;
    
        let _user = NewUserv{
            email: email.clone(),
            password_hash: hashed_password,
        };
    send_verification_email(email).await?;

    

     Ok(HttpResponse::Ok().body("Verification email sent"))
}

pub async fn hash_password(password: &str) -> Result<String> {
    let config = Config::default();
    let mut salt = [0u8; 16];
    OsRng.fill_bytes(&mut salt);
    let hash = argon2::hash_encoded(password.as_bytes(),&salt, &config)
        .map_err(StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(hash)
}

pub async fn is_valid_user(email: &str, password: &str) -> bool {
    !email.is_empty() && !password.is_empty()
}

pub async fn send_verification_email(email: &str, keys: &AuthKeys) -> Result<(), StatusCode> {
    let token = get_token(email.to_string(), &keys.encoding_key, Some(60 * 30)); // expires in 30 min
    let verification_link = format!("https://meshly.com/verify?token={}", token);

    let resend_api_key = std::env::var("RESEND_API_KEY")
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let body = serde_json::json!({
        "from": "onboarding@resend.dev",
        "to": [email],
        "subject": "Verify your email",
        "html": format!(
            "<p>Hello,</p><p>Click <a href=\"{}\">here</a> to verify your email address.</p>",
            verification_link
        )
    });

    let client = reqwest::Client::new();
    let res = client
        .post("https://api.resend.com/emails")
        .bearer_auth(resend_api_key)
        .json(&body)
        .send()
        .await
        .map_err(|e| {
            eprintln!("Failed to send request: {}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        })?;

    if res.status().is_success() {
        Ok(())
    } else {
        let error_msg = res.text().await.unwrap_or_default();
        eprintln!("Resend API error: {}", error_msg);
        Err(StatusCode::INTERNAL_SERVER_ERROR)
    }
}

pub async fn verification_link_handler(
    Json(payload): Json<TokenPayload>,
    keys: web::Data<AuthKeys>,
) -> Result<HttpResponse, StatusCode> {
    match decode_token(&payload.token, &keys.decoding_key) {
        Ok(claims) => {
           
            Ok(HttpResponse::Ok().body("Email verified successfully."))
        }
        Err(_) => Err(StatusCode::UNAUTHORIZED),
    }
}