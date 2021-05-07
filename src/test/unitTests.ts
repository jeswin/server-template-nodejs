import pg = require("pg");
import { join } from "path";
import { readFileSync } from "fs";
import { IDbConfig } from "psychopiggy";
import createLocalUser from "./unitTests/createLocalUser";

export default function run(dbConfig: IDbConfig, configDir: string) {
  async function selectAndMatchRows(
    table: string,
    count: number,
    rowToMatch: number,
    props: any
  ) {
    const pool = new pg.Pool(dbConfig);
    const { rows } = await pool.query(`SELECT * FROM "${table}"`);
    rows.length.should.equal(count);
    Object.keys(props).forEach((k) => {
      props[k].should.equal(rows[rowToMatch][k]);
    });
  }

  describe("unit tests", async () => {
    async function writeSampleData() {
      const pool = new pg.Pool(dbConfig);

      const sampleDataSQL = readFileSync(
        join(__dirname, "./sample-data.sql")
      ).toString();

      await pool.query(sampleDataSQL);
    }

    beforeEach(async () => {
      await writeSampleData();
    });

    createLocalUser(dbConfig);
  });
}
