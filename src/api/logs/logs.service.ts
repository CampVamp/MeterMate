import db from "../../config/database";
import "dotenv/config";

export const handleGetAllUserLogs = async () => {
  const collection = db.collection("logs");
  const logs = await collection.find({}).toArray();
  return logs ? { success: true, logs } : { success: false };
};

export const handleCreateLog = async (logData: { reading: any }) => {
  const collection = db.collection("logs");
  const data = { ...logData, createdAt: new Date() };
  const result = await collection.insertOne(data);
  return result ? { success: true } : { success: false };
};
