import * as Comlink from "comlink";

async function render(ctx, handlers, width, height, maxIter) {
  ctx.fillStyle = "white";
  ctx.font = "30px monospace";
  ctx.fillText("Rendering...", 10, 50);

  let handler = handlers.supportsThreads
    ? handlers.multiThread
    : handlers.singleThread;

  let data = await handler({
    width,
    height,
    maxIter,
  });

  const imageData = new ImageData(data, width, height);
  ctx.putImageData(imageData, 0, 0);
}

(async () => {
  let canvas = document.getElementById("render-canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * window.devicePixelRatio;
  canvas.height = window.innerHeight * window.devicePixelRatio;

  let worker = Comlink.wrap(
    new Worker(new URL("./worker.js", import.meta.url), { type: "module" })
  );
  let handlers = await worker.handlers;

  let lastResize = 0;
  window.addEventListener("resize", () => {
    if (new Date() - lastResize < 1000) {
      return;
    }

    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    render(ctx, handlers, canvas.width, canvas.height, 100);

    lastResize = new Date();
  });

  render(ctx, handlers, canvas.width, canvas.height, 100);
})();
