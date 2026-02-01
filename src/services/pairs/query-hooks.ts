import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  CreateSessionDto,
  GetMatchesDto,
  PairMatch,
  ProposeFiltersDto,
  RecordSwipeDto,
  RespondPairRequestDto,
  SendPairRequestDto,
} from "@/types/pairs";

import { pairsService } from "./service";

// ==================== Query Keys ====================
export const pairsKeys = {
  all: ["pairs"] as const,
  lists: () => [...pairsKeys.all, "list"] as const,
  list: (filters?: string) => [...pairsKeys.lists(), filters] as const,
  details: () => [...pairsKeys.all, "detail"] as const,
  detail: (id: string) => [...pairsKeys.details(), id] as const,

  requests: {
    all: ["pair-requests"] as const,
    pending: () => [...pairsKeys.requests.all, "pending"] as const,
  },

  sessions: {
    all: ["pair-sessions"] as const,
    active: (pairId: string) =>
      [...pairsKeys.sessions.all, "active", pairId] as const,
  },

  content: {
    next: (sessionId: string) => ["pair-content", sessionId] as const,
  },

  matches: {
    all: ["pair-matches"] as const,
    list: (pairId: string, filters?: GetMatchesDto) =>
      [...pairsKeys.matches.all, pairId, filters] as const,
  },
};

// ==================== Pair Requests ====================

export function useSendPairRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendPairRequestDto) =>
      pairsService.sendPairRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pairsKeys.requests.all });
    },
  });
}

export function usePendingRequests() {
  return useQuery({
    queryKey: pairsKeys.requests.pending(),
    queryFn: () => pairsService.getPendingRequests(),
  });
}

export function useRespondToPairRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      data,
    }: {
      requestId: string;
      data: RespondPairRequestDto;
    }) => pairsService.respondToPairRequest(requestId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pairsKeys.requests.all });
      queryClient.invalidateQueries({ queryKey: pairsKeys.lists() });
    },
  });
}

// ==================== Pairs ====================

export function useUserPairs() {
  return useQuery({
    queryKey: pairsKeys.lists(),
    queryFn: () => pairsService.getUserPairs(),
  });
}

export function useDeletePair() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pairId: string) => pairsService.deletePair(pairId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pairsKeys.lists() });
    },
  });
}

// ==================== Sessions ====================

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pairId,
      data,
    }: {
      pairId: string;
      data: CreateSessionDto;
    }) => pairsService.createSession(pairId, data),
    onSuccess: (_, { pairId }) => {
      queryClient.invalidateQueries({
        queryKey: pairsKeys.sessions.active(pairId),
      });
    },
  });
}

export function useActiveSession(pairId: string) {
  return useQuery({
    queryKey: pairsKeys.sessions.active(pairId),
    queryFn: () => pairsService.getActiveSession(pairId),
    enabled: !!pairId,
  });
}

export function useProposeFilters() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pairId,
      sessionId,
      data,
    }: {
      pairId: string;
      sessionId: string;
      data: ProposeFiltersDto;
    }) => pairsService.proposeFilters(pairId, sessionId, data),
    onSuccess: (_, { pairId }) => {
      queryClient.invalidateQueries({
        queryKey: pairsKeys.sessions.active(pairId),
      });
    },
  });
}

export function useAcceptFilters() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pairId,
      sessionId,
    }: {
      pairId: string;
      sessionId: string;
    }) => pairsService.acceptFilters(pairId, sessionId),
    onSuccess: (_, { pairId }) => {
      queryClient.invalidateQueries({
        queryKey: pairsKeys.sessions.active(pairId),
      });
    },
  });
}

export function useEndSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pairId,
      sessionId,
    }: {
      pairId: string;
      sessionId: string;
    }) => pairsService.endSession(pairId, sessionId),
    onSuccess: (_, { pairId }) => {
      queryClient.invalidateQueries({
        queryKey: pairsKeys.sessions.active(pairId),
      });
    },
  });
}

// ==================== Swiping ====================

export function useNextContent(sessionId: string) {
  return useQuery({
    queryKey: pairsKeys.content.next(sessionId),
    queryFn: () => pairsService.getNextContent(sessionId),
    enabled: !!sessionId,
    // Don't refetch automatically - only on manual refetch
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}

export function useRecordSwipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      data,
    }: {
      sessionId: string;
      data: RecordSwipeDto;
    }) => pairsService.recordSwipe(sessionId, data),
    onSuccess: (result, { sessionId }) => {
      // Refetch next content
      queryClient.invalidateQueries({
        queryKey: pairsKeys.content.next(sessionId),
      });

      // If matched, invalidate matches list
      if (result.matched) {
        queryClient.invalidateQueries({
          queryKey: pairsKeys.matches.all,
        });
      }
    },
  });
}

// ==================== Matches ====================

export function useMatches(pairId: string, filters?: GetMatchesDto) {
  return useQuery({
    queryKey: pairsKeys.matches.list(pairId, filters),
    queryFn: () => pairsService.getMatches(pairId, filters),
    enabled: !!pairId,
  });
}

export function useMarkMatchAsWatched() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      pairId,
      matchId,
      watched,
    }: {
      pairId: string;
      matchId: string;
      watched: boolean;
    }) => pairsService.markMatchAsWatched(pairId, matchId, watched),
    onMutate: async ({ pairId, matchId, watched }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: pairsKeys.matches.list(pairId),
      });

      // Snapshot previous value
      const previousMatches = queryClient.getQueryData<PairMatch[]>(
        pairsKeys.matches.list(pairId),
      );

      // Optimistically update
      if (previousMatches) {
        queryClient.setQueryData(
          pairsKeys.matches.list(pairId),
          (old: PairMatch[] | undefined) =>
            old?.map(match =>
              match.id === matchId
                ? { ...match, marked_watched: watched }
                : match,
            ),
        );
      }

      return { previousMatches };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousMatches) {
        queryClient.setQueryData(
          pairsKeys.matches.list(variables.pairId),
          context.previousMatches,
        );
      }
    },
    onSuccess: (_, { pairId }) => {
      // Invalidate to ensure consistency
      queryClient.invalidateQueries({
        queryKey: pairsKeys.matches.list(pairId),
      });
    },
  });
}
