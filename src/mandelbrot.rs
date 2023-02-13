use rayon::prelude::*;
use wasm_bindgen::{prelude::*, Clamped};

type RGBA = [u8; 4];

fn render_at(x: usize, y: usize, w: usize, h: usize, max_iter: usize) -> RGBA {
    let cx = x as f64 / w as f64 / 3.0 * 10.0 - 2.5;
    let cy = y as f64 / h as f64 / 3.0 * 10.0 - 1.7;

    let mut x = 0.;
    let mut y = 0.;
    let mut iter = 0;
    while iter < max_iter && x * x + y * y <= 100. {
        let x_temp = x * x - y * y + cx;
        y = 2. * x * y + cy;
        x = x_temp;
        iter += 1;
    }

    let r = iter as f64 / max_iter as f64;
    let c = (r * 255.) as u8;
    [c, c, c, if iter == max_iter { 0 } else { 255 }]
}

fn row(w: usize, h: usize, max_iter: usize, y: usize) -> impl Iterator<Item = u8> {
    (0..w).flat_map(move |x| render_at(x, y, w, h, max_iter))
}

fn col_par(w: usize, h: usize, max_iter: usize) -> impl ParallelIterator<Item = u8> {
    (0..h)
        .into_par_iter()
        .flat_map_iter(move |y| row(w, h, max_iter, y))
}

fn col(w: usize, h: usize, max_iter: usize) -> impl Iterator<Item = u8> {
    (0..h).flat_map(move |y| row(w, h, max_iter, y))
}

#[wasm_bindgen]
#[allow(dead_code)]
pub fn render(w: usize, h: usize, max_iter: usize, parallel: bool) -> Clamped<Vec<u8>> {
    crate::log!("Rendering {w}x{h} with {max_iter} iterations, multiThread: {parallel}");

    if parallel {
        Clamped(col_par(w, h, max_iter).collect())
    } else {
        Clamped(col(w, h, max_iter).collect())
    }
}
