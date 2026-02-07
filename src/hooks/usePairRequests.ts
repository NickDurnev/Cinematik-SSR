import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type {
  PairRequestEvent,
  PairRequestResponseEvent,
  WebSocketEvent,
} from "@/types/websocket";

import { useWebSocket } from "./useWebSocket";

export function usePairRequests() {
  const ws = useWebSocket();
  const queryClient = useQueryClient();
  const [newRequest, setNewRequest] = useState<PairRequestEvent | null>(null);
  const [requestResponse, setRequestResponse] =
    useState<PairRequestResponseEvent | null>(null);

  useEffect(() => {
    // Subscribe to incoming pair requests
    const unsubscribeRequest = ws.onPairRequest(
      ({ data }: WebSocketEvent<PairRequestEvent>) => {
        if (!data?.requester) {
          return;
        }
        setNewRequest(data);

        // Invalidate pending requests query
        queryClient.invalidateQueries({
          queryKey: ["pairs", "pending-requests"],
        });

        // In-app toast for new request is shown by NotificationListener
      },
    );

    // Subscribe to pair request responses (toast with redirect shown by GlobalNotificationListener)
    const unsubscribeResponse = ws.onPairRequestResponse(
      ({ data }: WebSocketEvent<PairRequestResponseEvent>) => {
        setRequestResponse(data);

        // Invalidate pairs list query
        queryClient.invalidateQueries({ queryKey: ["pairs"] });
      },
    );

    return () => {
      unsubscribeRequest();
      unsubscribeResponse();
    };
  }, [ws, queryClient]);

  return {
    newRequest,
    requestResponse,
    clearNewRequest: () => setNewRequest(null),
    clearRequestResponse: () => setRequestResponse(null),
  };
}
