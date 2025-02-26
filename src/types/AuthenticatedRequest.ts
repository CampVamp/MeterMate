import { Request } from "express";

// Define the structure of the user object
interface UserPayload {
  id: string;
  // Add other fields if needed (e.g., email, role, etc.)
}

// Extend the Request type to include the user property
export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}
