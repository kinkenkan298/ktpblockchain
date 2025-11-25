import fs from "fs";
import path from "path";

const frontendDir = path.join(__dirname, "../../frontend/src/lib");

fs.writeFileSync(
  frontendDir + "/contractAbi.json",
  JSON.stringify({ abi }, null, 2)
);
fs.writeFileSync(
  frontendDir + "/contractAddress.json",
  JSON.stringify({ address }, null, 2)
);
