"use strict";

const express = require("express");
const pino = require("pino");
const expressPinoLogger = require("express-pino-logger");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const glob = require("glob");