import {
  LayoutDashboardIcon,
  Receipt,
  ChartNoAxesColumn,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const menuList = [
    {
      icon: <LayoutDashboardIcon />,
      name: "Dashboard",
      link: "/",
    },
    {
      icon: <ChartNoAxesColumn />,
      name: "Reports",
      link: "/reports",
    },
    {
      icon: <Receipt />,
      name: "Billing",
      link: "/billing",
    },
  ];
  return (
    <div className="flex w-96 p-6 h-full rounded-lg">
      <div className="w-full h-full bg-[#121212] rounded-lg flex flex-col justify-between items-center py-8 px-4">
        <div className="flex flex-col items-center w-full">
          <div className="text-white font-bold text-2xl">MeterMate</div>
          <div className="flex flex-col w-full mt-8 text-[#FFFCF4]/80">
            {menuList.map((menu, index) => (
              <Link
                href={menu.link}
                key={index}
                className="flex items-center text-lg w-full h-12 mt-4 px-4 rounded-lg cursor-pointer hover:bg-[#1E1E1E]"
              >
                {menu.icon}
                <div className="ml-4">{menu.name}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center w-full text-lg h-12 px-4 rounded-lg cursor-pointer hover:bg-[#1E1E1E] text-[#FFFCF4]/80">
          <LogOutIcon />
          <div className="ml-4">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
