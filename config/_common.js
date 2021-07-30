"use strict";

const path = require("path");
const rootPath = path.normalize(__dirname + "/..");

const appName = process.env.APP_NAME || "Scheduler Service";
const environment = process.env.NODE_ENV || "development";

module.exports = {
  appName,
  environment,
  rootPath,
};
