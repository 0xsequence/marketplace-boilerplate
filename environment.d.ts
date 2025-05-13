declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ACCESS_KEY: string;
      NEXT_PUBLIC_PROJECT_ID: string;
      NEXT_PUBLIC_WALLETCONNECT_ID: string;
    }
  }
}

export {};
