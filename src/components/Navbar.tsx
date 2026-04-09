import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { NavMenu } from "./NavMenu";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = (user as any)?.role;

  const navItems = [
    { label: "Home", href: "/", icons: "/home.png" },
    { label: "Employees", href: "/tickets/flights", icons: "/airplane.png" },
    { label: "Attendance", href: "/tickets/buses", icons: "/bus.png" },
    { label: "Leave", href: "/tickets/trains", icons: "/train.png" },
    { label: "Payroll", href: "/tickets/hotels", icons: "/bad.png" },
    { label: "Performace", href: "/tickets/cars", icons: "/car-rental.png" },
    { label: "Recuitment", href: "/tickets/concerts", icons: "/ticket.png" },
  ];

  return (
    <nav className="w-full shadow-md sticky top-0 z-50" style={{ backgroundColor: '#fff' }}>
      <div className="max-w-full px-6 py-4">
        {/* TOP SECTION - LOGO AND USER */}
        <div className="flex items-center justify-between mb-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="https://cdn.brandfetch.io/idOaERzIUS/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1771701639861"
              alt="Sesame Logo"
              width={120}
              height={120}
              priority
            />
          </Link>

          {/* USER SECTION - RIGHT */}
          <div className="flex items-center gap-6">
            <div className="flex flex-col text-right min-w-[100px]">
              <span className="text-sm font-semibold" style={{ color: '#0066cc' }}>{user?.name || "User"}</span>
              <span className="text-xs text-gray-500 capitalize">{role}</span>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* NAVIGATION MENU - CLIENT COMPONENT */}
        <NavMenu items={navItems} />
      </div>
    </nav>
  );
};

export default Navbar;
