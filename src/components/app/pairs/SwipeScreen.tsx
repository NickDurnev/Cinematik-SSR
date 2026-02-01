"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

import { ContentCard } from "@/components/app/ContentCard";
import { Button } from "@/components/common";
import { usePairEvents } from "@/hooks/usePairEvents";
import {
  useEndSession,
  useNextContent,
  useRecordSwipe,
} from "@/services/pairs/query-hooks";
import { IMovie } from "@/types/movie";
import { SwipeDirection } from "@/types/pairs";

interface SwipeScreenProps {
  pairId: string;
  sessionId: string;
  onExit: () => void;
}

export const SwipeScreen = ({
  pairId,
  sessionId,
  onExit,
}: SwipeScreenProps) => {
  const t = useTranslations("app.pairs");
  const [direction, setDirection] = useState<SwipeDirection | null>(null);

  // Real-time events
  const { isPartnerOnline, isPartnerTyping, partnerActivity } =
    usePairEvents(pairId);

  // Data fetching
  const { data: content, refetch: fetchNext } = useNextContent(sessionId);
  const recordSwipe = useRecordSwipe();
  const endSession = useEndSession();

  // Handle swipes
  const handleSwipe = async (swipeDir: SwipeDirection) => {
    if (!content || recordSwipe.isPending) {
      return;
    }

    setDirection(swipeDir);

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 300));

    try {
      const result = await recordSwipe.mutateAsync({
        sessionId,
        data: {
          tmdbId: content.id,
          direction: swipeDir,
        },
      });

      if (result.matched) {
        toast.success(`${t("match")} 🎉 ${result.match?.title}`);
      }

      setDirection(null);
      fetchNext();
    } catch {
      toast.error(t("swipeFailed"));
      setDirection(null);
    }
  };

  const handleEndSession = async () => {
    try {
      await endSession.mutateAsync({ pairId, sessionId });
      onExit();
    } catch {
      toast.error(t("sessionEndFailed"));
    }
  };

  if (!content) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h2 className="font-bold text-2xl">{t("noMoreContent")}</h2>
        <p className="text-muted-foreground">{t("recommendationsDone")}</p>
        <Button onClick={handleEndSession} className="bg-primary text-white">
          {t("endSession")}
        </Button>
      </div>
    );
  }

  // Convert Content to IMovie for ContentCard
  const movieData = {
    ...content,
    genre_ids: [],
    poster_path: content.posterPath,
    vote_average: content.voteAverage || 0,
    release_date: content.releaseDate || "",
  } as unknown as IMovie;

  return (
    <div className="relative flex min-h-[600px] w-full flex-col items-center justify-center gap-8 overflow-hidden">
      {/* Status Header */}
      <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between rounded-full bg-secondary/50 px-6 py-2 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${
              isPartnerOnline
                ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                : "bg-gray-400"
            }`}
          />
          <span className="font-medium text-sm">
            {isPartnerOnline ? t("partnerOnline") : t("partnerOffline")}
          </span>
          {isPartnerTyping && (
            <span className="ml-2 animate-pulse text-muted-foreground text-xs">
              {t("swiping")}
            </span>
          )}
        </div>

        <Button
          onClick={handleEndSession}
          variant="text"
          className="text-muted-foreground text-xs hover:text-destructive"
        >
          {t("endSession")}
        </Button>
      </div>

      {/* Partner Activity Indicator */}
      <AnimatePresence>
        {partnerActivity && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-16 z-20 rounded-full px-4 py-1 font-bold text-sm text-white shadow-lg ${
              partnerActivity.direction === SwipeDirection.RIGHT
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {t("partner")}{" "}
            {partnerActivity.direction === SwipeDirection.RIGHT
              ? t("liked")
              : t("passed")}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Stack */}
      <div className="relative mt-10 h-[465px] w-[310px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={content.id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x:
                direction === SwipeDirection.LEFT
                  ? -500
                  : direction === SwipeDirection.RIGHT
                    ? 500
                    : 0,
              rotate:
                direction === SwipeDirection.LEFT
                  ? -20
                  : direction === SwipeDirection.RIGHT
                    ? 20
                    : 0,
            }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) {
                handleSwipe(SwipeDirection.RIGHT);
              } else if (info.offset.x < -100) {
                handleSwipe(SwipeDirection.LEFT);
              }
            }}
          >
            <div className="pointer-events-none h-full w-full rounded-xl bg-secondary shadow-2xl">
              <ContentCard data={movieData} />

              {/* Overlay for swipe feedback */}
              <motion.div
                className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-black/40 opacity-0"
                style={{ opacity: direction ? 0.4 : 0 }}
              >
                {direction === SwipeDirection.RIGHT && (
                  <div className="-rotate-12 rounded-lg border-4 border-green-500 p-4 font-bold text-4xl text-green-500">
                    LIKE
                  </div>
                )}
                {direction === SwipeDirection.LEFT && (
                  <div className="rotate-12 rounded-lg border-4 border-red-500 p-4 font-bold text-4xl text-red-500">
                    NOPE
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe(SwipeDirection.LEFT)}
          disabled={recordSwipe.isPending || !!direction}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary shadow-lg transition-colors hover:bg-red-100 disabled:opacity-50"
        >
          <span className="text-2xl">❌</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSwipe(SwipeDirection.RIGHT)}
          disabled={recordSwipe.isPending || !!direction}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary shadow-lg transition-colors hover:bg-green-100 disabled:opacity-50"
        >
          <span className="text-2xl">💚</span>
        </motion.button>
      </div>
    </div>
  );
};
