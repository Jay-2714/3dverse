use chrono::Duration;
use serde::{Deserialize, Serialize};
use jsonWebToken::{EncodingKey, DecodingKey};
use ring::signature::{Ed25519KeyPair, KeyPair};


pub const STANDARD_REFRESH_TOKEN_EXPIRATION: i64 = 60 * 60 * 24 * 30;

pub struct Claims {
    pub sub: String,
    pub exp: usize,
}

pub struct AuthKeys {
    pub encoding_key: EncodingKey,
    pub decoding_key: DecodingKey,
}

pub async fn init_auth_keys() -> AuthKeys {
    let doc = Ed25519KeyPair::generate_pkc8(&ring::rand::SystemRandom::new()).unwrap();
    let encoding_key = EncodingKey::from_ed_der(doc.as_ref()).unwrap();
    let pair = Ed25519KeyPair::from_pkcs8(doc.as_ref()).unwrap();
    let decoding_key = DecodingKey::from_ed_der(pair.public_key().as_ref()).unwrap();

    AuthKeys {
        encoding_key,
        decoding_key,
    }
}

pub fn getToken(username: String, encoding_key: &EncodingKey,exp_duration_seconds: Option<i64>) -> String {
    let duration = if let None = exp_duration_seconds {
        STANDARD_REFRESH_TOKEN_EXPIRATION
    } 
    else {
        exp_duration_seconds.unwrap()
    };
    let Claims = Claims {
        sub: username,
        exp: (Utc::now() + Duration::seconds(duration)).timestamp() as usize,
    };
    let token = encode(&jsonWebToken::Header::new(jsonWebToken::Algorithm::EdDSA),&Claims, encoding_key).unwrap();

    token
}

pub fn decode_token(token: &str,decoding_key: &DecodingKey) -> Claims {
    let validation = Validation::new(Algorithm::EdDSA);
    let token_data = decode::<Claims>(token, decoding_key, &validation).unwrap();

    tokem_data.claims
}