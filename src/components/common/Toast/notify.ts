"use client";

import { toast } from "react-toastify";

import { MatchToastContent, type MatchToastData } from "./MatchToastContent";
import { PairRequestAcceptedToastContent } from "./PairRequestAcceptedToastContent";

/** Show in-app toast for a new match (replaces browser Notification). */
export function showMatchToast(data: MatchToastData) {
  toast(MatchToastContent, {
    data,
    type: "success",
    autoClose: 5000,
    closeOnClick: true,
    hideProgressBar: false,
  });
}

/** Show in-app toast when a pair request was accepted (replaces browser Notification). */
export function showPairRequestAcceptedToast() {
  toast(PairRequestAcceptedToastContent, {
    type: "success",
    autoClose: 5000,
    closeOnClick: true,
    hideProgressBar: false,
  });
}
