use actix_web::{web, web::Json, HttpResponse, Result as ActixResult};
use serde::Serialize;
use crate::auth::auth_services::{decode_token, AuthKeys, TokenPayload};

#[derive(Serialize)]
pub struct VerifyResponse {
    pub message: String,
    pub user: Option<UserInfo>,
}

#[derive(Serialize)]
pub struct UserInfo {
    pub email: String,
    pub verified: bool,
}

pub async fn verify_token_handler(
    Json(payload): web::Json<TokenPayload>,
    keys: web::Data<AuthKeys>,
) -> ActixResult<HttpResponse> {
    match decode_token(&payload.token, &keys.decoding_key) {
        Ok(claims) => {
            Ok(HttpResponse::Ok().json(VerifyResponse {
                message: "Token is valid".to_string(),
                user: Some(UserInfo {
                    email: claims.sub,
                    verified: true,
                }),
            }))
        }
        Err(_) => {
            Ok(HttpResponse::Unauthorized().json(VerifyResponse {
                message: "Invalid or expired token".to_string(),
                user: None,
            }))
        }
    }
}

pub async fn verify_email_handler(
    Json(payload): web::Json<TokenPayload>,
    keys: web::Data<AuthKeys>,
) -> ActixResult<HttpResponse> {
    match decode_token(&payload.token, &keys.decoding_key) {
        Ok(_claims) => {
            // In a real application, you would update the user's email_verified status in the database
            Ok(HttpResponse::Ok().json(VerifyResponse {
                message: "Email verified successfully".to_string(),
                user: None,
            }))
        }
        Err(_) => {
            Ok(HttpResponse::Unauthorized().json(VerifyResponse {
                message: "Invalid or expired verification token".to_string(),
                user: None,
            }))
        }
    }
}
