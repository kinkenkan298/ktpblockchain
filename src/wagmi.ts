import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, metaMask } from "wagmi/connectors";
import { ETHEREUM_RPC_URL } from "./lib/env";

export const configWagmi = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(ETHEREUM_RPC_URL),
  },
  connectors: [injected(), metaMask()],
});

declare module "wagmi" {
  interface Register {
    config: typeof configWagmi;
  }
}
