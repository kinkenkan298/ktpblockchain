export function getDashboardPathByRole(
  role: string | null | undefined
): string {
  const normalizedRole = role?.toLowerCase()?.trim();

  if (normalizedRole === "admin" || normalizedRole === "super_admin") {
    return "/dashboard/admin";
  }

  return "/dashboard/user";
}

export function isAdmin(role: string | null | undefined): boolean {
  const normalizedRole = role?.toLowerCase()?.trim();
  return normalizedRole === "admin" || normalizedRole === "super_admin";
}

export function isAuthenticated(
  user: { user: { id: string } } | null | undefined
): boolean {
  return !!user?.user?.id;
}
