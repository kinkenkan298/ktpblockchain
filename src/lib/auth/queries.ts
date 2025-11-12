import { queryOptions } from "@tanstack/react-query";
import { $getUser } from "./functions";

export const authQueryOptions = {
  all: ["auth"],
  user: () =>
    queryOptions({
      queryKey: [...authQueryOptions.all, "user"],
      queryFn: () => $getUser(),
      staleTime: 5000,
    }),
};
