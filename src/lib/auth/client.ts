import { createAuthClient } from "better-auth/react";
import { usernameClient, adminClient } from "better-auth/client/plugins";
import { reactStartCookies } from "better-auth/react-start";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth",
  plugins: [reactStartCookies(), usernameClient(), adminClient()],
});
