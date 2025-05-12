const StatusIndicator = ({ isConnected }: { isConnected: boolean }) => {
  return (
    <div className="flex items-center justify-center p-3 rounded-3xl bg-[#EDE7D9]">
      <div
        className={`w-4 h-4 rounded-full ${
          isConnected ? "bg-green-500" : "bg-red-500"
        }`}
      />
      <span className="ml-2 text-sm font-medium">
        {isConnected ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default StatusIndicator;
