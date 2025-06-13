use actix_web::{web, web::Json, HttpResponse, Result as ActixResult};
use argon2::{Argon2, PasswordHasher};
use argon2::password_hash::{rand_core::OsRng, SaltString};
use serde::Serialize;
use crate::auth::auth_services::{get_token, AuthKeys, decode_token, TokenPayload};
use crate::models::users::{LoginInfo, NewUser};
use crate::db::DbPool;
use diesel::prelude::*;
use crate::schema::users;

#[derive(Serialize)]
pub struct RegisterResponse {
    pub message: String,
}

pub async fn register_handler(
    Json(register_info): web::Json<LoginInfo>,
    keys: web::Data<AuthKeys>,
    pool: web::Data<DbPool>,
) -> ActixResult<HttpResponse> {
    let email = &register_info.email; // Use email field if available
    let password = &register_info.password;
    
    if !is_valid_user(email, password).await {
        return Ok(HttpResponse::BadRequest().json(RegisterResponse {
            message: "Invalid email or password".to_string(),
        }));
    }
    let hashed_password = match hash_password(password).await {
        Ok(hash) => hash,
        Err(_) => {
            return Ok(HttpResponse::InternalServerError().json(RegisterResponse {
                message: "Failed to hash password".to_string(),
            }));
        }
    };
    
    let new_user = NewUser {
        username: email.clone(),  // Using email as username for now
        email: email.clone(),
        password_hash: hashed_password,
    };
    
    let mut conn = match pool.get() {
        Ok(conn) => conn,
        Err(_) => {
            return Ok(HttpResponse::InternalServerError().json(RegisterResponse {
                message: "Database connection failed".to_string(),
            }));
        }
    };
    
    match diesel::insert_into(users::table)
        .values(&new_user)
        .execute(&mut conn)
    {
        Ok(_) => {},
        Err(_) => {
            return Ok(HttpResponse::InternalServerError().json(RegisterResponse {
                message: "Failed to create user".to_string(),
            }));
        }
    }
    
    if let Err(_) = send_verification_email(email, &keys).await {
        return Ok(HttpResponse::InternalServerError().json(RegisterResponse {
            message: "Failed to send verification email".to_string(),
        }));
    }

    Ok(HttpResponse::Ok().json(RegisterResponse {
        message: "Registration successful. Verification email sent.".to_string(),
    }))
}

pub async fn hash_password(password: &str) -> Result<String, argon2::password_hash::Error> {
    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2.hash_password(password.as_bytes(), &salt)?;
    Ok(password_hash.to_string())
}

pub async fn is_valid_user(email: &str, password: &str) -> bool {
    !email.is_empty() && !password.is_empty() && email.contains('@')
}

pub async fn send_verification_email(email: &str, keys: &AuthKeys) -> Result<(), Box<dyn std::error::Error>> {
    let token = get_token(email.to_string(), &keys.encoding_key, Some(60 * 30)); // expires in 30 min
    let verification_link = format!("https://localhost:8000/api/auth/verify?token={}", token);

    let resend_api_key = std::env::var("RESEND_API_KEY")?;

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
        .await?;

    if res.status().is_success() {
        Ok(())
    } else {
        let error_msg = res.text().await.unwrap_or_default();
        eprintln!("Resend API error: {}", error_msg);
        Err("Email sending failed".into())
    }
}

pub async fn verification_link_handler(
    Json(payload): web::Json<TokenPayload>,
    keys: web::Data<AuthKeys>,
) -> ActixResult<HttpResponse> {
    match decode_token(&payload.token, &keys.decoding_key) {
        Ok(_claims) => {
            Ok(HttpResponse::Ok().json(RegisterResponse {
                message: "Email verified successfully.".to_string(),
            }))
        }
        Err(_) => {
            Ok(HttpResponse::Unauthorized().json(RegisterResponse {
                message: "Invalid or expired token".to_string(),
            }))
        }
    }
}