// WebSocket Event wrapper
export interface WebSocketEvent<T = unknown> {
  type: string;
  data: T;
  timestamp: string;
}

// Pair Request Events
export interface PairRequestEvent {
  id: string;
  requester_id: string;
  requested_id: string;
  status: "pending" | "accepted" | "rejected";
  expires_at: string;
  created_at: string;
  requester: {
    id: string;
    name: string;
    email: string;
    picture?: string;
  };
}

export interface PairRequestResponseEvent {
  request: {
    id: string;
    status: "accepted" | "rejected";
  };
  pair?: {
    id: string;
    user1_id: string;
    user2_id: string;
    created_at: string;
  };
  accepted: boolean;
}

// Session Events
export interface SessionEvent {
  id: string;
  pair_id: string;
  created_by_user_id: string;
  media_type: "movie" | "tv";
  status: "filter_pending" | "active" | "completed";
  filters_proposed_at?: string;
  filters_accepted_at?: string;
  ended_at?: string;
  created_at: string;
  updated_at: string;
}

export interface FiltersProposedEvent {
  session: SessionEvent;
}

export interface FiltersAcceptedEvent {
  session: SessionEvent;
}

// Swipe Events
export interface PartnerSwipedEvent {
  tmdbId: number;
  direction: "left" | "right";
  userId: string;
}

export interface MatchFoundEvent {
  id: string;
  pair_id: string;
  session_id: string;
  tmdb_id: number;
  media_type: "movie" | "tv";
  title: string;
  poster_path: string | null;
  overview: string;
  matched_at: string;
  marked_watched: boolean;
}

// Match Events
export interface MatchWatchedUpdateEvent {
  matchId: string;
  markedWatched: boolean;
}

// Presence Events
export interface UserOnlineEvent {
  userId: string;
}

export interface PairUserOnlineEvent {
  userId: string;
  pairId: string;
}

export interface PartnerTypingEvent {
  userId: string;
  isTyping: boolean;
}
