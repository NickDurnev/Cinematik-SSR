import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type {
  PairRequestEvent,
  PairRequestResponseEvent,
  WebSocketEvent,
} from "@/types/websocket";

import { showPairRequestAcceptedToast } from "@/components/common/Toast";
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

        // In-app toast for new request is shown by NotificationListener
      },
    );

    // Subscribe to pair request responses
    const unsubscribeResponse = ws.onPairRequestResponse(
      ({ data }: WebSocketEvent<PairRequestResponseEvent>) => {
        setRequestResponse(data);

        // Invalidate pairs list query
        queryClient.invalidateQueries({ queryKey: ["pairs"] });

        if (data.accepted) {
          showPairRequestAcceptedToast();
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
