import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  publicClient,
  STORAGE_CONTRACT_ADDRESS,
  storageContractAbi,
} from "@/lib/blockchain";
import {
  Activity,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Hex, Log } from "viem";

type AccessStatus = "request" | "approve" | "reject" | "store";

interface EKTPLogArgs {
  permissionId?: string;
  requester?: string;
  owner?: string;
  recordId?: bigint;
  purpose?: string;
  expiryTime?: bigint;
  timestamp?: bigint;
  actionType?: string;
}

type ActivityLog = {
  id: string;
  hash: string;
  title: string;
  actor: string;
  details: string;
  timestamp: Date;
  type: "request" | "approve" | "reject" | "store";
};

export function DataAccessActivity() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const formatLog = (log: Log, type: ActivityLog["type"]) => {
    const args = log.args as EKTPLogArgs;

    const time = new Date(Number(args.timestamp) * 1000);
    const newActivity: ActivityLog = {
      id: `${log.transactionHash}-${log.logIndex}`,
      hash: log.transactionHash || "0x",
      title:
        args.actionType ||
        (type === "request" ? "Permintaan Data" : "Persetujuan Data"),
      actor: args.requester || args.owner || "Alamat tidak dikenali",
      details: args.purpose
        ? `Tujuan: ${args.purpose}`
        : `Record ID: ${args.recordId?.toString()}`,
      timestamp: time,
      type: type,
    };
    return newActivity;
    // setLogs((prev) => {
    //   const isDuplicate = prev.some((log) => log.id === newActivity.id);
    //   if (isDuplicate) return prev;

    //   return [...prev, newActivity];
    // });
  };

  useEffect(() => {
    publicClient
      .getBlockNumber()
      .then(() => setIsConnected(true))
      .catch(() => setIsConnected(false));

    const fetchHistoryLog = async () => {
      try {
        setIsLoading(true);
        const requestsLogs = await publicClient.getContractEvents({
          address: STORAGE_CONTRACT_ADDRESS,
          abi: storageContractAbi,
          eventName: "DataRequested",
          fromBlock: "earliest",
          toBlock: "latest",
        });
        const approveLogs = await publicClient.getContractEvents({
          address: STORAGE_CONTRACT_ADDRESS,
          abi: storageContractAbi,
          eventName: "DataApproved",
          fromBlock: "earliest",
          toBlock: "latest",
        });
        const rejectLogs = await publicClient.getContractEvents({
          address: STORAGE_CONTRACT_ADDRESS,
          abi: storageContractAbi,
          eventName: "DataRejected",
          fromBlock: "earliest",
          toBlock: "latest",
        });
        const storeLogs = await publicClient.getContractEvents({
          address: STORAGE_CONTRACT_ADDRESS,
          abi: storageContractAbi,
          eventName: "DataStored",
          fromBlock: "earliest",
          toBlock: "latest",
        });

        const allLogs = [
          ...requestsLogs.map((l) => formatLog(l as Log, "request")),
          ...approveLogs.map((l) => formatLog(l as Log, "approve")),
          ...rejectLogs.map((l) => formatLog(l as Log, "reject")),
          ...storeLogs.map((l) => formatLog(l as Log, "store")),
        ];

        // @ts-ignore
        allLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        // @ts-ignore
        setLogs(allLogs);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistoryLog();

    const unwatchRequest = publicClient.watchContractEvent({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      eventName: "DataRequested",
      onLogs: (newLogs) => {
        const newFormatedLogs = newLogs.map((l) =>
          formatLog(l as Log, "request")
        );
        setLogs((prev) => {
          const newUnique = newFormatedLogs.filter(
            (log) => !prev.some((l) => l.id === log.id)
          );
          return [...prev, ...newUnique];
        });
      },
    });
    const unwatchApprove = publicClient.watchContractEvent({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      eventName: "DataApproved",
      onLogs: (newLogs) => {
        const newFormatedLogs = newLogs.map((l) =>
          formatLog(l as Log, "approve")
        );
        setLogs((prev) => {
          const newUnique = newFormatedLogs.filter(
            (log) => !prev.some((l) => l.id === log.id)
          );
          return [...prev, ...newUnique];
        });
      },
    });
    const unwatchReject = publicClient.watchContractEvent({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      eventName: "DataRejected",
      onLogs: (newLogs) => {
        const newFormatedLogs = newLogs.map((l) =>
          formatLog(l as Log, "reject")
        );
        setLogs((prev) => {
          const newUnique = newFormatedLogs.filter(
            (log) => !prev.some((l) => l.id === log.id)
          );
          return [...prev, ...newUnique];
        });
      },
    });
    const unwatchStore = publicClient.watchContractEvent({
      address: STORAGE_CONTRACT_ADDRESS,
      abi: storageContractAbi,
      eventName: "DataStored",
      onLogs: (newLogs) => {
        const newFormatedLogs = newLogs.map((l) =>
          formatLog(l as Log, "store")
        );
        setLogs((prev) => {
          const newUnique = newFormatedLogs.filter(
            (log) => !prev.some((l) => l.id === log.id)
          );
          return [...prev, ...newUnique];
        });
      },
    });
    return () => {
      unwatchRequest();
      unwatchApprove();
      unwatchReject();
      unwatchStore();
    };
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-3 h-full flex flex-col border-indigo-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle>
              <Activity className="h-5 w-5 text-indigo-500" />
              Jejak Akses Data
            </CardTitle>
            <CardDescription>
              Transparansi aktivitas permintaan dan persetujuan data E-KTP.
            </CardDescription>
          </div>
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded text-xs font-mono ${isConnected ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            <Wifi className="h-3 w-3" />
            <span>{isConnected ? "CONNECTED" : "DISCONNECTED"}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px] px-6 pb-4">
          {isLoading && (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Memuat riwayat blockchain...
            </div>
          )}

          {!isLoading && logs.length === 0 && (
            <div className="py-8 text-center text-sm text-muted-foreground border-2 border-dashed rounded-lg m-4">
              Belum ada aktivitas tercatat.
            </div>
          )}
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card animate-in slide-in-from-top-2 fade-in duration-500 mt-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-full ${
                    log.type === "request"
                      ? "bg-orange-100 text-orange-600"
                      : log.type === "approve"
                        ? "bg-green-100 text-green-600"
                        : log.type === "reject"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {log.type === "request" ? (
                    <ShieldAlert className="h-5 w-5" />
                  ) : log.type === "approve" ? (
                    <ShieldCheck className="h-5 w-5" />
                  ) : log.type === "reject" ? (
                    <ShieldX className="h-5 w-5" />
                  ) : (
                    <ShieldCheck className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {log.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">
                    {log.actor.substring(0, 6)}...{log.actor.substring(38)}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {log.details}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-muted-foreground font-mono">
                  {log.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="mt-8 flex justify-center">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Privasi Anda dilindungi oleh transparansi blockchain.</span>
          <a href="#" className="underline hover:text-gray-600">
            Pelajari lebih lanjut
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
