pub async fn login_handler(Json(loginInfo) : Json<LoginInfo>) -> Result<Json<LoginResponse>, StatusCode> {
    let email = &loginInfo.username;
    let password = &loginInfo.password;
    if !is_valid_user(email, password).await {
        return Err(StatusCode::UNAUTHORIZED);
    }
}

pub async fn is_valid_user(email: &str, password: &str) -> bool {
    !email.is_empty() && !password.is_empty()
}


pub async fn sendVerificationEmail(email: &str) -> Result<(), StatusCode> {
    

    Ok(())
}