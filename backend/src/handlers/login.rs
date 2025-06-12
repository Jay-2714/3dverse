pub async fn login_handler(Json(loginInfo) : Json<LoginInfo>) -> Result<Json<LoginResponse>, StatusCode> {
    let email = &loginInfo.username;
    let password = &loginInfo.password;
}

pub async fn is_valid_user(email: &str, password: &str) -> bool {
    
}

pub async fn sendVerificationEmail(email: &str) -> Result<(), StatusCode> {


    Ok(())
}