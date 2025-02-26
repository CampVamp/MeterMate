import { Response } from "express";
import { handleRelayControl } from "./meterControl.service";
import { AuthenticatedRequest } from "../../types/AuthenticatedRequest";

export const relayControl = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { isOn } = req.body;
  const userId = req.user?.id;

  // Check if userId is present
  if (!userId) {
    res.status(401).json({ success: false, message: "User not authenticated" });
    return; // Use `return` to exit the function
  }

  try {
    // Call the service function
    const data = await handleRelayControl(userId, isOn);

    // Send the response without returning it
    res.status(data.success ? 200 : 400).send(data);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error in relayControl:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
