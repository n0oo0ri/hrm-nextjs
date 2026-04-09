"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/sign-in");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-all font-medium"
      style={{ backgroundColor: '#0066cc' }}
    >
      Logout
    </button>
  );
}
