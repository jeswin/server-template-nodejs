import request = require("supertest");
import { IDbConfig } from "psychopiggy";
import pg = require("pg");

export default function createsUser(app: any, dbConfig: IDbConfig) {
  it("creates a user", async () => {
    const response = await request(app)
      .post("/users")
      .send({ userId: "jeswin" })
      .set("border-patrol-jwt", "some_jwt");

    const cookies = (response.header[
      "set-cookie"
    ] as Array<string>).flatMap((x) => x.split(";"));
    cookies.should.containEql("border-patrol-jwt=some_other_jwt");
    cookies.should.containEql("border-patrol-domain=test.example.com");
    response.text.should.equal(
      `{"border-patrol-jwt":"some_other_jwt","border-patrol-user-id":"jeswin","border-patrol-domain":"test.example.com"}`
    );
  });
}
