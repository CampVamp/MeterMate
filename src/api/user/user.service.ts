import db from "../../config/database";

export const handleCreateUser = async (user: any) => {
  const collection = db.collection("users");
  const result = await collection.insertOne(user);
  const success = result ? true : false;
  return success;
};
