#!/usr/bin/env node

import Koa = require("koa");
import Router = require("koa-router");
import bodyParser = require("koa-bodyparser");
import { join } from "path";
import * as db from "./db";
import * as config from "./config";
import { IAppConfig } from "./types";
import { createUser } from "./api/users";

const grant = require("grant-koa");

export async function init(configDir: string) {
  const dbConfig = require(join(configDir, "db.js"));
  const appConfig: IAppConfig = require(join(configDir, "app.js"));

  // Init utils
  db.init(dbConfig);
  config.init(appConfig);

  // Set up routes
  const router = new Router();

  /* Create a new user */
  router.post(`/users`, createUser);

  // Start app
  var app = new Koa();
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}

if (require.main === module) {
  if (!process.env.PORT) {
    throw new Error("The port should be specified in process.env.PORT");
  }

  if (!process.env.CONFIG_DIR) {
    throw new Error(
      "The configuration directory should be specified in process.env.CONFIG_DIR"
    );
  }

  const port: number = parseInt(process.env.PORT);

  init(process.env.CONFIG_DIR).then(app => {
    app.listen(port);
    console.log(`listening on port ${port}`);
  });
}
