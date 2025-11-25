#!/bin/bash
set -e

echo "🔨 Building contracts..."
forge build

echo "🚀 Deploying contracts..."
# Capture the output
DEPLOY_OUTPUT=$(forge script script/HashStorage.s.sol \
  --rpc-url http://blockchain:8545 \
  --broadcast \
  --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d \
  --legacy 2>&1)

echo "$DEPLOY_OUTPUT"

echo "📝 Extracting contract addresses..."

# Extract contract address from the forge script output
# Looking for pattern: "contract HashStorage 0x..."
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep -o 'contract HashStorage 0x[a-fA-F0-9]*' | grep -o '0x[a-fA-F0-9]*')

if [ -z "$CONTRACT_ADDRESS" ]; then
  echo "❌ Error: Could not extract contract address!"
  echo "Deploy output was:"
  echo "$DEPLOY_OUTPUT"
  exit 1
fi

echo "✅ HashStorage deployed at: $CONTRACT_ADDRESS"

# Create deployed-addresses.json in contracts directory
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)
cat > /app/contracts/deployed-addresses.json << EOF
{
  "HashStorage": "$CONTRACT_ADDRESS",
  "deployedAt": "$TIMESTAMP",
  "chainId": 31337
}
EOF

echo "✅ Contract addresses exported to /app/contracts/deployed-addresses.json"
cat /app/contracts/deployed-addresses.json

