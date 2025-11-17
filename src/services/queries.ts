import { queryOptions } from "@tanstack/react-query";
import { $getUser } from "../lib/auth/functions";
import { getKtpRecord } from "@/services/ktp.services";

export const authQueryOptions = {
  all: ["auth"],
  user: () =>
    queryOptions({
      queryKey: [...authQueryOptions.all, "user"],
      queryFn: () => $getUser(),
      staleTime: 5000,
    }),
};
export const ktpQueries = {
  all: ["data-ktp"],
  getDataKtp: (userId: string) =>
    queryOptions({
      queryKey: [...ktpQueries.all, "ktp-data", userId],
      queryFn: async () => await getKtpRecord({ data: { userId } }),
    }),
};
