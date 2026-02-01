"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { InviteUI, PairsList, SessionView } from "@/components/app/pairs";
import { PairWithOtherUser } from "@/types/pairs";
import { Button } from "@/components/common";

export default function PairsPage() {
  const t = useTranslations("app.pairs");
  const [selectedPair, setSelectedPair] = useState<PairWithOtherUser | null>(
    null,
  );

  return (
    <div className="flex flex-col gap-8 pb-20">
      <div className="text-left">
        <h1 className="mb-2 font-technovier text-3xl">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {!selectedPair ? (
        <div className="grid laptop:grid-cols-[1fr_350px] gap-8">
          <div className="laptop:order-1 order-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl">{t("yourPairs")}</h2>
            </div>
            <PairsList onSelectPair={setSelectedPair} />
          </div>

          <div className="laptop:order-2 order-1">
            <InviteUI />
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-4xl">
          <Button
            onClick={() => setSelectedPair(null)}
            className="mb-4 text-muted-foreground hover:text-foreground"
            variant="text"
          >
            ← {t("backToPairs")}
          </Button>
          <SessionView
            pair={selectedPair}
            onExit={() => setSelectedPair(null)}
          />
        </div>
      )}
    </div>
  );
}
