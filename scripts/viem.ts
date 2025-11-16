import { createWalletClient, Hex, http, publicActions } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { foundry, sepolia } from "viem/chains";

const client = createWalletClient({
  account: privateKeyToAccount(process.env.PRIVATE_KEY as Hex),
  transport: http("http://127.0.0.1:8545"),
  chain: foundry,
}).extend(publicActions);

console.log(await client.getAddresses());
