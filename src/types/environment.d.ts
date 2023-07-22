declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_TLS_REJECT_UNAUTHORIZED: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_DEFAULT_REGION: string;
    }
  }
}

export {};
