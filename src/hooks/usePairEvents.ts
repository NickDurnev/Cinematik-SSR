import { useEffect, useState } from "react";

import type {
  MatchFoundEvent,
  PairUserOnlineEvent,
  PartnerSwipedEvent,
  PartnerTypingEvent,
  WebSocketEvent,
} from "@/types/websocket";

import { useWebSocket } from "./useWebSocket";

export function usePairEvents(pairId: string | null) {
  const ws = useWebSocket();
  const [latestMatch, setLatestMatch] = useState<MatchFoundEvent | null>(null);
  const [partnerActivity, setPartnerActivity] =
    useState<PartnerSwipedEvent | null>(null);
  const [isPartnerOnline, setIsPartnerOnline] = useState(false);
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);

  useEffect(() => {
    if (!pairId) {
      return;
    }

    // Join the pair room
    ws.joinPair(pairId);

    // Subscribe to events (match toast shown globally by GlobalNotificationListener)
    const unsubscribeMatch = ws.onMatchFound(
      ({ data }: WebSocketEvent<MatchFoundEvent>) => {
        setLatestMatch(data);
      },
    );

    const unsubscribeSwipe = ws.onPartnerSwiped(
      ({ data }: WebSocketEvent<PartnerSwipedEvent>) => {
        setPartnerActivity(data);
        setTimeout(() => setPartnerActivity(null), 3000); // Clear after 3s
      },
    );

    const unsubscribeOnline = ws.onPairUserOnline(
      ({ data }: WebSocketEvent<PairUserOnlineEvent>) => {
        if (data.pairId === pairId) {
          setIsPartnerOnline(true);
        }
      },
    );

    const unsubscribeOffline = ws.onPairUserOffline(
      ({ data }: WebSocketEvent<PairUserOnlineEvent>) => {
        if (data.pairId === pairId) {
          setIsPartnerOnline(false);
        }
      },
    );

    const unsubscribeTyping = ws.onPartnerTyping(
      ({ data }: WebSocketEvent<PartnerTypingEvent>) => {
        setIsPartnerTyping(data.isTyping);
      },
    );

    // Cleanup
    return () => {
      ws.leavePair(pairId);
      unsubscribeMatch();
      unsubscribeSwipe();
      unsubscribeOnline();
      unsubscribeOffline();
      unsubscribeTyping();
    };
  }, [pairId, ws]);

  return {
    latestMatch,
    partnerActivity,
    isPartnerOnline,
    isPartnerTyping,
  };
}
