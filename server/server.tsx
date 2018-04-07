import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { hot } from "react-hot-loader";

import path from "path";
import serveStatic from "serve-static";
import setupMiddware from "./middleware";

import { App } from "../common/App";
import { apiRouter } from "./api";
import { connect } from "./db";

/* tslint:disable-next-line */
import "regenerator-runtime/runtime";

export const app = express();
export default app;

connect();
setupMiddware(app);

app.use("/dist", serveStatic(__dirname));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  //   const application = renderToString(<App />);

  const html = `<!doctype html>
    <html class="no-js" lang="">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>URL Shortener</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                /* http://meyerweb.com/eric/tools/css/reset/
                v2.0 | 20110126
                License: none (public domain)
                */

                html, body, div, span, applet, object, iframe,
                h1, h2, h3, h4, h5, h6, p, blockquote, pre,
                a, abbr, acronym, address, big, cite, code,
                del, dfn, em, img, ins, kbd, q, s, samp,
                small, strike, strong, sub, sup, tt, var,
                b, u, i, center,
                dl, dt, dd, ol, ul, li,
                fieldset, form, label, legend,
                table, caption, tbody, tfoot, thead, tr, th, td,
                article, aside, canvas, details, embed,
                figure, figcaption, footer, header, hgroup,
                menu, nav, output, ruby, section, summary,
                time, mark, audio, video {
                    margin: 0;
                    padding: 0;
                    border: 0;
                    font-size: 100%;
                    font: inherit;
                    vertical-align: baseline;
                }
                /* HTML5 display-role reset for older browsers */
                article, aside, details, figcaption, figure,
                footer, header, hgroup, menu, nav, section {
                    display: block;
                }
                html {
                    box-sizing: border-box;
                }
                *, *:before, *:after {
                    box-sizing: inherit;
                }
                body {
                    line-height: 1;
                    font-family: sans-serif;
                }
                ol, ul {
                    list-style: none;
                }
                blockquote, q {
                    quotes: none;
                }
                blockquote:before, blockquote:after,
                q:before, q:after {
                    content: '';
                    content: none;
                }
                table {
                    border-collapse: collapse;
                    border-spacing: 0;
                }
            </style>
        </head>
        <body style="margin:0">
            <div id="root"></div>
            <script src="/dist/client.js"></script>
        </body>
    </html>`;

  res.send(html);
});
