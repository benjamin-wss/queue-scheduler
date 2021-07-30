"use strict";

const { EnvironmentVariables } = require("../../utilities");

const config = {
  port: EnvironmentVariables.getAsNumber({
    name: "HTTP_PORT",
    defaultValue: 3000,
  }),
};

Object.freeze(config);

module.exports = config;
