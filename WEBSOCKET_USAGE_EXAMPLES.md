# WebSocket Usage Examples

This guide provides practical examples of how to use the WebSocket hooks and services implemented in the project.

## Table of Contents
1. [Setup](#setup)
2. [Hooks](#hooks)
   - [useWebSocket](#usewebsocket)
   - [usePairEvents](#usepairevents)
   - [usePairRequests](#usepairrequests)
   - [usePresence](#usepresence)
3. [Component Examples](#component-examples)
   - [Real-time Swipe Screen](#real-time-swipe-screen)
   - [Global Notifications](#global-notifications)
   - [Online Status Indicator](#online-status-indicator)

---

## Setup

Ensure your environment variables are configured in `.env.local`:

```env
NEXT_PUBLIC_WS_URL=http://localhost:8080
```

The WebSocket connection is automatically managed by the `useWebSocket` hook, which connects when an access token is available.

---

## Hooks

### useWebSocket

Base hook that provides access to the singleton `PairsWebSocketService` instance. It handles automatic connection management.

```typescript
import { useWebSocket } from "@/hooks/useWebSocket";

function MyComponent() {
  const ws = useWebSocket();
  
  // Direct access to service methods if needed
  // ws.emit('custom-event', data);
}
```

### usePairEvents

Subscribes to events for a specific pair session, including matches, partner swipes, online status, and typing indicators.

```typescript
import { usePairEvents } from "@/hooks/usePairEvents";

const { 
  latestMatch,      // MatchFoundEvent | null
  partnerActivity,  // PartnerSwipedEvent | null
  isPartnerOnline,  // boolean
  isPartnerTyping   // boolean
} = usePairEvents(pairId);
```

### usePairRequests

Listens for incoming pair requests and responses. It automatically invalidates React Query caches for lists.

```typescript
import { usePairRequests } from "@/hooks/usePairRequests";

const { 
  newRequest,           // PairRequestEvent | null
  requestResponse,      // PairRequestResponseEvent | null
  clearNewRequest,      // () => void
  clearRequestResponse  // () => void
} = usePairRequests();
```

### usePresence

Tracks online status of users globally (or friend list).

```typescript
import { usePresence } from "@/hooks/usePresence";

const { 
  onlineUsers,   // Set<string> (userIds)
  isUserOnline   // (userId: string) => boolean
} = usePresence();
```

---

## Component Examples

### Real-time Swipe Screen

This example demonstrates how to show partner activity and matches in real-time during a swiping session.

```typescript
// src/components/app/pairs/SwipeScreen.tsx
import { useEffect } from "react";
import { usePairEvents } from "@/hooks/usePairEvents";
import { useRecordSwipeMutation } from "@/hooks/mutations/usePairs";
import { toast } from "react-hot-toast";

export function SwipeScreen({ pairId, sessionId }: { pairId: string; sessionId: string }) {
  const { 
    latestMatch, 
    partnerActivity, 
    isPartnerOnline, 
    isPartnerTyping 
  } = usePairEvents(pairId);

  // Handle new match
  useEffect(() => {
    if (latestMatch) {
      toast.success(`It's a match! ${latestMatch.title}`);
      // Trigger match animation modal here
    }
  }, [latestMatch]);

  return (
    <div className="flex flex-col gap-4">
      {/* Status Bar */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className={`w-2 h-2 rounded-full ${isPartnerOnline ? 'bg-green-500' : 'bg-gray-300'}`} />
        {isPartnerOnline ? 'Partner Online' : 'Partner Offline'}
        {isPartnerTyping && <span className="italic"> (Swiping...)</span>}
      </div>

      {/* Partner Activity Toast */}
      {partnerActivity && (
        <div className="absolute top-4 right-4 bg-blue-100 p-2 rounded shadow">
          Partner {partnerActivity.direction === 'right' ? 'liked' : 'passed'}
        </div>
      )}

      {/* Main Swipe Area */}
      {/* ... Card Stack ... */}
    </div>
  );
}
```

### Global Notifications

Add this to your main layout to handle incoming pair requests anywhere in the app.

```typescript
// src/components/layout/NotificationListener.tsx
"use client";

import { useEffect } from "react";
import { usePairRequests } from "@/hooks/usePairRequests";
import { toast } from "react-hot-toast";
import { useRespondToPairRequest } from "@/services/pairs/query-hooks";

export function NotificationListener() {
  const { newRequest, clearNewRequest } = usePairRequests();
  const respondToRequest = useRespondToPairRequest();

  useEffect(() => {
    if (newRequest) {
      toast((t) => (
        <div>
          <p className="font-bold">{newRequest.requester.name} wants to pair!</p>
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => {
                respondToRequest.mutate({ requestId: newRequest.id, data: { action: 'accept' } });
                toast.dismiss(t.id);
                clearNewRequest();
              }}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Accept
            </button>
            <button 
              onClick={() => {
                respondToRequest.mutate({ requestId: newRequest.id, data: { action: 'reject' } });
                toast.dismiss(t.id);
                clearNewRequest();
              }}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ), { duration: 10000 });
    }
  }, [newRequest, respondToRequest, clearNewRequest]);

  return null; // Headless component
}
```

### Online Status Indicator

A reusable avatar component with online status dot.

```typescript
// src/components/common/UserAvatar.tsx
import { Avatar } from "@/components/common/Avatar";
import { usePresence } from "@/hooks/usePresence";

interface UserAvatarProps {
  userId: string;
  src?: string;
  alt: string;
}

export function UserAvatar({ userId, src, alt }: UserAvatarProps) {
  const { isUserOnline } = usePresence();
  const isOnline = isUserOnline(userId);

  return (
    <div className="relative inline-block">
      <Avatar src={src} alt={alt} />
      {isOnline && (
        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
      )}
    </div>
  );
}
```
