import pg = require("pg");
import { join } from "path";
import { readFileSync } from "fs";
import { IDbConfig } from "psychopiggy";
import * as userModule from "../domain/user";

export default function run(dbConfig: IDbConfig, configDir: string) {
  describe("domain", async () => {
    async function writeSampleData() {
      const pool = new pg.Pool(dbConfig);

      const sampleDataSQL = readFileSync(
        join(__dirname, "./sample-data.sql")
      ).toString();

      await pool.query(sampleDataSQL);
    }

    it("tests something", async () => {
      await writeSampleData();
      const result = await userModule.createUser("jeswin");
      result.should.deepEqual({ exists: true });
    });
  });
}
