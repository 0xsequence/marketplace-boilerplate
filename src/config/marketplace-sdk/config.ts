import { env } from "~/env";

export const config = {
  projectAccessKey: 'AQAAAAAAADVH8R2AGuQhwQ1y8NaEf1T7PJM', //env.NEXT_PUBLIC_SEQUENCE_ACCESS_KEY,
  wallet: {
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  },
};
