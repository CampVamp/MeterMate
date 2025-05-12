"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWebSocketContext } from "../contexts/WebSocketContext";
import { sourGummy } from "@/lib/utils";
import Chart from "@/components/dashboard/Chart";
import StatusIndicator from "@/components/dashboard/StatusIndicator";

const EnergyMonitor = () => {
  const { data, isConnected } = useWebSocketContext();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="text-[#121212] w-full h-full flex flex-col py-8">
      <div
        className={`flex items-center justify-between text-5xl font-medium pr-6`}
      >
        <StatusIndicator isConnected={isConnected} />
        <div className="w-10 h-10 bg-stone-500 rounded-full"></div>
      </div>
      {/* {data ? (
        <div className="flex w-full gap-4 pr-6 mt-8">
          <div className="w-1/4 h-56 bg-[#F6D868] rounded-lg flex flex-col p-6 shadow-xl">
            <div className="font-medium text-xl">Units Consumed:</div>
            <div className="w-full h-full flex justify-center items-center gap-2">
              <div className="text-6xl font-bold">{data.unitsConsumed}</div>
              <div className="text-2xl">kwh</div>
            </div>
          </div>
          <div className="w-1/4 h-56 bg-[#F5B8DA] rounded-lg flex flex-col p-6 shadow-xl">
            <div className="font-medium text-xl">Total Cost:</div>
            <div className="w-full h-full flex justify-center items-center gap-2">
              <div className="text-7xl font-bold">{data.totalCost}</div>
              <div className="text-2xl">₹</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center font-semibold text-3xl">
          Connecting...
        </div>
      )} */}
      <div className="grid grid-cols-3 w-full gap-4 pr-6 mt-8 flex-wrap">
        <div className="h-56 bg-[#9BAC65] rounded-lg flex flex-col p-6 shadow-xl">
          <div className="font-medium text-xl">Units Consumed:</div>
          <div className="w-full h-full flex justify-center items-center gap-2">
            <div className="text-8xl font-bold">246</div>
            <div className="text-2xl">kwh</div>
          </div>
        </div>
        <div className="h-56 bg-[#F5B8DA] rounded-lg flex flex-col p-6 shadow-xl">
          <div className="font-medium text-xl">Total Cost:</div>
          <div className="w-full h-full flex justify-center items-center gap-2">
            <div className="text-8xl font-bold">2042</div>
            <div className="text-2xl">₹</div>
          </div>
        </div>
        <div className="h-56 bg-[#D9D9D9] rounded-lg flex flex-col p-6 shadow-xl">
          <div className="font-medium text-xl">Projected Cost:</div>
          <div className="w-full h-full flex justify-center items-center gap-2">
            <div className="text-8xl font-bold">4500</div>
            <div className="text-2xl">₹</div>
          </div>
        </div>
        <Chart />
        <div className="h-full bg-[#D9D9D9] rounded-lg flex flex-col p-6 shadow-xl">
          <div className="font-medium text-xl">Alerts:</div>
          <div className="w-full h-full flex justify-center items-center gap-2">
            <div>No Notifications</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyMonitor;
