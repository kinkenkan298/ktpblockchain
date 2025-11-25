import { queryOptions } from "@tanstack/react-query";
import { $getUser } from "../lib/auth/functions";
import {
  getKtpRecord,
  getCidData,
  getAllDataKtp,
} from "@/services/ktp.services";

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
  all: ["data-ktp"] as const,
  getDataKtp: (userId: string) =>
    queryOptions({
      queryKey: [...ktpQueries.all, "ktp-data", userId],
      queryFn: async () => await getKtpRecord({ data: { userId } }),
    }),
  getCidData: (ipfsCid: string) =>
    queryOptions({
      queryKey: [...ktpQueries.all, "cid-data", ipfsCid],
      queryFn: async () => await getCidData({ data: { ipfsCid } }),
    }),
  getAllDataKtp: () =>
    queryOptions({
      queryKey: [...ktpQueries.all, "all-data-ktp"],
      queryFn: async () => await getAllDataKtp(),
    }),
};
