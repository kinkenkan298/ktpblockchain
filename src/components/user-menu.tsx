import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useQueryClient } from "@tanstack/react-query";
import { createLink, useRouter } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User } from "lucide-react";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { authClient, useAuthenticatedUser } from "@/lib/auth/client";
import { useState } from "react";
import { authQueryOptions } from "@/services/queries";

const ItemLink = createLink(DropdownMenuItem);

export function UserMenu() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userSession = useAuthenticatedUser();
  const [open, setOpen] = useState<boolean>(false);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onResponse: async () => {
          queryClient.setQueryData(authQueryOptions.user().queryKey, null);
          await router.invalidate();
        },
      },
    });
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-10 h-10 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage alt="User avatar" src={userSession.user.image ?? ""} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userSession.user.name ?? "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {userSession.user.email ?? ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ItemLink
          className="cursor-pointer"
          to="/"
          onClick={() => setOpen(false)}
        >
          Profile
        </ItemLink>
        <ItemLink
          className="cursor-pointer"
          to="/"
          onClick={() => setOpen(false)}
        >
          Settings
        </ItemLink>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onSelect={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
