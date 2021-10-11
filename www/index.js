import * as wasm from "mandelbrot-rs";


let canvas = document.getElementById('render-canvas');
let ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
});


let iter_slider = document.getElementById('iter-slider');
let iter_input = document.getElementById('iter-input');
let render = document.getElementById('render');

iter_slider.addEventListener('input', () => {
    iter_input.value = iter_slider.value;
});

iter_input.addEventListener('input', () => {
    if (iter_input.value > parseInt(iter_input.max)) {
        iter_input.value = iter_input.max;
    } else if (iter_input.value < parseInt(iter_input.min)) {
        iter_input.value = iter_input.min;
    }
    iter_slider.value = iter_input.value;
});

render.addEventListener('click', () => {
    wasm.render(parseInt(iter_input.value));
});

wasm.init();
wasm.render(parseInt(iter_input.value));
