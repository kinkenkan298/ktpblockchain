import { ktpQueries } from "@/services/queries";
import { useQuery } from "@tanstack/react-query";

export function useGetKtpData(userId: string) {
  return useQuery({
    ...ktpQueries.getDataKtp(userId),
  });
}
export function useGetCidData(ipfsCid: string) {
  return useQuery({
    ...ktpQueries.getCidData(ipfsCid),
  });
}
