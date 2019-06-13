import pg = require("pg");
import { init } from "../";
import request = require("supertest");
import { IDbConfig } from "psychopiggy";
import * as userModule from "../domain/user";
import { RouterContext } from "koa-router";

let app: any;

export default function run(dbConfig: IDbConfig, configDir: string) {
  describe("service", async () => {
    let app: any;

    before(async () => {
      const service = await init(configDir);
      app = service.listen();
    });

    it("tests something", async () => {
      const pool = new pg.Pool(dbConfig);
      await pool.query(`
        INSERT INTO "user"
          (id, first_name, last_name, created_at, updated_at)
          VALUES('jeswin', 'Jeswin', 'Kumar', ${Date.now()}, ${Date.now()});
      `);
      const response = await request(app).get("/user-ids/jeswin");
      response.status.should.equal(200);
      JSON.parse(response.text).should.deepEqual({
        exists: true
      });
    });
  });
}
