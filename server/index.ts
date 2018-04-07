/// <reference types="webpack-env" />
import http from "http";
import * as app_module from "./server";

// /* tslint:disable-next-line:no-submodule-imports no-var-requires */
// const { error } = require("dotenv").config();
// if (error) {
//   throw error;
// }

/* tslint:disable-next-line */
let a: typeof app_module = require("./server.tsx") as any;

const server = http.createServer(app_module.app);
let currentApp = app_module.app;
server.listen(3000);

if (module.hot) {
  module.hot.accept("./server.tsx", () => {
    a = require("./server.tsx") as any;
    server.removeListener("request", currentApp);
    server.on("request", a.app);
    currentApp = a.app;
  });
}
