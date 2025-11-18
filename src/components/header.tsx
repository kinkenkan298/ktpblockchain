import logoPng from "@/assets/logo.png";
import { Image } from "@unpic/react";
import React from "react";
import ShimmerText from "./kokonutui/shimmer-text";

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <Image
              src={logoPng}
              alt="Logo E-KTP"
              width={90}
              height={90}
              layout="fixed"
            />
            <ShimmerText
              text="Digital ID Blockchain"
              className="text-xl uppercase"
            />
          </div>

          {children}
        </div>
      </div>
    </header>
  );
}
