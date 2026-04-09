import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f9f9f9' }}>
      {/* TOP SECTION - LOGO AND USER */}
      <Navbar />
      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
