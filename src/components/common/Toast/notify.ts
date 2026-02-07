"use client";

import type { ToastOptions } from "react-toastify";
import { toast } from "react-toastify";

import {
  AppNotificationToast,
  type AppNotificationToastData,
} from "./AppNotificationToast";
import { MatchToastContent, type MatchToastData } from "./MatchToastContent";
import { PairRequestAcceptedToastContent } from "./PairRequestAcceptedToastContent";

type ToastOptionsWithoutData = Omit<ToastOptions, "data">;

/** Show in-app toast for a new match (replaces browser Notification). */
export function showMatchToast(
  data: MatchToastData,
  options?: ToastOptionsWithoutData,
) {
  toast(MatchToastContent, {
    data,
    type: "success",
    autoClose: 5000,
    closeOnClick: true,
    hideProgressBar: false,
    ...options,
  });
}

/** Show in-app toast when a pair request was accepted (replaces browser Notification). */
export function showPairRequestAcceptedToast(
  options?: ToastOptionsWithoutData,
) {
  toast(PairRequestAcceptedToastContent, {
    type: "success",
    autoClose: 5000,
    closeOnClick: true,
    hideProgressBar: false,
    ...options,
  });
}

/** Show generic app notification (e.g. session/filter events). Click can navigate to Pairs via data.onGoToPairs. */
export function showAppNotificationToast(
  data: AppNotificationToastData,
  options?: ToastOptionsWithoutData,
) {
  toast(AppNotificationToast, {
    data,
    type: "info",
    autoClose: 6000,
    closeOnClick: true,
    hideProgressBar: false,
    ...options,
  });
}
