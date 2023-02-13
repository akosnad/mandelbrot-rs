# mandelbrot-rs
Mandelbrot in rust

## Running locally
- Install [wasm-pack](https://rustwasm.github.io/wasm-pack/)
- Clone this repo
- Run `wasm-pack build --target web` in repo root. This will build the Rust code to WebAssembly and pack it in a Webpack-parseable module.
- Change to the `www/` folder
- Run `npm install`
- Run `npm start` to build the Webpack project and start a local web server.
