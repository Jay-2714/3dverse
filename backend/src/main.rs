use actix_web::{web, App, HttpServer, middleware::Logger};
use actix_cors::Cors;

mod db;

#[actix_web::main] 
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let db_pool = db::connect_db().await;

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
            .app_data(web::Data::new(db_pool.clone()))
            // Add your routes here
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
