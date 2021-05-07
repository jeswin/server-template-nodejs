import request = require("supertest");
import { IDbConfig } from "psychopiggy";
import pg = require("pg");

export default function redirectsToConnect(app: any, dbConfig: IDbConfig) {
  it("redirects to connect", async () => {
    const response = await request(app).get(
      "/authenticate/github?success=http://test.example.com/success&newuser=http://test.example.com/newuser"
    );
    response.header["set-cookie"].should.containEql(
      "border-patrol-success-redirect=http://test.example.com/success; path=/; domain=test.example.com"
    );
    response.header["set-cookie"].should.containEql(
      "border-patrol-newuser-redirect=http://test.example.com/newuser; path=/; domain=test.example.com"
    );
    response.text.should.equal(
      `Redirecting to <a href="/connect/github">/connect/github</a>.`
    );
  });
}
