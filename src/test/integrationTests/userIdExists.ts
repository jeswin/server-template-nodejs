import request = require("supertest");
import { IDbConfig } from "psychopiggy";
import pg = require("pg");

export default function userIdExists(app: any, dbConfig: IDbConfig) {
  it("says userid exists", async () => {
    const pool = new pg.Pool(dbConfig);
    await pool.query(`
      INSERT INTO "user"
        (id, name, timestamp)
        VALUES('jeswin', 'Jeswin Kumar', ${Date.now()});
    `);
    const response = await request(app).get("/user-ids/jeswin");
    response.status.should.equal(200);
    JSON.parse(response.text).should.deepEqual({
      exists: true,
    });
  });
}
