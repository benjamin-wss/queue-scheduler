"use strict";

const constants = {
  LEVELS: {
    FATAL: "fatal",
    ERROR: "error",
    WARN: "warn",
    INFO: "info",
    DEBUG: "debug",
    TRACE: "trace",
    SILENT: "silent",
  },
};

Object.freeze(constants);

module.exports = constants;
