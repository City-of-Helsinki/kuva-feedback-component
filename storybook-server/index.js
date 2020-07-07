/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");

const express = require("express");

const setupDevOpsMiddleware = require("./setupDevopsMiddleware");
const setupProdMiddleware = require("./setupProdMiddleware");
const { setSignalReady } = require("./signalReadyUtil");

const app = express();

setupDevOpsMiddleware(app);
setupProdMiddleware(app, {
  outputPath: resolve(process.cwd(), "storybook-static"),
  publicPath: "/",
});

// get the intended host and port number, use localhost and port 6006 if not provided
const host = process.env.HOST || null; // Let http.Server use its default IPv6/4 host
const port = process.env.PORT || 6006;

// use the gzipped bundle
app.get("*.js", (req, res, next) => {
  req.url = req.url + '.gz'; // eslint-disable-line
  res.set("Content-Encoding", "gzip");
  next();
});

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    return console.error(err.message);
  }

  setSignalReady();

  // eslint-disable-next-line no-console
  console.log(`App started: ${host}:${port}`);
});
