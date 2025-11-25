# 🪪 KTP Blockchain

Sistem manajemen Kartu Tanda Penduduk (KTP) berbasis blockchain yang memanfaatkan teknologi Ethereum dan IPFS untuk penyimpanan data yang aman, transparan, dan terdesentralisasi.

## 📋 Deskripsi Project

KTP Blockchain adalah aplikasi full-stack yang mengintegrasikan smart contracts Ethereum dengan frontend modern untuk mengelola data identitas digital. Data KTP disimpan secara terenkripsi di IPFS melalui Pinata, sementara hash-nya dicatat di blockchain untuk memastikan integritas dan keaslian data.

### ✨ Fitur Utama

- 🔐 **Autentikasi Aman** - Sistem autentikasi menggunakan Better Auth
- 🔗 **Blockchain Integration** - Smart contracts untuk menyimpan hash data KTP
- 📦 **IPFS Storage** - Penyimpanan terdesentralisasi menggunakan Pinata
- 🎨 **Modern UI** - Interface yang responsif dan user-friendly
- 🔍 **Data Verification** - Verifikasi keaslian data melalui blockchain

## 🛠️ Tech Stack

### Frontend

- **Runtime**: [Bun](https://bun.sh/) - JavaScript runtime yang cepat
- **Framework**: [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Forms**: [TanStack Form](https://tanstack.com/form)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Blockchain**: [Viem](https://viem.sh/)
- **IPFS**: [Pinata SDK](https://www.pinata.cloud/)

### Backend & Smart Contracts

- **Smart Contracts**: [Foundry](https://getfoundry.sh/) - Solidity development framework
- **Local Node**: [Anvil](https://book.getfoundry.sh/anvil/) - Local Ethereum node
- **Database**: MySQL 8.0
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)

### DevOps

- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

## 📁 Struktur Project

```
ktpblockchain/
├── frontend/               # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities & helpers
│   │   ├── routes/       # TanStack Router pages
│   │   └── services/     # API & blockchain services
│   ├── Dockerfile
│   └── package.json
│
├── contracts/             # Smart contracts (Foundry)
│   ├── src/
│   │   ├── HashStorage.sol   # Main KTP storage contract
│   │   └── Counter.sol       # Example contract
│   ├── script/           # Deployment scripts
│   ├── test/            # Contract tests
│   └── foundry.toml
│
└── docker-compose.yml    # Multi-container orchestration
```

## 🚀 Cara Menjalankan

### Prasyarat

Pastikan sistem Anda telah terinstall:

- [Docker](https://docs.docker.com/get-docker/) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.0+)
- [Git](https://git-scm.com/)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kinkenkan298/ktpblockchain
cd ktpblockchain
```

### 2️⃣ Setup Environment Variables

Buat file `.env` di root project:

```bash
# Pinata JWT untuk IPFS storage
VITE_PINATA_JWT=your_pinata_jwt_token_here

# (Optional) Untuk deployment ke testnet
SEPOLIA_RPC_URL=your_sepolia_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

> 💡 **Cara mendapatkan Pinata JWT**: Daftar di [Pinata](https://app.pinata.cloud/), buat API Key baru, dan copy JWT token.

### 3️⃣ Jalankan dengan Docker Compose

```bash
# Build dan jalankan semua services
docker-compose up --build -d

# Atau jalankan tanpa detached mode untuk melihat logs
docker-compose up --build
```

### 4️⃣ Akses Aplikasi

Tunggu hingga semua container selesai starting (±2-3 menit untuk pertama kali), kemudian akses:

- **Frontend**: http://localhost:3000
- **Blockchain RPC**: http://localhost:8545
- **MySQL**: localhost:3306

### 📊 Melihat Logs

```bash
# Semua services
docker-compose logs -f

# Service spesifik
docker-compose logs -f app          # Frontend
docker-compose logs -f blockchain   # Anvil node
docker-compose logs -f db          # MySQL
docker-compose logs deploy-contracts  # Contract deployment
```

### 🛑 Menghentikan Aplikasi

```bash
# Stop semua containers
docker-compose down

# Stop dan hapus volumes (database akan terhapus)
docker-compose down -v
```

## 🔧 Development

Untuk development tanpa Docker:

### Frontend Development

```bash
cd frontend

# Install dependencies
bun install

# Setup database
bun run db:generate
bun run db:migrate

# Setup user data
bun run db:seed

# Run development server
bun run dev
```

### Smart Contract Development

```bash
cd contracts

# Build contracts
forge build

# Run tests
forge test

# Deploy ke local Anvil
forge script script/HashStorage.s.sol --rpc-url http://localhost:8545 --broadcast --private-key 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

# Deploy ke testnet (Sepolia)
forge script script/HashStorage.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify
```

## 🐳 Docker Services

Project ini menggunakan 4 services Docker:

| Service            | Container              | Port | Description                    |
| ------------------ | ---------------------- | ---- | ------------------------------ |
| `db`               | ktpblockchain-mysql    | 3306 | MySQL database untuk user data |
| `blockchain`       | ktpblockchain-anvil    | 8545 | Local Ethereum node (Anvil)    |
| `deploy-contracts` | ktpblockchain-deploy   | -    | One-time contract deployment   |
| `app`              | ktpblockchain-frontend | 3000 | Frontend application           |

### Service Dependencies

```
db (MySQL) ───┐
              ├──> deploy-contracts ──> app (Frontend)
blockchain ───┘
```

Frontend hanya akan start setelah:

- ✅ Database siap (healthy)
- ✅ Blockchain node siap (healthy)
- ✅ Smart contracts berhasil di-deploy

## 🧪 Testing

### Frontend Tests

```bash
cd frontend
bun test
```

### Smart Contract Tests

```bash
cd contracts
forge test

# Dengan gas report
forge test --gas-report

# Dengan coverage
forge coverage
```

## 📝 Smart Contracts

### HashStorage.sol

Contract utama untuk menyimpan hash data KTP di blockchain.

**Main Functions:**

- `storeHash(string cidHash, address ethAddress)` - Menyimpan hash IPFS CID
- `getHash(uint256 recordId)` - Mengambil data hash berdasarkan ID
- `getRecordsByAddress(address ethAddress)` - Mengambil semua record milik address

## 🔐 Security Notes

- ⚠️ Private key di `docker-compose.yml` adalah default Anvil key untuk **development only**
- ⚠️ Jangan gunakan key tersebut di production atau dengan ETH real
- ⚠️ Pastikan `.env` tidak masuk ke Git repository
- 🔒 Data KTP di-encrypt sebelum disimpan ke IPFS

## 🤝 Contributing

Contributions are welcome! Silakan buat issue atau pull request.

## 📄 License

[MIT License](LICENSE)

## 👨‍💻 Author

Dibuat dengan ❤️ oleh Kinkenkan untuk sistem identitas digital yang lebih aman dan transparan.

---

## ❓ Troubleshooting

### Container tidak bisa start

```bash
# Check status semua containers
docker-compose ps

# Restart semua services
docker-compose restart
```

### Database connection error

```bash
# Check database logs
docker-compose logs db

# Restart database
docker-compose restart db
```

### Smart contract deployment gagal

```bash
# Check deployment logs
docker-compose logs deploy-contracts

# Rebuild dan deploy ulang
docker-compose up --build deploy-contracts
```

### Port sudah digunakan

Jika port 3000, 3306, atau 8545 sudah digunakan, edit `docker-compose.yml` dan ubah port mapping sesuai kebutuhan:

```yaml
ports:
  - "3001:3000" # Ubah port host menjadi 3001
```
