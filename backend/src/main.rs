use actix_web::{ App, HttpServer, middleware::Logger};
use actix_cors::Cors;

mod auth;
use auth::auth_services::{init_auth_keys, AuthKeys};

use db::{connect_db, DbPool};
mod db;

pub struct AppState {
    pub db_pool: DbPool,
    pub auth_keys: AuthKeys,
}

#[actix_web::main] 
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    let db_pool = connect_db();
    let auth_keys = init_auth_keys().await;
    let app_data = actix_web::web::Data::new(AppState{
        db_pool,
        auth_keys,

    });
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .expose_headers(vec!["Authorization"])
            .max_age(3600);

        App::new()
            .wrap(Logger::default())
            .wrap(cors)
            .app_data(app_data.clone())
             .route("/verify", web::post().to(verification_link_handler))
    
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
