"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect } from "react";

import {
  showAppNotificationToast,
  showMatchToast,
  showPairRequestAcceptedToast,
} from "@/components/common/Toast";
import { useWebSocket } from "@/hooks/useWebSocket";
import type { WebSocketEvent } from "@/types/websocket";

const PAIRS_PATH = "/app/pairs";

export function GlobalNotificationListener() {
  const router = useRouter();
  const t = useTranslations("app.pairs");
  const ws = useWebSocket();

  const goToPairs = useCallback(() => {
    router.push(PAIRS_PATH);
  }, [router]);

  useEffect(() => {
    const unsubSessionCreated = ws.onSessionCreated(
      ({ data }: WebSocketEvent<{ pair_id?: string; pairId?: string }>) => {
        showAppNotificationToast(
          {
            title: t("notificationSessionCreated"),
            message: t("notificationSessionCreatedMessage"),
            onGoToPairs: goToPairs,
          },
          { onClick: goToPairs },
        );
      },
    );

    const unsubFiltersProposed = ws.onFiltersProposed(
      ({ data }: WebSocketEvent<{ session: { pair_id: string } }>) => {
        showAppNotificationToast(
          {
            title: t("notificationFiltersProposed"),
            message: t("notificationFiltersProposedMessage"),
            onGoToPairs: goToPairs,
          },
          { onClick: goToPairs },
        );
      },
    );

    const unsubFiltersAccepted = ws.onFiltersAccepted(
      ({ data }: WebSocketEvent<{ session: { pair_id: string } }>) => {
        showAppNotificationToast(
          {
            title: t("notificationFiltersAccepted"),
            message: t("notificationFiltersAcceptedMessage"),
            onGoToPairs: goToPairs,
          },
          { onClick: goToPairs },
        );
      },
    );

    const unsubSessionEnded = ws.onSessionEnded(
      ({ data }: WebSocketEvent<{ pair_id: string }>) => {
        showAppNotificationToast(
          {
            title: t("notificationSessionEnded"),
            message: t("notificationSessionEndedMessage"),
            onGoToPairs: goToPairs,
          },
          { onClick: goToPairs },
        );
      },
    );

    const unsubMatchFound = ws.onMatchFound(
      ({
        data,
      }: WebSocketEvent<{ title: string; poster_path: string | null }>) => {
        showMatchToast(
          { title: data.title, poster_path: data.poster_path },
          { onClick: goToPairs },
        );
      },
    );

    const unsubPairRequestResponse = ws.onPairRequestResponse(
      ({ data }: WebSocketEvent<{ accepted: boolean }>) => {
        if (data.accepted) {
          showPairRequestAcceptedToast({ onClick: goToPairs });
        }
      },
    );

    return () => {
      unsubSessionCreated();
      unsubFiltersProposed();
      unsubFiltersAccepted();
      unsubSessionEnded();
      unsubMatchFound();
      unsubPairRequestResponse();
    };
  }, [ws, t, goToPairs]);

  return null;
}
