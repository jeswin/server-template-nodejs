import pg = require("pg");
import { startApp } from "../..";
import request = require("supertest");
import { IDbConfig } from "psychopiggy";
import userIdExists from "./userIdExists";
import missingUserId from "./missingUserId";
import redirectsToConnect from "./redirectsToConnect";
import createsUser from "./createsUser";

let app: any;

export default function run(
  dbConfig: IDbConfig,
  port: number,
  configDir: string
) {
  describe("service", async () => {
    let app: any;

    before(async () => {
      const service = await startApp(port, configDir);
      app = service.listen();
    });

    userIdExists(app, dbConfig);
    missingUserId(app, dbConfig);
    redirectsToConnect(app, dbConfig);
    createsUser(app, dbConfig);
  });
}
