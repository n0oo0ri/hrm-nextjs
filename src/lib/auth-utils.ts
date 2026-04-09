import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function getCurrentUserRole() {
  const user = await getCurrentUser();
  return (user as any)?.role || "user";
}

export async function getCurrentUserId() {
  const user = await getCurrentUser();
  return (user as any)?.id || null;
}
