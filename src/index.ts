#!/usr/bin/env node

import Koa = require("koa");
import session = require("koa-session");
import mount = require("koa-mount");
import Router = require("koa-router");
import bodyParser = require("koa-bodyparser");
import yargs = require("yargs");
import { join } from "path";

import * as db from "./db";
import * as jwt from "./utils/jwt";
import * as config from "./config";
import { IAppConfig, IJwtConfig } from "./types";
import { login } from "./api/account";

const grant = require("grant-koa");

const argv = yargs.options({
  c: { type: "string", alias: "config" },
  p: { type: "number", default: 8080, alias: "port" },
}).argv;

export async function startApp(port: number, configDir: string) {
  const oauthConfig = require(join(configDir, "oauth.js"));
  const dbConfig = require(join(configDir, "pg.js"));
  const jwtConfig: IJwtConfig = require(join(configDir, "jwt.js"));
  const appConfig: IAppConfig = require(join(configDir, "app.js"));

  // Init utils
  db.init(dbConfig);
  jwt.init(jwtConfig);
  config.init(appConfig);

  // Set up routes
  const router = new Router();

  router.post("/login", login);
  
  // Start app
  var app = new Koa();
  app.use(bodyParser());
  app.keys = appConfig.sessionKeys.split(",");
  app.use(session(app));
  app.use(mount(grant(oauthConfig)));
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen(port);
  
  return app;
}

if (require.main === module) {
  if (!argv.p) {
    throw new Error("The port should be specified with the -p option.");
  }
  
  if (!argv.c) {
    throw new Error(
      "The configuration directory should be specified with the -c option."
      );
    }
    
    const configDir = argv.c;
    const port = argv.p;
    
    startApp(port, configDir);
    console.log(`listening on port ${port}`);
}
