"use client";

import React from "react";
import { useAds } from "@/context/AdsContext";

export default function Toast() {
  const { toast } = useAds();

  if (!toast.visible) return null;

  return (
    <div
      id="toast-msg"
      className="fixed bottom-6 right-6 bg-slate-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl z-50 flex items-center gap-3 border border-slate-800 transition duration-300 animate-bounce"
    >
      <span id="toast-icon" className="text-lg">
        {toast.type === "error" && (
          <i className="fa-solid fa-triangle-exclamation text-rose-500"></i>
        )}
        {toast.type === "success" && (
          <i className="fa-solid fa-circle-check text-emerald-400"></i>
        )}
        {toast.type === "info" && (
          <i className="fa-solid fa-circle-info text-amber-400"></i>
        )}
      </span>
      <span id="toast-text" className="text-xs font-bold">
        {toast.message}
      </span>
    </div>
  );
}
