export enum PairRequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export enum MediaType {
  MOVIE = "movie",
  TV = "tv",
}

export enum SessionStatus {
  FILTER_PENDING = "filter_pending",
  ACTIVE = "active",
  COMPLETED = "completed",
}

export enum SwipeDirection {
  LEFT = "left",
  RIGHT = "right",
}

export enum PairRequestAction {
  ACCEPT = "accept",
  REJECT = "reject",
}

// User-related types
export interface User {
  id: string;
  name: string;
  email: string;
  picture: string | null;
}

// Pair Request types
export interface PairRequest {
  id: string;
  requester_id: string;
  requested_id: string;
  status: PairRequestStatus;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export interface PairRequestWithRequester extends PairRequest {
  requester: Pick<User, "id" | "name" | "email" | "picture">;
}

// Pair types
export interface Pair {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
}

export interface PairWithOtherUser extends Pair {
  otherUser: Pick<User, "id" | "name" | "email" | "picture">;
}

// Session types
export interface PairSession {
  id: string;
  pair_id: string;
  created_by_user_id: string;
  media_type: MediaType;
  status: SessionStatus;
  filters_proposed_at: string | null;
  filters_accepted_at: string | null;
  ended_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface SessionFilter {
  id: string;
  session_id: string;
  year_min: number | null;
  year_max: number | null;
  genre_ids: number[] | null;
  created_at: string;
  updated_at: string;
}

export interface SessionWithFilters extends PairSession {
  filters?: SessionFilter | null;
}

// Swipe types
export interface Swipe {
  id: string;
  session_id: string;
  user_id: string;
  tmdb_id: number;
  media_type: MediaType;
  direction: SwipeDirection;
  created_at: string;
}

// Match types
export interface PairMatch {
  id: string;
  pair_id: string;
  session_id: string;
  tmdb_id: number;
  media_type: MediaType;
  title: string;
  poster_path: string | null;
  overview: string;
  matched_at: string;
  marked_watched: boolean;
}

// Content types
export interface Content {
  id: number;
  title: string;
  posterPath: string | null;
  overview: string;
  voteAverage?: number;
  releaseDate?: string;
  firstAirDate?: string;
}

// API Response wrapper
export interface APIResponse<T> {
  data: T;
  code: number | string;
  message: string;
  timestamp: string;
}

// Request DTOs
export interface SendPairRequestDto {
  username?: string;
  email?: string;
}

export interface RespondPairRequestDto {
  action: PairRequestAction;
}

export interface CreateSessionDto {
  mediaType: MediaType;
}

export interface ProposeFiltersDto {
  yearMin?: number;
  yearMax?: number;
  genreIds?: number[];
}

export interface RecordSwipeDto {
  tmdbId: number;
  direction: SwipeDirection;
}

export interface GetMatchesDto {
  mediaType?: MediaType;
  markedWatched?: boolean;
}

// Response types
export interface SwipeResponse {
  matched: boolean;
  match?: PairMatch;
}
