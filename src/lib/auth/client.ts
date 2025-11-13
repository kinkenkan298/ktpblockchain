import { createAuthClient } from "better-auth/react";
import {
  usernameClient,
  adminClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { auth } from "./auth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authQueryOptions } from "./queries";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000/api/auth",
  plugins: [
    reactStartCookies(),
    usernameClient(),
    adminClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const useAuthentication = () => {
  const { data: userSession } = useSuspenseQuery(authQueryOptions.user());

  return { userSession, isAuthenticated: !!userSession };
};

export const useAuthenticatedUser = () => {
  const { userSession } = useAuthentication();

  if (!userSession) {
    throw new Error("User is not authenticated!");
  }

  return userSession;
};
