"use strict";

const { appName, environment, rootPath } = require("./_common");

const config = {
  rootPath,
  appSetup: {
    appName,
    environment,
  },
  httpServerSetup: require("./http"),
  logging: require("./logging"),
};

Object.freeze(config);

module.exports = config;
