import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sesame - Human Resource Management System",
  description: "Perfect solution for managing your company's human resources",
  icons: {
    icon: "https://cdn.brandfetch.io/idOaERzIUS/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1771701639936",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <ToastContainer position="bottom-right" theme="dark" />
        </AuthProvider>
      </body>
    </html>
  );
}
