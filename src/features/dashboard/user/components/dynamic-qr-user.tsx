// import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { RefreshCw, Shield } from "lucide-react";
import { useAuthenticatedUser } from "@/lib/auth/client";

export function DynamicQRCodeUser() {
  // const [timeLeft, setTimeLeft] = useState(profile.qr_refresh_interval);
  // const [qrData, setQrData] = useState("");

  const { user, session } = useAuthenticatedUser();

  const generateQRData = () => {
    const timestamp = Date.now();
    const data = JSON.stringify({
      nik: user.nik,
      name: user.name,
      secret: session.token,
      timestamp: timestamp,
      expires: timestamp + parseInt(user.id) * 1000,
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Kode QR Dinamis</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <RefreshCw className="w-4 h-4" />
          <span>Otomatis diperbarui</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
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

        <div className="mt-6 w-full max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Berlaku hingga</span>
            {/* <span className="text-lg font-bold text-blue-600">
              {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </span> */}
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            {/* <div
              className="bg-blue-600 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            /> */}
          </div>

          <p className="text-xs text-gray-500 text-center mt-3">
            Kode akan diperbarui secara otomatis untuk keamanan maksimal
          </p>
        </div>

        <div className="mt-6 w-full p-4 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900">
                Kode QR Terenkripsi
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Gunakan untuk verifikasi identitas dengan pihak ketiga yang
                terpercaya
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
