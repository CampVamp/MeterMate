"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { LayoutDashboardIcon, Receipt, LogOutIcon, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const menuList = [
    {
      icon: <LayoutDashboardIcon />,
      name: "Dashboard",
      link: "/",
    },
    {
      icon: <Receipt />,
      name: "Billing",
      link: "/billing",
    },
    {
      icon: <User />,
      name: "Profile",
      link: "/profile",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex w-96 p-6 h-full rounded-lg">
      <div className="w-full h-full bg-[#121212] rounded-lg flex flex-col justify-between items-center py-8 px-4">
        <div className="flex flex-col items-center w-full">
          <div className="text-white font-bold text-2xl">MeterMate</div>
          <div className="flex flex-col w-full mt-8 text-[#FFFCF4]/80">
            {menuList.map((menu, index) => {
              const isActive = pathname === menu.link;
              return (
                <Link
                  href={menu.link}
                  key={index}
                  className={`flex items-center text-lg w-full h-12 mt-4 px-4 rounded-lg cursor-pointer hover:bg-[#1E1E1E] ${
                    isActive
                      ? "border-l-4 border-[#F5B8DA] text-[#F5B8DA] rounded-none"
                      : ""
                  }`}
                >
                  {menu.icon}
                  <div className="ml-4">{menu.name}</div>
                </Link>
              );
            })}
          </div>
        </div>
        <div
          className="flex items-center w-full text-lg h-12 px-4 rounded-lg cursor-pointer text-red-200 hover:bg-[#1E1E1E] hover:text-red-400/70"
          onClick={handleLogout}
        >
          <LogOutIcon />
          <div className="ml-4">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
