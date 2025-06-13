use serde::{Deserialize, Serialize};
use chrono::{Utc, Duration};
use jsonwebtoken::{encode, decode, Validation, Algorithm, EncodingKey, DecodingKey};
use std::fs;

pub const STANDARD_REFRESH_TOKEN_EXPIRATION: i64 = 60 * 60 * 24 * 30;

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

#[derive(Clone)]
pub struct AuthKeys {
    pub encoding_key: EncodingKey,
    pub decoding_key: DecodingKey,
}

#[derive(Deserialize)]
pub struct TokenPayload {
    pub token: String,
}

/// Initialize RSA keys from PEM files
pub async fn init_auth_keys() -> AuthKeys {
    let private_key = fs::read("keys/private_key.pem").expect("Failed to read private key");
    let public_key = fs::read("keys/public_key.pem").expect("Failed to read public key");

    let encoding_key = EncodingKey::from_rsa_pem(&private_key).expect("Invalid RSA private key");
    let decoding_key = DecodingKey::from_rsa_pem(&public_key).expect("Invalid RSA public key");

    AuthKeys {
        encoding_key,
        decoding_key,
    }
}

/// Generate JWT token
pub fn get_token(username: String, encoding_key: &EncodingKey, exp_duration_seconds: Option<i64>) -> String {
    let duration = exp_duration_seconds.unwrap_or(STANDARD_REFRESH_TOKEN_EXPIRATION);

    let claims = Claims {
        sub: username,
        exp: (Utc::now() + Duration::seconds(duration)).timestamp() as usize,
    };

    encode(
        &jsonwebtoken::Header::new(Algorithm::RS256),
        &claims,
        encoding_key,
    )
    .expect("Token generation failed")
}

pub fn decode_token(token: &str, decoding_key: &DecodingKey) -> Result<Claims, jsonwebtoken::errors::Error> {
    let validation = Validation::new(Algorithm::RS256);
    let token_data = decode::<Claims>(token, decoding_key, &validation)?;
    Ok(token_data.claims)
}