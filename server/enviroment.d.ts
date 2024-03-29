declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: string;
      readonly DB_NAME: string;
      readonly DB_USER: string;
      readonly DB_PASSWORD: string;
      readonly DB_HOST: string;
      readonly DB_PORT: string;
      readonly JWT_ACCESS_SECRET: string;
      readonly JWT_REFRESH_SECRET: string;
      readonly MAIL_USER: string;
      readonly MAIL_PASSWORD: string;
      readonly MAIL_HOST: string;
      readonly MAIL_PORT: string;
      readonly API_URL: string;
      readonly APP_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
