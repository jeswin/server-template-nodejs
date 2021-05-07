import request = require("supertest");
import { IDbConfig } from "psychopiggy";
import pg = require("pg");

export default function missingUserId(app: any, dbConfig: IDbConfig) {
  it("says missing userid is missing", async () => {
    const response = await request(app).get("/user-ids/alice");
    response.status.should.equal(200);
    JSON.parse(response.text).should.deepEqual({
      exists: false,
    });
  });
}
