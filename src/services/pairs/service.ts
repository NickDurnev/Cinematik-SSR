import { apiClient } from "@/libs/axios";
import type {
  APIResponse,
  SendPairRequestDto,
  RespondPairRequestDto,
  CreateSessionDto,
  ProposeFiltersDto,
  RecordSwipeDto,
  GetMatchesDto,
  PairRequest,
  PairRequestWithRequester,
  Pair,
  PairWithOtherUser,
  PairSession,
  SessionFilter,
  SessionWithFilters,
  Content,
  SwipeResponse,
  PairMatch,
} from "@/types/pairs";

class PairsService {
  // ==================== Pair Requests ====================

  async sendPairRequest(data: SendPairRequestDto): Promise<PairRequest> {
    const response = await apiClient.post<APIResponse<PairRequest>>(
      "/pairs/requests",
      data,
    );
    return response.data.data;
  }

  async getPendingRequests(): Promise<PairRequestWithRequester[]> {
    const response =
      await apiClient.get<APIResponse<PairRequestWithRequester[]>>(
        "/pairs/requests",
      );
    return response.data.data;
  }

  async respondToPairRequest(
    requestId: string,
    data: RespondPairRequestDto,
  ): Promise<{ request: PairRequest; pair?: Pair }> {
    const response = await apiClient.patch<
      APIResponse<{ request: PairRequest; pair?: Pair }>
    >(`/pairs/requests/${requestId}`, data);
    return response.data.data;
  }

  // ==================== Pairs ====================

  async getUserPairs(): Promise<PairWithOtherUser[]> {
    const response =
      await apiClient.get<APIResponse<PairWithOtherUser[]>>("/pairs");
    return response.data.data;
  }

  async deletePair(pairId: string): Promise<Pair> {
    const response = await apiClient.delete<APIResponse<Pair>>(
      `/pairs/${pairId}`,
    );
    return response.data.data;
  }

  // ==================== Sessions ====================

  async createSession(
    pairId: string,
    data: CreateSessionDto,
  ): Promise<PairSession> {
    const response = await apiClient.post<APIResponse<PairSession>>(
      `/pairs/${pairId}/sessions`,
      data,
    );
    return response.data.data;
  }

  async getActiveSession(pairId: string): Promise<SessionWithFilters | null> {
    const response = await apiClient.get<
      APIResponse<SessionWithFilters | null>
    >(`/pairs/${pairId}/sessions/active`);
    return response.data.data;
  }

  async proposeFilters(
    pairId: string,
    sessionId: string,
    data: ProposeFiltersDto,
  ): Promise<{ session: PairSession; filters: SessionFilter }> {
    const response = await apiClient.patch<
      APIResponse<{ session: PairSession; filters: SessionFilter }>
    >(`/pairs/${pairId}/sessions/${sessionId}/filters`, data);
    return response.data.data;
  }

  async acceptFilters(
    pairId: string,
    sessionId: string,
  ): Promise<{ session: PairSession; filters: SessionFilter }> {
    const response = await apiClient.post<
      APIResponse<{ session: PairSession; filters: SessionFilter }>
    >(`/pairs/${pairId}/sessions/${sessionId}/filters/accept`);
    return response.data.data;
  }

  async endSession(pairId: string, sessionId: string): Promise<PairSession> {
    const response = await apiClient.post<APIResponse<PairSession>>(
      `/pairs/${pairId}/sessions/${sessionId}/end`,
    );
    return response.data.data;
  }

  // ==================== Swiping ====================

  async getNextContent(sessionId: string): Promise<Content | null> {
    const response = await apiClient.get<APIResponse<Content | null>>(
      `/pairs/sessions/${sessionId}/next`,
    );
    return response.data.data;
  }

  async recordSwipe(
    sessionId: string,
    data: RecordSwipeDto,
  ): Promise<SwipeResponse> {
    const response = await apiClient.post<APIResponse<SwipeResponse>>(
      `/pairs/sessions/${sessionId}/swipe`,
      data,
    );
    return response.data.data;
  }

  // ==================== Matches ====================

  async getMatches(
    pairId: string,
    params?: GetMatchesDto,
  ): Promise<PairMatch[]> {
    const response = await apiClient.get<APIResponse<PairMatch[]>>(
      `/pairs/${pairId}/matches`,
      { params },
    );
    return response.data.data;
  }

  async markMatchAsWatched(
    pairId: string,
    matchId: string,
    watched: boolean,
  ): Promise<PairMatch> {
    const response = await apiClient.patch<APIResponse<PairMatch>>(
      `/pairs/${pairId}/matches/${matchId}/watched`,
      { watched },
    );
    return response.data.data;
  }
}

export const pairsService = new PairsService();
