import { useQueryClient } from "@tanstack/react-query";
import { createLink, useRouter } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { authClient, useAuthenticatedUser } from "@/lib/auth/client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./animate-ui/components/radix/dropdown-menu";
import { SidebarMenuButton } from "./animate-ui/components/radix/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const ItemLink = createLink(DropdownMenuItem);

export function UserMenu() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();
  const { user } = useAuthenticatedUser();
  const [open, setOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    await authClient.signOut();
    await queryClient.invalidateQueries();
    router.invalidate();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage alt="User avatar" src={user?.image ?? ""} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user?.name ?? "User"}
            </span>
            <span className="truncate text-xs"> {user?.email ?? ""}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name ?? "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email ?? ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <ItemLink
          className="cursor-pointer"
          to="/dashboard/profile"
          onClick={() => setOpen(false)}
        >
          Profile
        </ItemLink>
        <ItemLink
          className="cursor-pointer"
          to="/dashboard/settings"
          onClick={() => setOpen(false)}
        >
          Settings
        </ItemLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
