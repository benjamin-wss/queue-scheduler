"use strict";

const express = require("express");
const router = express.Router();

const ROUTER_PREFIX = "/";

router.get("/", (request, response) => {
  // #swagger.operationId = 'getPierreGreetingMessage'
  // #swagger.tags = ['Health Check']
  // #swagger.description = 'Just a page to serve JSON indicating that the service is up.'
  /* #swagger.responses[200] = {
         schema: { $ref: "#/definitions/RootRouteHealthMessage" },
         description: "Endpoint response"
  } */

  response.status(200);
  response.json({
    status: "Ah La Vache! The server actually runs!",
    timeStamp: new Date().toISOString(),
    headers: Object.assign({}, request.headers),
  });
});

module.exports = {
  ROUTER_PREFIX,
  router,
};
