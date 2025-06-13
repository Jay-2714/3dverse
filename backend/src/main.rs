use actix_web::{web, App, HttpServer, middleware::Logger};
use actix_cors::Cors;


mod handlers;
mod db;
mod auth;
mod models;
mod schema;

use handlers::{register, login};
use auth::auth_services::{init_auth_keys};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    
    // Initialize auth keys
    let auth_keys = init_auth_keys().await;
    
    // Create a shared database pool
    let db_pool = db::connect_db();
    
    // Start HTTP server
    HttpServer::new(move || {
        // Configure CORS
        let cors = Cors::default()
            .allow_any_origin() // In production, specify exact origins
            .allow_any_method()
            .allow_any_header()
            .expose_headers(vec!["Authorization"])
            .max_age(3600);
        
        // Configure app
        App::new()
            .app_data(web::Data::new(db_pool.clone()))
            .app_data(web::Data::new(auth_keys.clone()))
            .wrap(cors)
            .wrap(Logger::default())
            .route("api/auth/register", web::post().to(register::register_handler))
            .route("/login", web::post().to(login::login_handler))
            .route("api/auth/verify", web::post().to(register::verification_link_handler))
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}