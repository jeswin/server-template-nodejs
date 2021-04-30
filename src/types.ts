import { IDbConfig } from "psychopiggy";

export interface IAppConfig {
  cookies: {
    maxAge: number;
  };
  domain: string;
  prop: "value";
  jwt: IJwtConfig;
  db: IDbConfig;
}

export type IJwtConfig = {
  publicKey: string;
};
