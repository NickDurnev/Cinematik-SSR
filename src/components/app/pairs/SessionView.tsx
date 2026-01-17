"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/common";
import { Select } from "@/components/common/Select";
import {
  useAcceptFilters,
  useActiveSession,
  useCreateSession,
  useProposeFilters,
} from "@/services/pairs/query-hooks";
import { MediaType, PairWithOtherUser, SessionStatus } from "@/types/pairs";

import { SwipeScreen } from "./SwipeScreen";

interface SessionViewProps {
  pair: PairWithOtherUser;
  onExit: () => void;
}

export const SessionView = ({ pair, onExit }: SessionViewProps) => {
  const t = useTranslations("app.pairs");
  const { data: session, isLoading } = useActiveSession(pair.id);
  const createSession = useCreateSession();
  const proposeFilters = useProposeFilters();
  const acceptFilters = useAcceptFilters();

  const [mediaType, setMediaType] = useState<MediaType>(MediaType.MOVIE);
  const [yearMin, setYearMin] = useState(2000);
  const [yearMax, setYearMax] = useState(2024);

  const handleCreateSession = async () => {
    try {
      const newSession = await createSession.mutateAsync({
        pairId: pair.id,
        data: { mediaType },
      });

      // Immediately propose default filters for now
      await proposeFilters.mutateAsync({
        pairId: pair.id,
        sessionId: newSession.id,
        data: { yearMin, yearMax },
      });

      toast.success(t("sessionStarted"));
    } catch {
      toast.error(t("sessionStartFailed"));
    }
  };

  const handleAcceptFilters = async () => {
    if (!session) {
      return;
    }
    try {
      await acceptFilters.mutateAsync({
        pairId: pair.id,
        sessionId: session.id,
      });
      toast.success(t("filtersAccepted"));
    } catch {
      toast.error(t("filtersAcceptFailed"));
    }
  };

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  // Active Swiping Session
  if (session?.status === SessionStatus.ACTIVE) {
    return (
      <SwipeScreen pairId={pair.id} sessionId={session.id} onExit={onExit} />
    );
  }

  // Session Setup / Waiting
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-secondary/20 p-8 backdrop-blur-sm">
      <div className="text-center">
        <h2 className="mb-2 font-bold text-2xl">
          {t("sessionWith", { name: pair.otherUser.name })}
        </h2>
        <p className="text-muted-foreground">{t("findSomething")}</p>
      </div>

      {!session ? (
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <label className="font-medium text-sm">{t("whatToWatch")}</label>
            <div className="flex gap-4">
              <Button
                onClick={() => setMediaType(MediaType.MOVIE)}
                className={`flex-1 py-3 ${
                  mediaType === MediaType.MOVIE
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground"
                }`}
              >
                {t("movies")}
              </Button>
              <Button
                onClick={() => setMediaType(MediaType.TV)}
                className={`flex-1 py-3 ${
                  mediaType === MediaType.TV
                    ? "bg-primary text-white"
                    : "bg-secondary text-foreground"
                }`}
              >
                {t("tvShows")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium text-sm">{t("fromYear")}</label>
              <Select
                options={Array.from({ length: 50 }, (_, i) => ({
                  value: String(2024 - i),
                  label: String(2024 - i),
                }))}
                value={String(yearMin)}
                label={String(yearMin)}
                onChange={e => setYearMin(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium text-sm">{t("toYear")}</label>
              <Select
                options={Array.from({ length: 50 }, (_, i) => ({
                  value: String(2024 - i),
                  label: String(2024 - i),
                }))}
                value={String(yearMax)}
                label={String(yearMax)}
                onChange={e => setYearMax(Number(e.target.value))}
              />
            </div>
          </div>

          <Button
            onClick={handleCreateSession}
            disabled={createSession.isPending || proposeFilters.isPending}
            className="mt-4 bg-primary py-3 font-bold text-lg text-white shadow-lg transition-transform hover:scale-105"
          >
            {createSession.isPending ? t("starting") : t("startSwiping")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="animate-pulse text-6xl">⏳</div>
          <div className="text-center">
            <h3 className="font-bold text-xl">{t("waitingForPartner")}</h3>
            <p className="mt-2 text-muted-foreground">
              {session.filters_proposed_at
                ? t("waitingForFilters")
                : t("settingUp")}
            </p>
          </div>

          {session.status === SessionStatus.FILTER_PENDING &&
            session.created_by_user_id !==
              pair.user1_id /* Check if user needs to accept */ && (
              <Button
                onClick={handleAcceptFilters}
                disabled={acceptFilters.isPending}
                className="bg-green-500 px-8 py-3 text-white shadow-lg hover:bg-green-600"
              >
                {t("acceptFiltersStart")}
              </Button>
            )}

          <Button
            onClick={onExit}
            variant="text"
            className="text-muted-foreground"
          >
            {t("cancel")}
          </Button>
        </div>
      )}
    </div>
  );
};
