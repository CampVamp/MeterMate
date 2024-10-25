import db from "../../config/database";
import "dotenv/config";

export const handleGetAllUserLogs = async (user: any) => {
  const collection = db.collection("logs");
  const logs = await collection.find({ userId: user._id }).toArray();
  return logs ? { success: true, logs } : { success: false };
};

export const handleCreateLog = async (logData: {
  reading: any;
  userId: string;
}) => {
  const collection = db.collection("logs");
  const data = { ...logData, createdAt: new Date() };
  const result = await collection.insertOne(data);
  return result ? { success: true } : { success: false };
};