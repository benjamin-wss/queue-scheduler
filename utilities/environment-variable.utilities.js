"use strict";

const Yup = require("yup");

function getAsString({ name, defaultValue = null }) {
  const value = process.env[name];

  const isValid = Yup.string()
    .required()
    .min(1)
    .trim()
    .strict()
    .isValidSync(value);

  if (!isValid && (defaultValue === null || defaultValue === undefined)) {
    throw new Error(
      `The environment variable (${name}) is not set and has no default.`
    );
  }

  if (!isValid && defaultValue !== null && defaultValue !== undefined) {
    return defaultValue;
  }

  return value.trim();
}

function getAsNumber({ name, defaultValue = null }) {
  const baseValue = getAsString({ name, defaultValue });
  const numberValue = Number.parseFloat(baseValue);

  const isValid = Yup.number().required().isValidSync(baseValue);

  if (!isValid) {
    throw new Error(
      `The environment variable (${name}) is not a valid number. Supplied value ${baseValue}.`
    );
  }

  return numberValue;
}

function getAsInteger({ name, defaultValue = null }) {
  const value = getAsNumber({ name, defaultValue });

  const isValid = Yup.number().required().integer().isValidSync(value);

  if (!isValid) {
    throw new Error(
      `The environment variable (${name}) is not a valid integer. Supplied value ${value}.`
    );
  }

  return Number.parseInt(value, 10);
}

function getAsBoolean({ name, defaultValue = null }) {
  const value = getAsInteger({ defaultValue, name });

  const isValid = Yup.number()
    .required()
    .integer()
    .min(0)
    .max(1)
    .isValidSync(value);

  if (!isValid) {
    throw new Error(
      `The environment variable (${name}) cannot be parsed properly. Accepted values are 1 which is true and 0 which is false. Supplied value ${value}.`
    );
  }

  return value === 1 ? true : false;
}

module.exports = {
  getAsString,
  getAsNumber,
  getAsInteger,
  getAsBoolean,
};
