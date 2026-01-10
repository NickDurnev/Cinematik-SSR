import { useEffect, useState } from "react";
import type { UserOnlineEvent, WebSocketEvent } from "@/types/websocket";
import { useWebSocket } from "./useWebSocket";

export function usePresence() {
  const ws = useWebSocket();
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  useEffect(() => {
    const unsubscribeOnline = ws.onUserOnline(
      ({ data }: WebSocketEvent<UserOnlineEvent>) => {
        setOnlineUsers(prev => new Set(prev).add(data.userId));
      },
    );

    const unsubscribeOffline = ws.onUserOffline(
      ({ data }: WebSocketEvent<UserOnlineEvent>) => {
        setOnlineUsers(prev => {
          const next = new Set(prev);
          next.delete(data.userId);
          return next;
        });
      },
    );

    const unsubscribeList = ws.onOnlineUsers(
      ({ data }: WebSocketEvent<string[]>) => {
        setOnlineUsers(new Set(data));
      },
    );

    return () => {
      unsubscribeOnline();
      unsubscribeOffline();
      unsubscribeList();
    };
  }, [ws]);

  return {
    onlineUsers,
    isUserOnline: (userId: string) => onlineUsers.has(userId),
  };
}
