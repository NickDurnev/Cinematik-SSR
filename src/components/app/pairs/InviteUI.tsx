"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

import { Avatar, Button, Input } from "@/components/common";
import { useDebounce } from "@/hooks/useDebounce";
import {
  usePendingRequests,
  useRespondToPairRequest,
  useSendPairRequest,
} from "@/services/pairs/query-hooks";
import { useSearchUsers } from "@/services/user/query-hooks";
import { PairRequestAction } from "@/types/pairs";

export const InviteUI = () => {
  const t = useTranslations("app.pairs");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data: searchResults, isLoading: isSearching } = useSearchUsers(
    debouncedSearch,
    debouncedSearch.length > 2,
  );

  const { data: pendingRequests } = usePendingRequests();
  const sendRequest = useSendPairRequest();
  const respondToRequest = useRespondToPairRequest();

  const handleSendRequest = async (email: string) => {
    try {
      await sendRequest.mutateAsync({ email });
      toast.success(t("invitationSent"));
      setSearchQuery("");
    } catch {
      toast.error(t("invitationFailed"));
    }
  };

  const handleRespond = async (
    requestId: string,
    action: PairRequestAction,
  ) => {
    try {
      await respondToRequest.mutateAsync({ requestId, data: { action } });
      toast.success(
        action === PairRequestAction.ACCEPT
          ? t("requestAccepted")
          : t("requestRejected"),
      );
    } catch {
      toast.error(t("requestResponseFailed"));
    }
  };

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-secondary/20 p-6 backdrop-blur-sm">
      <div className="space-y-4">
        <h2 className="font-bold text-xl">{t("findFriends")}</h2>
        <Input
          placeholder={t("searchPlaceholder")}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full"
        />

        {isSearching && (
          <div className="text-center text-sm">{t("searching")}</div>
        )}

        {searchResults && searchResults.length > 0 && (
          <div className="flex flex-col gap-2">
            {searchResults.map(user => (
              <div
                key={user.id}
                className="flex items-center justify-between rounded-lg bg-background p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10">
                    <Avatar
                      picture={user.picture ?? undefined}
                      name={user.name}
                      size={40}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => handleSendRequest(user.email)}
                  disabled={sendRequest.isPending}
                  className="bg-primary px-4 py-2 text-sm text-white"
                >
                  {sendRequest.isPending ? t("sending") : t("add")}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {pendingRequests && pendingRequests.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-bold text-xl">{t("pendingRequests")}</h2>
          <div className="flex flex-col gap-2">
            {pendingRequests.map(request => (
              <div
                key={request.id}
                className="flex items-center justify-between rounded-lg bg-background p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10">
                    <Avatar
                      picture={request.requester.picture ?? undefined}
                      name={request.requester.name}
                      size={40}
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{request.requester.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {t("wantsToPair")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      handleRespond(request.id, PairRequestAction.ACCEPT)
                    }
                    disabled={respondToRequest.isPending}
                    className="bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                  >
                    {t("accept")}
                  </Button>
                  <Button
                    onClick={() =>
                      handleRespond(request.id, PairRequestAction.REJECT)
                    }
                    disabled={respondToRequest.isPending}
                    className="bg-destructive px-3 py-1 text-sm text-white hover:bg-red-600"
                  >
                    {t("reject")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
