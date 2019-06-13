export interface IAppConfig {
  domain: string;
  cookies: {
    httpOnly: boolean;
    maxAge: number;
  };
}
