import * as wasm from "mandelbrot-rs";


let canvas = document.getElementById('render-canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

wasm.run();