import { threads } from "wasm-feature-detect";
import * as Comlink from "comlink";

function wrapExports({ render }, parallel) {
  return ({ width, height, maxIter }) => {
    const data = render(width, height, maxIter, parallel);
    return Comlink.transfer(data, [data.buffer]);
  };
}

async function initHandlers() {
  let [singleThread, multiThread] = await Promise.all([
    (async () => {
      const singleThread = await import("../pkg");
      await singleThread.default();
      singleThread.set_panic_hook();
      return wrapExports(singleThread, false);
    })(),
    (async () => {
      // If threads are unsupported in this browser, skip this handler.
      if (!(await threads())) return;
      const multiThread = await import("../pkg");
      await multiThread.default();
      await multiThread.initThreadPool(navigator.hardwareConcurrency);
      multiThread.set_panic_hook();
      return wrapExports(multiThread, true);
    })(),
  ]);

  return Comlink.proxy({
    singleThread,
    supportsThreads: !!multiThread,
    multiThread,
  });
}

Comlink.expose({
  handlers: initHandlers(),
});
