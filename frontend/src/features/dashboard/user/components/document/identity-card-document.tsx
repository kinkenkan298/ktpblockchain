import { Button } from "@/components/animate-ui/components/buttons/button";
import { Badge } from "@/components/ui/badge";
import { Fingerprint, QrCode, Share2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { easeOut, motion } from "motion/react";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import { DocumentData } from "../../types/blockchain-user";

export function IdentityDocumentCard({ doc }: { doc: DocumentData }) {
  const [view, setView] = useState<"FRONT" | "BACK">("FRONT");

  const [isFlipped, setIsFlipped] = useState(false);

  const sliceText = (text: string, max: number = 100) =>
    text.length > max ? `${text.slice(0, max)}...` : text;
  1;
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  const cardVariants = {
    front: { rotateY: 0, transition: { duration: 0.5, ease: easeOut } },
    back: { rotateY: 180, transition: { duration: 0.5, ease: easeOut } },
  };

  return (
    <div className="relative group perspective-1000">
      <div
        className={`relative overflow-hidden border-0 shadow-lg transition-all duration-500 ${view === "FRONT" ? "h-[240px]" : "h-[240px]"}`}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          animate={isFlipped ? "back" : "front"}
          variants={cardVariants}
          style={{ transformStyle: "preserve-3d" }}
          className={`absolute bg-gradient-to-br ${doc.color} inset-0 backface-hidden rounded-md px-4 py-6 flex flex-col items-center justify-center text-center`}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>

          <div className="flex justify-between items-center gap-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
              <span className="font-bold tracking-wider text-sm opacity-90 text-white">
                ID DIGITAL INDONESIA
              </span>
            </div>
            <div className="w-10 h-8 bg-gradient-to-tr from-yellow-200 to-yellow-600 rounded-md border border-yellow-700/50 shadow-inner opacity-90"></div>
          </div>

          <div className="space-y-4 mt-2">
            <div>
              <p className="text-[10px] uppercase opacity-70 tracking-widest text-white/80">
                Nama Lengkap
              </p>
              <h3 className="text-lg font-bold font-mono truncate text-white/80">
                {doc.name}
              </h3>
            </div>
            <div>
              <p className="text-[10px] uppercase opacity-70 tracking-widest text-white/80">
                Nomor Identitas
              </p>
              <p className="text-xl font-mono tracking-wider text-white drop-shadow-sm">
                {doc.number.replace(/(\d{4})(?=\d)/g, "$1")}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center gap-4">
            <Badge
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm gap-1"
            >
              <Fingerprint className="w-3 h-3" />
              On-Chain
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 hover:text-white text-xs h-8"
              onClick={() => setView("BACK")}
            >
              Lihat Detail &rarr;
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="absolute inset-0 backface-hidden rounded-md border-2 border-foreground/20 p-3 flex flex-col justify-between items-center bg-slate-900 text-slate-50"
          initial={{ rotateY: 180 }}
          animate={isFlipped ? "front" : "back"}
          variants={cardVariants}
          style={{ transformStyle: "preserve-3d", rotateY: 180 }}
        >
          <div className="flex justify-between items-center mb-4 border-b border-slate-700 pb-2">
            <span className="text-sm font-medium text-slate-400">
              Metadata Blockchain
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-slate-800 text-slate-400"
              onClick={() => setView("FRONT")}
            >
              &times;
            </Button>
          </div>

          <div className="flex gap-4 items-center flex-1">
            <div className="bg-white p-2 rounded-lg shrink-0">
              <QrCode className="w-20 h-20 text-slate-900" />
            </div>

            <div className="space-y-2 overflow-hidden">
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-slate-500">
                  Contract Hash
                </p>
                <div className="flex items-center gap-2 bg-slate-800/50 p-1.5 rounded border border-slate-700">
                  <code className="text-[10px] font-mono truncate">
                    {sliceText(doc.hash, 10)}
                  </code>
                  <CopyButton variant="ghost" size="sm" content={doc.hash} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-4 grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-900 border-slate-700 hover:bg-slate-800 hover:text-white text-xs w-full"
            >
              <Share2 className="w-3 h-3 mr-2" />
              Share Akses
            </Button>
            <Button
              variant="default"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-xs w-full"
            >
              <ShieldCheck className="w-3 h-3 mr-2" />
              Verifikasi
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
