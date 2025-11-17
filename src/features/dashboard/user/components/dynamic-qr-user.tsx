// import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { RefreshCw, Shield } from "lucide-react";
import { useAuthenticatedUser } from "@/lib/auth/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DynamicQRCodeUser() {
  // const [timeLeft, setTimeLeft] = useState(profile.qr_refresh_interval);
  // const [qrData, setQrData] = useState("");

  const { user, session } = useAuthenticatedUser();

  const generateQRData = () => {
    const timestamp = Date.now();
    const data = JSON.stringify({
      nik: user?.email,
      name: user?.name,
      secret: session?.token ?? "inisceret",
      timestamp: timestamp,
      expires: timestamp + parseInt(user?.id || "3000") * 1000,
    });
    return btoa(data);
  };

  // useEffect(() => {
  //   setQrData(generateQRData());
  //   setTimeLeft(profile.qr_refresh_interval);
  // }, [profile]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeft((prev) => {
  //       if (prev <= 1) {
  //         setQrData(generateQRData());
  //         return profile.qr_refresh_interval;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [profile]);

  // const progress = (timeLeft / profile.qr_refresh_interval) * 100;

  return (
    <Card className="shadow-md border-slate-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Kode QR Dinamis</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Auto-refresh</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="bg-liniear-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-inner">
              <QRCode
                value={generateQRData()}
                size={200}
                level="H"
                className="rounded-lg"
              />
            </div>
            <div className="absolute -top-3 -right-3 bg-blue-600 text-white p-2 rounded-full shadow-lg">
              <Shield className="w-5 h-5" />
            </div>
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-600">
                Berlaku hingga
              </span>
              <span className="text-lg font-bold text-blue-600 font-mono">
                {/* {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")} */}
              </span>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div className="bg-linear-to-r from-blue-500 to-blue-600 h-full transition-all duration-1000 ease-linear" />
            </div>

            <p className="text-xs text-slate-500 text-center">
              Diperbarui otomatis setiap 3 detik
            </p>
          </div>

          <Alert variant="default" className="w-full">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <strong className="block mb-1">Kode QR Terenkripsi</strong>
              <span className="text-sm">
                Gunakan untuk verifikasi identitas dengan pihak ketiga
                terpercaya
              </span>
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}
