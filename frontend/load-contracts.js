const fs = require("fs");
const path = require("path");

// Path to the deployed-addresses.json in contracts directory
const contractsJsonPath = path.join(
  __dirname,
  "..",
  "contracts",
  "deployed-addresses.json"
);

console.log("🔍 Loading contract addresses from:", contractsJsonPath);

try {
  if (fs.existsSync(contractsJsonPath)) {
    const contractsData = JSON.parse(
      fs.readFileSync(contractsJsonPath, "utf8")
    );

    console.log("✅ Contract addresses loaded:", contractsData);

    // Set environment variables for Vite to use during build
    process.env.VITE_HASH_STORAGE_ADDRESS = contractsData.HashStorage;
    process.env.VITE_CHAIN_ID = String(contractsData.chainId || 31337);

    console.log("✅ Environment variables set:");
    console.log(
      "   VITE_HASH_STORAGE_ADDRESS:",
      process.env.VITE_HASH_STORAGE_ADDRESS
    );
    console.log("   VITE_CHAIN_ID:", process.env.VITE_CHAIN_ID);
  } else {
    console.warn("⚠️  Contract addresses file not found, using defaults");
    console.warn(
      "   Using hardcoded address: 0x712516e61C8B383dF4A63CFe83d7701Bce54B03e"
    );

    // Fallback to default for local development
    process.env.VITE_HASH_STORAGE_ADDRESS =
      "0x712516e61C8B383dF4A63CFe83d7701Bce54B03e";
    process.env.VITE_CHAIN_ID = "31337";
  }
} catch (error) {
  console.error("❌ Error loading contract addresses:", error);
  console.warn(
    "⚠️  Using fallback address: 0x712516e61C8B383dF4A63CFe83d7701Bce54B03e"
  );

  // Fallback to default
  process.env.VITE_HASH_STORAGE_ADDRESS =
    "0x712516e61C8B383dF4A63CFe83d7701Bce54B03e";
  process.env.VITE_CHAIN_ID = "31337";
}
