export type Registrant = {
  id: string;
  nik: string;
  name: string;
  address: string;
  submittedAt: string;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  ipfsHash: string;
};

export const mockRegistrants: Registrant[] = [
  {
    id: "REG-001",
    nik: "3201123456789001",
    name: "Siti Aminah",
    address: "Jl. Mawar No. 10, Jakarta",
    submittedAt: "2024-11-20 09:30",
    status: "PENDING",
    ipfsHash: "QmHashSiti...",
  },
  {
    id: "REG-002",
    nik: "3201123456789002",
    name: "Budi Santoso",
    address: "Jl. Melati No. 55, Bandung",
    submittedAt: "2024-11-20 10:15",
    status: "PENDING",
    ipfsHash: "QmHashBudi...",
  },
  {
    id: "REG-003",
    nik: "3201123456789003",
    name: "Doni Pratama",
    address: "Jl. Anggrek No. 12, Surabaya",
    submittedAt: "2024-11-19 14:20",
    status: "VERIFIED",
    ipfsHash: "QmHashDoni...",
  },
];
