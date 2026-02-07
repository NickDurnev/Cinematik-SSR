import { io, Socket } from "socket.io-client";

import { WEBSOCKET_CONFIG } from "@/libs/websocket/config";
import type {
  FiltersAcceptedEvent,
  FiltersProposedEvent,
  MatchFoundEvent,
  MatchWatchedUpdateEvent,
  PairRequestEvent,
  PairRequestResponseEvent,
  PairUserOnlineEvent,
  PartnerSwipedEvent,
  SessionEvent,
  UserOnlineEvent,
  WebSocketEvent,
} from "@/types/websocket";

type EventCallback<T = unknown> = (data: WebSocketEvent<T>) => void;

export class PairsWebSocketService {
  private socket: Socket | null = null;
  private eventHandlers: Map<string, Set<EventCallback>> = new Map();
  private isInitialized = false;

  constructor() {
    // Prevent multiple initializations
    if (typeof window === "undefined") {
      return;
    }
  }

  /**
   * Initialize and connect to WebSocket server
   * @param token JWT access token
   */
  connect(token: string): void {
    if (this.isInitialized && this.socket?.connected) {
      console.warn("WebSocket already initialized");
      return;
    }

    if (this.socket) {
      this.socket.disconnect();
    }

    const url = `${WEBSOCKET_CONFIG.url}${WEBSOCKET_CONFIG.namespace}`;

    this.socket = io(url, {
      ...WEBSOCKET_CONFIG.options,
      auth: { token },
      query: { token },
    });

    this.setupEventListeners();
    this.socket.connect();
    this.isInitialized = true;

    console.log("WebSocket connecting to:", url);
  }

  /**
   * Disconnect from WebSocket server
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isInitialized = false;
      this.eventHandlers.clear();
      console.log("WebSocket disconnected");
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  /**
   * Setup default event listeners
   */
  private setupEventListeners(): void {
    if (!this.socket) {
      return;
    }

    // Connection events
    this.socket.on("connect", () => {
      console.log("WebSocket connected:", this.socket?.id);
    });

    this.socket.on("disconnect", reason => {
      console.log("WebSocket disconnected:", reason);
    });

    this.socket.on("connect_error", error => {
      console.error("WebSocket connection error:", error);
    });

    this.socket.on("error", error => {
      console.error("WebSocket error:", error);
    });

    // Custom application events
    this.setupApplicationEvents();
  }

  /**
   * Setup application-specific event listeners
   */
  private setupApplicationEvents(): void {
    if (!this.socket) {
      return;
    }

    const events = [
      "pair-request",
      "pair-request-response",
      "session-created",
      "filters-proposed",
      "filters-accepted",
      "session-ended",
      "partner-swiped",
      "match-found",
      "match-watched-updated",
      "user-online",
      "user-offline",
      "pair-user-online",
      "pair-user-offline",
      "partner-typing",
      "online-users",
    ];

    events.forEach(event => {
      this.socket?.on(event, payload => {
        // Server may send envelope { type, data, timestamp }; unwrap so handlers receive inner data
        const data =
          payload &&
          typeof payload === "object" &&
          "data" in payload &&
          "type" in payload
            ? (payload as { data: unknown }).data
            : payload;
        this.notifyHandlers(event, data);
      });
    });
  }

  /**
   * Subscribe to an event
   * @param event Event name
   * @param callback Callback function
   * @returns Unsubscribe function
   */
  on<T = unknown>(event: string, callback: EventCallback<T>): () => void {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, new Set());
    }

    this.eventHandlers.get(event)?.add(callback as EventCallback);

    // Return unsubscribe function
    return () => {
      this.eventHandlers.get(event)?.delete(callback as EventCallback);
    };
  }

  /**
   * Emit an event to the server
   * @param event Event name
   * @param data Event data
   */
  emit(event: string, data?: unknown): void {
    if (!this.socket?.connected) {
      console.warn("Cannot emit event: WebSocket not connected");
      return;
    }

    this.socket.emit(event, data);
  }

  /**
   * Notify all handlers for an event
   */
  private notifyHandlers(event: string, data: unknown): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler =>
        handler({ type: event, data, timestamp: new Date().toISOString() }),
      );
    }
  }

  // ============ Pair-specific methods ============

  /**
   * Join a pair room to receive real-time updates
   */
  joinPair(pairId: string): void {
    this.emit("join-pair", pairId);
  }

  /**
   * Leave a pair room
   */
  leavePair(pairId: string): void {
    this.emit("leave-pair", pairId);
  }

  /**
   * Send typing indicator
   */
  sendTypingIndicator(pairId: string, isTyping: boolean): void {
    this.emit("typing", { pairId, isTyping });
  }

  // ============ Event subscriptions ============

  onPairRequest(callback: EventCallback<PairRequestEvent>): () => void {
    return this.on("pair-request", callback);
  }

  onPairRequestResponse(
    callback: EventCallback<PairRequestResponseEvent>,
  ): () => void {
    return this.on("pair-request-response", callback);
  }

  onSessionCreated(callback: EventCallback<SessionEvent>): () => void {
    return this.on("session-created", callback);
  }

  onFiltersProposed(callback: EventCallback<FiltersProposedEvent>): () => void {
    return this.on("filters-proposed", callback);
  }

  onFiltersAccepted(callback: EventCallback<FiltersAcceptedEvent>): () => void {
    return this.on("filters-accepted", callback);
  }

  onSessionEnded(callback: EventCallback<SessionEvent>): () => void {
    return this.on("session-ended", callback);
  }

  onPartnerSwiped(callback: EventCallback<PartnerSwipedEvent>): () => void {
    return this.on("partner-swiped", callback);
  }

  onMatchFound(callback: EventCallback<MatchFoundEvent>): () => void {
    return this.on("match-found", callback);
  }

  onMatchWatchedUpdated(
    callback: EventCallback<MatchWatchedUpdateEvent>,
  ): () => void {
    return this.on("match-watched-updated", callback);
  }

  onUserOnline(callback: EventCallback<UserOnlineEvent>): () => void {
    return this.on("user-online", callback);
  }

  onUserOffline(callback: EventCallback<UserOnlineEvent>): () => void {
    return this.on("user-offline", callback);
  }

  onPairUserOnline(callback: EventCallback<PairUserOnlineEvent>): () => void {
    return this.on("pair-user-online", callback);
  }

  onPairUserOffline(callback: EventCallback<PairUserOnlineEvent>): () => void {
    return this.on("pair-user-offline", callback);
  }

  onPartnerTyping(
    callback: EventCallback<{ userId: string; isTyping: boolean }>,
  ): () => void {
    return this.on("partner-typing", callback);
  }

  onOnlineUsers(callback: EventCallback<string[]>): () => void {
    return this.on("online-users", callback);
  }
}

// Singleton instance
let websocketInstance: PairsWebSocketService | null = null;

export function getWebSocketService(): PairsWebSocketService {
  if (!websocketInstance) {
    websocketInstance = new PairsWebSocketService();
  }
  return websocketInstance;
}

export default getWebSocketService;
