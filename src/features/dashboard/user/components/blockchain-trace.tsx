import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

import { Shield, Eye, EyeOff, Download, Search, Filter } from "lucide-react";
import { BlockchainTransaction } from "../types/blockchain-user";
import { getActionLabel, getStatusIcon } from "../lib/function";
import { TransactionDetailModal } from "./detail-transaction";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/radix/tabs";
import { toast } from "sonner";

export function BlockchainTraceTool() {
  // const [transactions, setTransactions] = useState<BlockchainTransaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [privacyMode, setPrivacyMode] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<BlockchainTransaction | null>(null);

  const sampleTransactions: BlockchainTransaction[] = [
    {
      id: "1",
      transactionHash: "0x8a3b9c4d5e6f...",
      anonymousId: "USER_7X9Y2Z",
      actionType: "data_share",
      timestamp: new Date("2024-01-15T10:30:00"),
      status: "completed",
      involvedParties: 1,
      dataFields: ["nama", "umur"],
      blockchainNetwork: "polygon",
      gasUsed: 0.0021,
      blockNumber: 38475231,
    },
    {
      id: "2",
      transactionHash: "0x7b2c8d9e1f3a...",
      anonymousId: "USER_7X9Y2Z",
      actionType: "consent_given",
      timestamp: new Date("2024-01-14T14:20:00"),
      status: "completed",
      involvedParties: 1,
      dataFields: ["alamat"],
      blockchainNetwork: "polygon",
      blockNumber: 38475189,
    },
  ];

  const maskTransactionHash = (hash: string) => {
    if (privacyMode) {
      return `${hash.substring(0, 8)}...${hash.substring(hash.length - 6)}`;
    }
    return hash;
  };

  const handleClickDetail = (tx: BlockchainTransaction) => {
    setSelectedTransaction(tx);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText("asd");
    toast.success("Hash berhasil disalin ke clipboard");
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
              variant="outline"
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

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="sharing">Berbagi Data</TabsTrigger>
              <TabsTrigger value="consent">Persetujuan</TabsTrigger>
              <TabsTrigger value="verify">Verifikasi</TabsTrigger>
            </TabsList>
            <TabsContents>
              <TabsContent value="all" className="space-y-3">
                {sampleTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(tx.status)}
                          <span className="font-medium">
                            {getActionLabel(tx.actionType)}
                          </span>
                          <Badge
                            variant={
                              tx.status === "completed"
                                ? "default"
                                : tx.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {tx.status === "completed"
                              ? "Selesai"
                              : tx.status === "pending"
                                ? "Menunggu"
                                : "Gagal"}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Hash:</span>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {maskTransactionHash(tx.transactionHash)}
                            </code>
                            {!privacyMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                              >
                                Salin
                              </Button>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-medium">Waktu:</span>
                            <span>{tx.timestamp.toLocaleString("id-ID")}</span>
                          </div>

                          {!privacyMode && (
                            <>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Block:</span>
                                <span>#{tx.blockNumber}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Network:</span>
                                <Badge variant="outline" className="capitalize">
                                  {tx.blockchainNetwork}
                                </Badge>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1">
                          <span className="text-sm text-gray-600">
                            Data diakses:
                          </span>
                          {tx.dataFields.map((field, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {field}
                            </Badge>
                          ))}
                        </div>

                        {!privacyMode && (
                          <div className="text-xs text-gray-500">
                            Anonymous ID: {tx.anonymousId} • Pihak terlibat:{" "}
                            {tx.involvedParties}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleClickDetail(tx)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Detail
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </TabsContents>
          </Tabs>

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
      <TransactionDetailModal
        transaction={selectedTransaction}
        open={isModalOpen}
        onOpenChange={handleCloseModal}
        privacyMode={privacyMode}
        handleCopyHash={handleCopyHash}
      />
    </>
  );
}
