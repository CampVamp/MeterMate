"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Mon", value: 20 },
  { name: "Tue", value: 50 },
  { name: "Wed", value: 30 },
  { name: "Thu", value: 60 },
  { name: "Fri", value: 40 },
  { name: "Sat", value: 45 },
  { name: "Sun", value: 25 },
];

const monthlyData = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  value: Math.floor(Math.random() * 80) + 20,
}));

const yearlyData = Array.from({ length: 12 }, (_, i) => ({
  name: `Month ${i + 1}`,
  value: Math.floor(Math.random() * 100) + 50,
}));

export default function PowerConsumptionChart() {
  const [period, setPeriod] = useState("weekly");

  const data =
    period === "weekly"
      ? weeklyData
      : period === "monthly"
      ? monthlyData
      : yearlyData;

  return (
    <div className="bg-[#F6D868] rounded-xl p-6 shadow-xl col-span-2">
      <div className="text-3xl font-semibold mb-4">Power Consumption</div>
      <div className="flex gap-4 mb-6">
        {["weekly", "monthly", "yearly"].map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              period === p
                ? "bg-[#f1c40f] text-black"
                : "bg-[#F6E88C] text-gray-600"
            }`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Line type="monotone" dataKey="value" stroke="#000" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
