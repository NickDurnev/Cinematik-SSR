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
        setNewRequest(data);

        // Invalidate pending requests query
        queryClient.invalidateQueries({
          queryKey: ["pairs", "pending-requests"],
        });

        // Show browser notification
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("New Pair Request", {
            body: `${data.requester.name} wants to pair with you!`,
            icon: data.requester.picture,
          });
        }
      },
    );

    // Subscribe to pair request responses
    const unsubscribeResponse = ws.onPairRequestResponse(
      ({ data }: WebSocketEvent<PairRequestResponseEvent>) => {
        setRequestResponse(data);

        // Invalidate pairs list query
        queryClient.invalidateQueries({ queryKey: ["pairs"] });

        // Show notification
        if (
          data.accepted &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification("Pair Request Accepted! 🎉", {
            body: "Your pair request was accepted!",
          });
        }
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
