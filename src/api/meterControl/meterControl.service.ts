import { sendCommandToESP8266 } from "../../sockets/socket.server";
import { handleUpdateMeterStatus } from "../user/user.service";

export const handleRelayControl = async (userId: string, isOn: boolean) => {
  const command = isOn ? "relay_on" : "relay_off";
  sendCommandToESP8266(command);
  const result = await handleUpdateMeterStatus(
    userId,
    isOn ? "ACTIVE" : "INACTIVE"
  );
  return result;
};
