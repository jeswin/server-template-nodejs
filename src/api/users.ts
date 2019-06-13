import * as user from "../domain/user";
import { IRouterContext } from "koa-router";

export async function createUser(ctx: IRouterContext) {
  const result = await user.createUser(ctx.params.username);
  ctx.body = {
    status: result.status
  };
}
