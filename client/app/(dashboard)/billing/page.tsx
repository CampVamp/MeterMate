"use client";

import { useState } from "react";
import { useWebSocketContext } from "@/app/contexts/WebSocketContext";
import StatusIndicator from "@/components/dashboard/StatusIndicator";
import { FaReceipt } from "react-icons/fa";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type BillingEntry = {
  month: string;
  units: number;
  cost: number;
};

const Billing = () => {
  const { isConnected } = useWebSocketContext();
  const [selectedReceipt, setSelectedReceipt] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const billingData = [
    { month: "Jun-July", units: 843, cost: 5222 },
    { month: "Aug-Sep", units: 1200, cost: 9180 },
    { month: "Oct-Nov", units: 682, cost: 3655 },
    { month: "Dec-Jan", units: 990, cost: 6765 },
    { month: "Feb-Mar", units: 858, cost: 5379 },
    { month: "Apr-May", units: 505, cost: 2082 },
    { month: "Jun-July", units: 1080, cost: 7794 },
  ];

  const avgUnits = Math.round(
    billingData.reduce((acc, cur) => acc + cur.units, 0) / billingData.length
  );
  const avgCost = Math.round(
    billingData.reduce((acc, cur) => acc + cur.cost, 0) / billingData.length
  );

  const openModal = (receipt: any) => {
    setSelectedReceipt(receipt);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedReceipt(null);
  };

  const handlePrint = (entry: BillingEntry) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
    <html>
      <head>
        <title>Receipt - ${entry.month}</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h2 { margin-bottom: 0.5rem; }
          p { margin: 4px 0; }
        </style>
      </head>
      <body>
        <h2>Electricity Bill Receipt</h2>
        <p><strong>Month:</strong> ${entry.month}</p>
        <p><strong>Units Consumed:</strong> ${entry.units} kWh</p>
        <p><strong>Total Cost:</strong> ₹ ${entry.cost}</p>
        <p><strong>Paid On:</strong> 15th ${entry.month}</p>
        <p><strong>Transaction ID:</strong> TXN${Math.floor(
          Math.random() * 1e6
        )}</p>
      </body>
    </html>
  `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleDownload = (entry: BillingEntry) => {
    const receiptContent = `
    Electricity Bill Receipt

    Month: ${entry.month}
    Units Consumed: ${entry.units} kWh
    Total Cost: ₹ ${entry.cost}
    Paid On: 15th ${entry.month}
    Transaction ID: TXN${Math.floor(Math.random() * 1e6)}
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt-${entry.month}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="text-[#121212] w-full h-full flex flex-col gap-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between text-3xl font-medium">
        <StatusIndicator isConnected={isConnected} />
        <div className="w-10 h-10 bg-stone-500 rounded-full"></div>
      </div>

      {/* Summary Cards */}
      <div className="flex gap-6">
        <div className="bg-pink-200 px-6 py-4 rounded-xl shadow-md w-1/2 h-36">
          <p className="text-sm">Average Unit Consumption</p>
          <h2 className="text-4xl font-bold">{avgUnits} kWh</h2>
          <p className="text-xs text-gray-600">(Bi-monthly)</p>
        </div>
        <div className="bg-blue-200 px-6 py-4 rounded-xl shadow-md w-1/2">
          <p className="text-sm">Average Cost</p>
          <h2 className="text-4xl font-bold">₹ {avgCost}</h2>
          <p className="text-xs text-gray-600">(Bi-monthly)</p>
        </div>
      </div>

      {/* Billing Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-left border-separate border-spacing-y-0">
          <thead>
            <tr className="text-sm text-gray-600 border-b border-gray-300">
              <th className="py-2">Month</th>
              <th className="py-2">Units consumed</th>
              <th className="py-2">Cost</th>
              <th className="py-2">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((entry, idx) => {
              const showArrow =
                idx > 0 && entry.cost !== billingData[idx - 1].cost;
              const isHigher =
                idx > 0 && entry.cost > billingData[idx - 1].cost;

              return (
                <tr key={idx} className="border-collapse text-sm">
                  <td className="py-3 px-4">{entry.month}</td>
                  <td className="py-3 px-4">{entry.units}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    ₹ {entry.cost}
                    {showArrow &&
                      (isHigher ? (
                        <FaArrowUp className="text-red-500" />
                      ) : (
                        <FaArrowDown className="text-green-500" />
                      ))}
                  </td>
                  <td className="py-3 px-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <FaReceipt className="text-purple-600 cursor-pointer hover:text-purple-800" />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Receipt for {entry.month}</DialogTitle>
                          <DialogDescription>
                            Your bi-monthly energy usage details
                          </DialogDescription>
                        </DialogHeader>
                        <div className="text-sm space-y-2 mt-4">
                          <p>
                            <strong>Units Consumed:</strong> {entry.units} kWh
                          </p>
                          <p>
                            <strong>Total Cost:</strong> ₹ {entry.cost}
                          </p>
                          <p>
                            <strong>Paid On:</strong> 15th {entry.month}
                          </p>
                          <p>
                            <strong>Transaction ID:</strong> TXN
                            {Math.floor(Math.random() * 1e6)}
                          </p>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                          <Button
                            variant="outline"
                            onClick={() => handlePrint(entry)}
                          >
                            Print
                          </Button>
                          <Button onClick={() => handleDownload(entry)}>
                            Download
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
