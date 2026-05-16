import { ACTIVE_CLIENT_ID } from "./active-client";
import priyaAarav from "./priya-aarav/wedding.json";

// Registry of all available wedding clients
const clients: Record<string, any> = {
  "priya-aarav": priyaAarav,
};

export const clientData = clients[ACTIVE_CLIENT_ID];

if (!clientData) {
  throw new Error(`Client data not found for ID: ${ACTIVE_CLIENT_ID}`);
}
