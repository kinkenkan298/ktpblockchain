import ProfileDropdown from "@/components/kokonutui/profile-dropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Bell } from "lucide-react";

export function HeaderUser({ name }: { name: string | undefined }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Selamat datang kembali {name ?? "User"}!
          </p>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-6 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-slate-600 hover:bg-slate-100"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <Separator orientation="vertical" className="h-6 hidden sm:block" />

          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
