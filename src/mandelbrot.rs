pub fn render(iter_max: usize) {
    let c = crate::utils::context();
    let (w, h) = (crate::utils::canvas().width(), crate::utils::canvas().height());

    c.set_fill_style(&"black".into());
    c.fill_rect(0., 0., w as f64, h as f64);

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

            let intensity = iter as f64 / iter_max as f64;
            c.set_fill_style(&format!("rgb({c}, {c}, {c})", c=(intensity * 255.) as usize).as_str().into());
            c.fill_rect(i as f64, j as f64, 1., 1.,)
        }
    }
}