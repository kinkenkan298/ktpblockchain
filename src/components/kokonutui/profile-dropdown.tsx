"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Settings, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import { createLink, ToOptions, useRouter } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { authClient, useAuthenticatedUser } from "@/lib/auth/client";
import { useQueryClient } from "@tanstack/react-query";

interface Profile {
  name: string;
  email: string;
  avatar: string;
  subscription?: string;
  model?: string;
}

interface MenuItem extends ToOptions {
  label: string;
  value?: string;
  icon: React.ReactNode;
  external?: boolean;
}

interface ProfileDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: Profile;
  showTopbar?: boolean;
}

const MenuItem = createLink(DropdownMenuItem);

export default function ProfileDropdown({
  className,
  ...props
}: ProfileDropdownProps) {
  const { user } = useAuthenticatedUser();
  const [isOpen, setIsOpen] = React.useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const menuItems: MenuItem[] = [
    {
      label: "Profile",
      to: "/",
      icon: <User className="w-4 h-4" />,
    },
    {
      label: "Settings",
      to: "/",

      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    await queryClient.invalidateQueries();
    router.invalidate();
  };

  return (
    <div className={cn("relative", className)} {...props}>
      <DropdownMenu onOpenChange={setIsOpen}>
        <div className="group relative">
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-16 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 hover:shadow-sm transition-all duration-200 focus:outline-none"
            >
              <div className="text-left flex-1">
                <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                  {user?.name}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 tracking-tight leading-tight">
                  {user?.email}
                </div>
              </div>
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-primary p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-zinc-900">
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        alt={user?.name}
                        width={36}
                        height={36}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-primary font-medium text-xs sm:text-sm">
                        {user?.name.toUpperCase().charAt(0) || "U"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </DropdownMenuTrigger>

          <div
            className={cn(
              "absolute -right-3 top-1/2 -translate-y-1/2 transition-all duration-200",
              isOpen ? "opacity-100" : "opacity-60 group-hover:opacity-100"
            )}
          >
            <svg
              width="12"
              height="24"
              viewBox="0 0 12 24"
              fill="none"
              className={cn(
                "transition-all duration-200",
                isOpen
                  ? "text-primary dark:text-primary scale-110"
                  : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"
              )}
              aria-hidden="true"
            >
              <path
                d="M2 4C6 8 6 16 2 20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          <DropdownMenuContent
            align="end"
            sideOffset={4}
            className="w-64 p-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-xl shadow-zinc-900/5 dark:shadow-zinc-950/20
                    data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-top-right"
          >
            <div className="space-y-1">
              {menuItems.map((item) => (
                <MenuItem key={item.label} to={item.to}>
                  {item.icon}
                  <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight whitespace-nowrap group-hover:text-zinc-950 dark:group-hover:text-zinc-50 transition-colors">
                    {item.label}
                  </span>
                  {item.value && (
                    <span
                      className={cn(
                        "text-xs font-medium rounded-md py-1 px-2 tracking-tight",
                        item.label === "Model"
                          ? "text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10 border border-blue-500/10"
                          : "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-500/10 border border-purple-500/10"
                      )}
                    >
                      {item.value}
                    </span>
                  )}
                </MenuItem>
              ))}
            </div>

            <DropdownMenuSeparator className="my-3 bg-linear-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-800" />

            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onSelect={handleLogout}
            >
              <LogOut className="w-4 h-4 text-red-500 group-hover:text-red-600" />
              <span className="text-sm font-medium text-red-500 group-hover:text-red-600">
                Sign Out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </div>
  );
}
