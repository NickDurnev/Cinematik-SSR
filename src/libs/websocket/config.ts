export const WEBSOCKET_CONFIG = {
  url: process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8080",
  namespace: "/pairs",
  options: {
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ["websocket", "polling"],
  },
};
