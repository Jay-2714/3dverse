use actix_web::{web, web::Json, HttpResponse, Result as ActixResult};
use argon2::{Argon2, PasswordVerifier};
use argon2::password_hash::PasswordHash;
use serde::Serialize;
use crate::auth::auth_services::{get_token, AuthKeys};
use crate::models::users::{LoginInfo, LoginResponse, User};
use crate::db::DbPool;
use diesel::prelude::*;
use crate::schema::users;

#[derive(Serialize)]
pub struct ErrorResponse {
    pub message: String,
}

pub async fn login_handler(
    Json(login_info): web::Json<LoginInfo>,
    keys: web::Data<AuthKeys>,
    pool: web::Data<DbPool>,
) -> ActixResult<HttpResponse> {
    let email = &login_info.email;
    let password = &login_info.password;
    
    if !is_valid_user(email, password).await {
        return Ok(HttpResponse::BadRequest().json(ErrorResponse {
            message: "Invalid email or password format".to_string(),
        }));
    }
    
    // Get database connection
    let mut conn = match pool.get() {
        Ok(conn) => conn,
        Err(_) => {
            return Ok(HttpResponse::InternalServerError().json(ErrorResponse {
                message: "Database connection failed".to_string(),
            }));
        }
    };
    
    // Find user by email
    let user_result: Result<User, diesel::result::Error> = users::table
        .filter(users::email.eq(&login_info.email))
        .first(&mut conn);
    
    let user = match user_result {
        Ok(user) => user,
        Err(diesel::result::Error::NotFound) => {
            return Ok(HttpResponse::Unauthorized().json(ErrorResponse {
                message: "Invalid credentials".to_string(),
            }));
        }
        Err(_) => {
            return Ok(HttpResponse::InternalServerError().json(ErrorResponse {
                message: "Database error".to_string(),
            }));
        }
    };
    
    // Verify password
    let is_valid = verify_password(password, &user.password_hash).await;
    
    if !is_valid {
        return Ok(HttpResponse::Unauthorized().json(ErrorResponse {
            message: "Invalid credentials".to_string(),
        }));
    }
    
    // Generate JWT token
    let token = get_token(user.email.clone(), &keys.encoding_key, None);
    
    Ok(HttpResponse::Ok().json(LoginResponse { token }))
}

pub async fn verify_password(password: &str, hash: &str) -> bool {
    let parsed_hash = match PasswordHash::new(hash) {
        Ok(hash) => hash,
        Err(_) => return false,
    };
    
    let argon2 = Argon2::default();
    argon2.verify_password(password.as_bytes(), &parsed_hash).is_ok()
}

pub async fn is_valid_user(user_email: &str, user_password: &str) -> bool {
    !user_email.is_empty() && !user_password.is_empty() && user_email.contains('@')
}