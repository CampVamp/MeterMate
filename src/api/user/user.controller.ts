import { handleCreateUser } from "./user.service";

export const createUser = async (req: any, res: any) => {
  const data: any = await handleCreateUser(req.body);
  res.status(data.success ? 200 : 400).send(data);
};
