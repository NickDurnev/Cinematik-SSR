"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { usePairRequests } from "@/hooks/usePairRequests";
import { useRespondToPairRequest } from "@/services/pairs/query-hooks";
import { PairRequestAction } from "@/types/pairs";

export const NotificationListener = () => {
  const t = useTranslations("app.pairs");
  const { clearNewRequest, newRequest } = usePairRequests();
  const respondToRequest = useRespondToPairRequest();

  useEffect(() => {
    if (newRequest) {
      toast(
        ({ closeToast }) => (
          <div className="flex flex-col gap-2">
            <p className="font-bold">
              {t("wantsToPairNotification", {
                name: newRequest.requester.name,
              })}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  respondToRequest.mutate({
                    requestId: newRequest.id,
                    data: { action: PairRequestAction.ACCEPT },
                  });
                  closeToast();
                  clearNewRequest();
                }}
                className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
              >
                {t("accept")}
              </button>
              <button
                type="button"
                onClick={() => {
                  respondToRequest.mutate({
                    requestId: newRequest.id,
                    data: { action: PairRequestAction.REJECT },
                  });
                  closeToast();
                  clearNewRequest();
                }}
                className="rounded bg-destructive px-3 py-1 text-sm text-white hover:bg-red-600"
              >
                {t("reject")}
              </button>
            </div>
          </div>
        ),
        { autoClose: 10000, closeOnClick: false },
      );
    }
  }, [newRequest, respondToRequest, clearNewRequest, t]);

  return null;
};
