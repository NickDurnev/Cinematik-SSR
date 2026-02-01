import { useEffect, useRef, useState } from "react";

import { getWebSocketService } from "@/services/websocket";
import { getCookie } from "@/utils/cookies";

export function useWebSocket() {
  const wsService = useRef(getWebSocketService());
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token asynchronously
    const fetchToken = async () => {
      const accessToken = await getCookie("accessToken");
      setToken(accessToken || null);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token && !wsService.current.isConnected()) {
      wsService.current.connect(token);
    }

    return () => {
      // Cleanup on unmount (optional - you might want to keep connection alive)
      // wsService.current.disconnect();
    };
  }, [token]);

  return wsService.current;
}
