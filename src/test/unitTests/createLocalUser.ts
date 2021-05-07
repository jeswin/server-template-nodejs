import { IDbConfig } from "psychopiggy";
import selectAndMatchRows from "../selectAndMatchRows";
import * as localAccountModule from "../../domain/account";

export default function createLocalUser(dbConfig: IDbConfig) {
  it("localAccount.createLocalUser() creates a local user", async () => {
    const result = await localAccountModule.createLocalUser("jeswin", "secret");
    (result as any).jwt = "something";
    result.should.deepEqual({
      created: true,
      jwt: "something",
      tokens: {
        userId: "jeswin",
        providerUserId: "jeswin",
        provider: "local",
      },
    });

    await selectAndMatchRows("user", 1, 0, { id: "jeswin" }, dbConfig);
    await selectAndMatchRows(
      "local_user_auth",
      1,
      0,
      { user_id: "jeswin" },
      dbConfig
    );
  });
}
