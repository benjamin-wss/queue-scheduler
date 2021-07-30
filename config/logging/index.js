"use strict";

const { EnvironmentVariables } = require("../../utilities");
const CONSTANTS = require("../../constants/logging");

const config = {
  httpServer: {
    level: process.env.LOG_LEVEL || CONSTANTS.LEVELS.TRACE,
    prettyPrint: EnvironmentVariables.getAsBoolean({
      name: "LOG_PRETTY_PRINT",
      defaultValue: 1,
    }),
  },
  app: {
    level: process.env.LOG_LEVEL || CONSTANTS.LEVELS.TRACE,
    prettyPrint: EnvironmentVariables.getAsBoolean({
      name: "LOG_PRETTY_PRINT",
      defaultValue: 1,
    }),
  },
};

Object.seal(config);

module.exports = config;
