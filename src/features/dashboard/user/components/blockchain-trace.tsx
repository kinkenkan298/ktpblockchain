import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Shield, Eye, EyeOff, Download, Search, Filter } from "lucide-react";
import { TxItem, TxType } from "../types/blockchain-user";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import {
  publicClient,
  STORAGE_CONTRACT_ADDRESS,
  storageContractAbi,
} from "@/lib/blockchain";
import { Log } from "viem";
import { TransactionList } from "./transaction-list";
import { DetailTransaction } from "./detail-transaction";

export function BlockchainTraceTool() {
  const [transactions, setTransactions] = useState<TxItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [privacyMode, setPrivacyMode] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TxType>("ALL");
  const [selectedTransaction, setSelectedTransaction] = useState<TxItem | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      const storeLogs = await publicClient.getContractEvents({
        address: STORAGE_CONTRACT_ADDRESS,
        abi: storageContractAbi,
        eventName: "HashStored",
        fromBlock: "earliest",
      });
      const requestsLog = await publicClient.getContractEvents({
        address: STORAGE_CONTRACT_ADDRESS,
        abi: storageContractAbi,
        eventName: "DataRequested",
        fromBlock: "earliest",
      });
      const approveLogs = await publicClient.getContractEvents({
        address: STORAGE_CONTRACT_ADDRESS,
        abi: storageContractAbi,
        eventName: "DataApproved",
        fromBlock: "earliest",
      });

      const formattedLogs: TxItem[] = [];

      storeLogs.forEach((log: Log) => {
        formattedLogs.push({
          hash: `${log.transactionHash}`,
          category: "STORE",
          title: "Penyimpanan Data",
          timestamp: new Date(Number(log.args.timestamp) * 1000),
          actor: log.args.owner,
          metadata: ["E-Ktp", "Metadata", "File"],
          rawEvent: log.args,
        });
      });
      requestsLog.forEach((log: Log) => {
        formattedLogs.push({
          hash: `${log.transactionHash}`,
          category: "CONSENT",
          title: "Permintaan Data",
          timestamp: new Date(Number(log.args.timestamp) * 1000),
          actor: log.args.owner,
          metadata: ["E-Ktp", "Metadata", "File"],
          rawEvent: log.args,
        });
      });
      approveLogs.forEach((log: Log) => {
        formattedLogs.push({
          hash: `${log.transactionHash}`,
          category: "CONSENT",
          title: "Persetujuan Data",
          timestamp: new Date(Number(log.args.timestamp) * 1000),
          actor: log.args.owner,
          metadata: ["E-Ktp", "Metadata", "File"],
          rawEvent: log.args,
        });
      });
      setTransactions(
        formattedLogs.sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        )
      );
    };
    fetchData();
  });

  const searchedTransactions = transactions.filter(
    (tx) =>
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.actor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const dataSharingLogs = searchedTransactions.filter(
    (t) => t.category === "STORE"
  );
  const consentLogs = searchedTransactions.filter(
    (t) => t.category === "CONSENT"
  );
  const verifyLogs = searchedTransactions.filter(
    (t) => t.category === "VERIFY"
  );

  const filteredTx = transactions.filter((tx) => {
    const matchesTab =
      activeTab === "ALL" ||
      (activeTab === "STORE" && tx.category === "STORE") ||
      (activeTab === "CONSENT" && tx.category === "CONSENT");

    const matchesSearch =
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleClickDetail = (tx: TxItem) => {
    setSelectedTransaction(tx);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Pelacak Blockchain
              </CardTitle>
              <CardDescription>
                Lacak semua aktivitas blockchain Anda dengan privasi terjamin
              </CardDescription>
            </div>

            <Button
              variant={privacyMode ? "default" : "outline"}
              size="sm"
              onClick={() => setPrivacyMode(!privacyMode)}
              className="flex items-center gap-2"
            >
              {privacyMode ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              {privacyMode ? "Mode Privasi" : "Mode Detail"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Cari transaksi atau hash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {privacyMode && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <strong>Mode Privasi Aktif:</strong> Informasi sensitif
                disembunyikan untuk melindungi identitas Anda
              </p>
            </div>
          )}

          <Tabs defaultValue="ALL" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="ALL">Semua</TabsTrigger>
              <TabsTrigger value="STORE">Penyimpanan Data</TabsTrigger>
              <TabsTrigger value="CONSENT">Persetujuan</TabsTrigger>
              <TabsTrigger value="VERIFY" disabled>
                Verifikasi
              </TabsTrigger>
            </TabsList>
            <TabsContents>
              {filteredTx.length === 0 && (
                <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
                  Tidak ada transaksi ditemukan.
                </div>
              )}
              <TabsContent value="ALL" className="space-y-3">
                <TransactionList
                  data={filteredTx}
                  privacy={privacyMode}
                  onDetail={handleClickDetail}
                />
              </TabsContent>
              <TabsContent value="STORE">
                <TransactionList
                  data={dataSharingLogs}
                  privacy={privacyMode}
                  onDetail={handleClickDetail}
                />
              </TabsContent>
              <TabsContent value="CONSENT">
                <TransactionList
                  data={consentLogs}
                  privacy={privacyMode}
                  onDetail={handleClickDetail}
                />
              </TabsContent>
              <TabsContent value="VERIFY">
                <TransactionList
                  data={verifyLogs}
                  privacy={privacyMode}
                  onDetail={handleClickDetail}
                />
              </TabsContent>
            </TabsContents>
          </Tabs>

          <DetailTransaction
            tx={selectedTransaction}
            onClose={handleCloseModal}
          />

          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Total Transaksi</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">10</div>
                  <div className="text-sm text-gray-600">Berhasil</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-600">2</div>
                  <div className="text-sm text-gray-600">Menunggu</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">7</div>
                  <div className="text-sm text-gray-600">Organisasi</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Laporan
            </Button>
            <Button variant="outline" size="sm">
              Lihat di Explorer
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
