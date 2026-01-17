"use client";

import { useTranslations } from "next-intl";

import { Avatar, Button } from "@/components/common";
import { useDeletePair, useUserPairs } from "@/services/pairs/query-hooks";
import { PairWithOtherUser } from "@/types/pairs";

interface PairsListProps {
  onSelectPair: (pair: PairWithOtherUser) => void;
}

export const PairsList = ({ onSelectPair }: PairsListProps) => {
  const t = useTranslations("app.pairs");
  const { data: pairs, isLoading } = useUserPairs();
  const deletePair = useDeletePair();

  if (isLoading) {
    return <div className="text-center">{t("loadingPairs")}</div>;
  }

  if (!pairs?.length) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        {t("noPairs")}
      </div>
    );
  }

  return (
    <div className="grid desktop:grid-cols-3 tablet:grid-cols-2 gap-4">
      {pairs.map(pair => (
        <div
          key={pair.id}
          className="relative flex flex-col gap-4 rounded-xl bg-secondary/20 p-4 backdrop-blur-sm transition-all hover:bg-secondary/30"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12">
              <Avatar
                picture={pair.otherUser.picture ?? undefined}
                name={pair.otherUser.name}
                size={48}
              />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-lg">{pair.otherUser.name}</h3>
              <p className="text-muted-foreground text-sm">
                {pair.otherUser.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => onSelectPair(pair)}
              className="flex-1 bg-primary py-2 text-white hover:bg-primary/90"
            >
              {t("startSession")}
            </Button>
            <Button
              onClick={() => {
                if (confirm(t("removeConfirm"))) {
                  deletePair.mutate(pair.id);
                }
              }}
              className="px-3 text-destructive hover:bg-destructive/10"
              variant="text"
            >
              {t("remove")}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
