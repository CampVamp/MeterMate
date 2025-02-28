"use client";
import useWebSocket from "./hooks/useWebSocket";

const EnergyMonitor = () => {
  const { data } = useWebSocket("ws://localhost:5000");

  return (
    <div>
      <h1>Energy Data</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default EnergyMonitor;
