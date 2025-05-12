"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const user = {
    name: "Ajay Ram",
    email: "ajayramsaravanan4@gmail.com",
    profilePic: "https://api.dicebear.com/7.x/initials/svg?seed=Ajay+Ram",
    supplyType: "Domestic",
    address: "1234 Gandhi Street, Sakkotai",
    taluk: "Kumbakonam",
    meterId: "TN-12-MTR-87321",
    meterState: "Active",
    phone: "7358505834",
    connectionDate: "2022-06-15",
    connectionType: "Single Phase",
    billingCycle: "Monthly",
    loadSanctioned: "5 kW",
    lastBilledDate: "2024-04-30",
    lastPaymentDate: "2024-05-02",
    outstandingAmount: "₹230.00",
    tariffPlan: "LT-Domestic Subsidized",
    smartMeterEnabled: "Yes",
    meterLocation: "Indoor",
    powerFactor: "0.95",
    subsidy: "Yes",
    consumerCategory: "Middle Income",
    alternateContact: "9884414631",
  };

  return (
    <div className="text-[#121212] w-full h-full flex flex-col gap-8 p-8">
      <div className="max-w-5xl mx-auto text-[#121212]">
        <Card className="shadow-sm border">
          <CardHeader className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.profilePic} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-6">
            <Detail label="Phone Number" value={user.phone} />
            <Detail label="Alternate Contact" value={user.alternateContact} />
            <Detail label="Electric Supply Type" value={user.supplyType} />
            <Detail label="Connection Type" value={user.connectionType} />
            <Detail label="Billing Cycle" value={user.billingCycle} />
            <Detail label="Load Sanctioned" value={user.loadSanctioned} />
            <Detail label="Connection Status" value={user.meterState} />
            <Detail label="Meter ID" value={user.meterId} />
            <Detail label="Meter Location" value={user.meterLocation} />
            <Detail
              label="Smart Meter Enabled"
              value={user.smartMeterEnabled}
            />
            <Detail label="Tariff Plan" value={user.tariffPlan} />
            <Detail label="Consumer Category" value={user.consumerCategory} />
            <Detail label="Government Subsidy" value={user.subsidy} />
            <Detail label="Power Factor" value={user.powerFactor} />
            <Detail label="Last Billed Date" value={user.lastBilledDate} />
            <Detail label="Last Payment Date" value={user.lastPaymentDate} />
            <Detail label="Outstanding Amount" value={user.outstandingAmount} />
            <Detail label="Connection Date" value={user.connectionDate} />
            <Detail label="Address" value={user.address} />
            <Detail label="Taluk" value={user.taluk} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-base font-medium">{value}</span>
  </div>
);

export default Profile;
