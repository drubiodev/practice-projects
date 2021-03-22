use std::net::{TcpListener, TcpStream};
use std::{
    io::{prelude, Read},
    ops::Add,
};

const ADDRESS: &str = "127.0.0.1:7878";

fn main() {
    let listener = TcpListener::bind(ADDRESS).unwrap();

    println!("Listening on http://{}", ADDRESS);

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 1024];

    stream.read(&mut buffer).unwrap();

    println!("Request: {}", String::from_utf8_lossy(&buffer[..]));
}
