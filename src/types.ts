export interface IAppConfig {
  cookies: {
    maxAge: number;
  };
  sessionKeys: string;
  domain: string;
  prop: "value";
}

export interface IJwtConfig {
  publicKey: string;
}
