"use client";
import { useWebSocketContext } from "./contexts/WebSocketContext";
import { sourGummy } from "@/lib/utils";

const EnergyMonitor = () => {
  const { data } = useWebSocketContext();

  return (
    // <div>
    //   <h1>Energy Data</h1>
    //   {data ? (
    //     <pre>{JSON.stringify(data, null, 2)}</pre>
    //   ) : (
    //     <p>Waiting for data...</p>
    //   )}
    // </div>
    <div className="text-[#121212] w-full h-full flex flex-col py-8">
      <div
        className={`flex items-center justify-between text-5xl font-medium pr-6 ${sourGummy.className}`}
      >
        <div>Good Morning, Ajay!</div>
        <div className="w-10 h-10 bg-stone-500 rounded-full"></div>
      </div>
      <div className="flex w-full gap-4 pr-6 mt-8">
        <div className="w-1/4 h-56 bg-[#F6D868] rounded-lg flex items-center justify-center">
          <div className="flex items-end gap-2">
            <div className="text-8xl font-bold">12</div>
            <div className="text-2xl">kwh</div>
          </div>
        </div>
        <div className="w-1/4 h-56 bg-[#F5B8DA] rounded-lg flex items-center justify-center">
          <div className="flex items-end gap-2">
            <div className="text-8xl font-bold">12</div>
            <div className="text-2xl">₹</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyMonitor;
