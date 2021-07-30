const pino = require("pino");

const config = require("./config");
const constants = require("./constants/logging");

const pinoParams = {
  name: `Application Logic - ${config.appSetup.appName} - ${config.appSetup.environment}`,
  level: config.logging.app.level,
};

if (config.logging.app.prettyPrint) {
  pinoParams.prettyPrint = { colorize: true };
}

const logger = pino(pinoParams);

function writeFatalMessage({ message, additionalMetadata = null }) {
  return writeLogMessage({
    message,
    additionalMetadata,
    level: constants.LEVELS.FATAL,
  });
}

function writeInfoMessage({ message, additionalMetadata = null }) {
  return writeLogMessage({
    message,
    additionalMetadata,
    level: constants.LEVELS.INFO,
  });
}

function writeErrorMessage({ message, additionalMetadata = null }) {
  return writeLogMessage({
    message,
    additionalMetadata,
    level: constants.LEVELS.ERROR,
  });
}

function writeDebugMessage({ message, additionalMetadata = null }) {
  return writeLogMessage({
    message,
    additionalMetadata,
    level: constants.LEVELS.DEBUG,
  });
}

function writeLogMessage({
  message,
  level = constants.LEVELS.FATAL,
  additionalMetadata = null,
}) {
  if (!additionalMetadata) {
    logger[level](message);
    return;
  }

  logger[level](additionalMetadata, message);
}

module.exports = {
  writeErrorMessage,
  writeDebugMessage,
  writeInfoMessage,
  writeFatalMessage,
  writeLogMessage,
};
