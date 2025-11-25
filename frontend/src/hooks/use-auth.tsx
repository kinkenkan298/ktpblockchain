import { authQueryOptions } from "@/services/queries";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useAuthentication = () => {
  const { data: userSession } = useSuspenseQuery(authQueryOptions.user());

  return { userSession, isAuthenticated: !!userSession };
};

export const useAuthenticatedUser = () => {
  const { userSession, isAuthenticated } = useAuthentication();

  return {
    user: userSession?.user ?? null,
    isAuthenticated,
    session: userSession ?? null,
  };
};
