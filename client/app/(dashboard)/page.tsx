"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWebSocketContext } from "../contexts/WebSocketContext";
import Chart from "@/components/dashboard/Chart";
import StatusIndicator from "@/components/dashboard/StatusIndicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const calculateBillFromUnitsConsumed = (units: number) => {
  let bill = 0;
  const tiers =
    units <= 500
      ? [
          { limit: 100, rate: 0 },
          { limit: 200, rate: 2.35 },
          { limit: 400, rate: 4.7 },
          { limit: 500, rate: 6.3 },
        ]
      : [
          { limit: 100, rate: 0 },
          { limit: 400, rate: 4.7 },
          { limit: 500, rate: 6.3 },
          { limit: 600, rate: 8.4 },
          { limit: 800, rate: 9.45 },
          { limit: 1000, rate: 10.5 },
          { limit: 9999999, rate: 11.55 },
        ];

  let previousLimit = 0;
  for (const tier of tiers) {
    if (units > previousLimit) {
      const applicableUnits = Math.min(units, tier.limit) - previousLimit;
      bill += applicableUnits * tier.rate;
      previousLimit = tier.limit;
    } else {
      break;
    }
  }

  return bill;
};

const EnergyMonitor = () => {
  const { data, isConnected } = useWebSocketContext();
  const router = useRouter();

  const [unitsConsumed, setUnitsConsumed] = useState<number>(242);
  const [previousUnits, setPreviousUnits] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (isConnected && data?.unitsConsumed !== undefined) {
      if (data.unitsConsumed !== previousUnits) {
        setUnitsConsumed((prev) => prev + data.unitsConsumed);
        setPreviousUnits(data.unitsConsumed);
      }
    }
  }, [data, isConnected]);

  const user = {
    name: "Ajay Ram",
    email: "ajayramsaravanan4@gmail.com",
    profilePic: "https://api.dicebear.com/7.x/initials/svg?seed=Ajay+Ram",
  };

  const currentDay = new Date().getDate();
  const projectedUnits = (unitsConsumed / currentDay) * 30;
  const projectedCost = calculateBillFromUnitsConsumed(projectedUnits);

  return (
    <div className="text-[#121212] w-full h-full flex flex-col py-8">
      <div className="flex items-center justify-between text-5xl font-medium pr-6">
        <StatusIndicator isConnected={isConnected} />
        <Avatar
          className="w-12 h-12 cursor-pointer"
          onClick={() => router.push("/profile")}
        >
          <AvatarImage src={user.profilePic} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-3 w-full gap-4 pr-6 mt-8 flex-wrap">
        <div className="h-56 bg-[#9BAC65] rounded-lg flex flex-col p-6 shadow-xl">
          <div className="font-medium text-xl">Units Consumed:</div>
          <div className="w-full h-full flex justify-center items-center gap-2">
            <div className="text-8xl font-bold">{unitsConsumed.toFixed(1)}</div>
            <div className="text-2xl">kwh</div>
          </div>
        </div>
        <div className="h-56 bg-[#F5B8DA] rounded-lg flex flex-col p-6 shadow-xl">
          <div className="font-medium text-xl">Total Cost:</div>
          <div className="w-full h-full flex justify-center items-center gap-2">
            <div className="text-8xl font-bold">
              {calculateBillFromUnitsConsumed(unitsConsumed).toFixed(1)}
            </div>
            <div className="text-2xl">₹</div>
          </div>
        </div>
        <div className="h-56 bg-[#D9D9D9] rounded-lg flex flex-col p-6 shadow-xl">
          <div className="font-medium text-xl">Projected Cost:</div>
          <div className="w-full h-full flex justify-center items-center gap-2">
            <div className="text-8xl font-bold">{projectedCost.toFixed(1)}</div>
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
