"use strict";

const express = require("express");
const pino = require("pino");
const expressPinoLogger = require("express-pino-logger");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const glob = require("glob");

const logger = require("./logger");

const config = require("./config");

const app = express();

const nodeEnv = config.appSetup.environment;

app.locals.ENV = nodeEnv;

const pinoExpressParams = {
  name: `HTTP Server - ${config.appSetup.name} - ${nodeEnv}`,
  level: config.logging.httpServer.level,
};
if (config.logging.httpServer.prettyPrint) {
  pinoExpressParams.prettyPrint = { colorize: true };
}
const httpServerLoggerBase = pino(pinoExpressParams);
const httpServerLogger = expressPinoLogger({
  logger: httpServerLoggerBase,
});
app.use(httpServerLogger);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(compression());

const controllers = glob.sync(`${config.rootPath}/controllers/*.js`);
controllers.forEach((controller) => {
  const { ROUTER_PREFIX, router } = require(controller);
  app.use(ROUTER_PREFIX, router);
});

// 404 error handing setup
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.httpErrorCode = 404;
  next(err);
});

// general error handing setup
app.use((error, req, res, next) => {
  const status = error.httpErrorCode || 500;
  res.status(status);

  if (config.app.environment !== "production") {
    // ensures error object gets all details
    const jsonString = JSON.stringify(error, (key, value) => {
      if (value instanceof Error) {
        const error = {};

        Object.getOwnPropertyNames(value).forEach((key) => {
          error[key] = value[key];
        });

        return error;
      }

      return value;
    });
    const jsonObject = JSON.parse(jsonString);
    res.send({
      ...jsonObject,
    });
    return;
  }

  res.json({
    status,
    message: error.message,
  });
});

function startExpressServer() {
  return new Promise((resolve, reject) => {
    const httpPort = config.httpServerSetup.port;
    app.listen(httpPort, (error) => {
      if (error) {
        logger.writeErrorMessage({
          message: "Error starting express server",
          additionalMetadata: error,
        });
        reject(error);
      } else {
        logger.writeInfoMessage({
          message: `Express server listening on port ${httpPort}.`,
        });
        resolve();
      }
    });
  });
}

async function initServer() {
  await startExpressServer();
}

initServer()
  .then(() => logger.writeInfoMessage({ message: "Startup routine complete." }))
  .catch((error) => {
    logger.writeFatalMessage({
      message: "Server startup failed.",
      additionalMetadata: error,
    });
  });
