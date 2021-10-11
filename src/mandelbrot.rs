use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[allow(dead_code)]
pub async fn render(iter_max: usize) {
    let c = crate::utils::context();
    let (w, h) = (crate::utils::canvas().width() as usize, crate::utils::canvas().height() as usize);
    let mut buf = vec![vec![0; h]; w];
    let mut most_iterations = 0;

    for j in 0..h {
        for i in 0..w {
            let cx = i as f64 / w as f64 / 3.0 * 10.0 - 2.5;
            let cy = j as f64 / h as f64 / 3.0 * 10.0 - 1.7;

            let mut x = 0.;
            let mut y = 0.;
            let mut iter = 0;
            while iter < iter_max && x*x + y*y <= 100.{
                let x_temp = x*x - y*y + cx;
                y = 2. * x * y + cy;
                x = x_temp;
                iter += 1;
            }
            if iter > most_iterations {
                most_iterations = iter;
            }

            buf[i][j] = iter;
        }
    }

    for j in 0..h {
        for i in 0..w {
            let intensity = if buf[i][j] == iter_max {
                    0.
                } else {
                    buf[i][j] as f64 / iter_max as f64
                };
            c.set_fill_style(
                &format!(
                    "hsl({h}, {s}%, {l}%)",
                    h=intensity * 360.,
                    s=100.,
                    l=intensity * 100.,
                ).as_str().into()
            );
            c.fill_rect(i as f64, j as f64, 1., 1.,)
        }
    }
}
