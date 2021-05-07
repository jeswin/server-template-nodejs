import pg = require("pg");
import { startApp } from "..";
import request = require("supertest");
import { IDbConfig } from "psychopiggy";
import userIdExists from "./integrationTests/userIdExists";
import missingUserId from "./integrationTests/missingUserId";
import redirectsToConnect from "./integrationTests/redirectsToConnect";
import createsUser from "./integrationTests/createsUser";

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
