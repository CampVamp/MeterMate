import { ObjectId } from "mongodb";
import db from "../../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const handleGetAllUsers = async () => {
  const collection = db.collection("users");
  const users = await collection.find().toArray();
  return users ? { success: true, users } : { success: false };
};

export const handleCreateUser = async (user: any) => {
  const collection = db.collection("users");

  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  const result = await collection.insertOne(user);
  return result ? { success: true, user } : { success: false };
};

export const handleGetUserById = async (userId: string) => {
  const collection = db.collection("users");
  const user = await collection.findOne({ _id: new ObjectId(userId) });
  return user ? { success: true, user } : { success: false };
};

export const handleUpdateUser = async (userId: string, updateData: any) => {
  const collection = db.collection("users");
  const result = await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: updateData }
  );
  return result.modifiedCount > 0 ? { success: true } : { success: false };
};

export const handleDeleteUser = async (userId: string) => {
  const collection = db.collection("users");
  const result = await collection.deleteOne({ _id: new ObjectId(userId) });
  return result.deletedCount > 0 ? { success: true } : { success: false };
};

export const handleUserLogin = async (email: string, password: string) => {
  const collection = db.collection("users");
  const user = await collection.findOne({ email });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return { success: false, message: "Invalid credentials" };
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { success: true, token, userId: user._id };
};

export const handleUpdateMeterStatus = async (
  userId: string,
  meterStatus: "ACTIVE" | "INACTIVE"
) => {
  const collection = db.collection("users");
  const result = await collection.updateOne(
    { _id: new ObjectId(userId) },
    { $set: { meterStatus } }
  );
  return result.modifiedCount > 0 ? { success: true } : { success: false };
};
