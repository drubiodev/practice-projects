use actix_files::NamedFile;
use actix_web::{web, App, HttpServer, Result};

const ADDRESS: &str = "127.0.0.1:8080";

async fn index() -> Result<NamedFile> {
    Ok(NamedFile::open("./static/index.html")?)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Listening on port 8080");
    HttpServer::new(|| App::new().route("/", web::get().to(index)))
        .bind(ADDRESS)?
        .run()
        .await
}
