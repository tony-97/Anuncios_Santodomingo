"use client";

import React from "react";
import { Ad, useAds } from "@/context/AdsContext";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `Hace ${diffMins < 1 ? "unos instantes" : `${diffMins} min`}`;
  } else if (diffHours < 24) {
    return `Hace ${diffHours} h`;
  } else if (diffDays === 1) {
    return "Ayer";
  } else {
    return `Hace ${diffDays} días`;
  }
}

export default function FlyerCard({ ad }: { ad: Ad }) {
  const { openModal } = useAds();

  let bgClass = "bg-sky-100 border-sky-300";
  if (ad.color === "amarillo") bgClass = "bg-amber-100 border-amber-300";
  else if (ad.color === "verde") bgClass = "bg-emerald-100 border-emerald-300";
  else if (ad.color === "rosado") bgClass = "bg-pink-100 border-pink-300";

  const rotations = [
    "rotate-1",
    "-rotate-1",
    "rotate-0",
    "rotate-0.5",
    "-rotate-0.5",
  ];
  const rotIndex =
    Math.abs(
      ad.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    ) % rotations.length;
  const rotationClass = rotations[rotIndex];

  const waMessage = encodeURIComponent(
    `Hola! Vi tu anuncio de "${ad.titulo}" en Anuncios Santo Domingo.`
  );

  return (
    <div
      className={`relative ${bgClass} border-2 rounded-2xl p-6 shadow-lg transform hover:-translate-y-1.5 hover:rotate-0 hover:scale-[1.02] transition duration-300 flex flex-col justify-between pin-effect ${rotationClass} min-h-[320px]`}
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-3 mt-1">
          <span className="bg-indigo-950/10 text-indigo-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
            {ad.distrito}
          </span>
          <span className="text-[10px] text-slate-500 font-bold">
            {formatDate(ad.creado_en)}
          </span>
        </div>

        <h4 className="flyer-font font-black text-xl sm:text-2xl tracking-tight text-slate-900 leading-none uppercase text-center mb-4 break-words">
          {ad.titulo}
        </h4>

        <hr className="border-t border-slate-900/10 mb-4" />

        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium whitespace-pre-line mb-6">
          {ad.descripcion}
        </p>
      </div>

      <div className="space-y-3 pt-3 border-t border-slate-900/10">
        <div className="text-center">
          <span className="text-[10px] uppercase font-black text-slate-600 block">
            Llamar directo:
          </span>
          <a
            href={`tel:${ad.telefono}`}
            className="flyer-font text-2xl font-black text-red-600 hover:underline tracking-wider"
          >
            CEL: {ad.telefono}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={`https://wa.me/51${ad.telefono}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition active:scale-95"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i> WhatsApp
          </a>
          <a
            href={`tel:${ad.telefono}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow transition active:scale-95"
          >
            <i className="fa-solid fa-phone text-xs"></i> Llamar
          </a>
        </div>

        <div className="text-center pt-1">
          <button
            onClick={() => openModal("delete", ad.id)}
            className="text-[10px] text-slate-500 hover:text-rose-600 font-bold transition cursor-pointer"
          >
            <i className="fa-regular fa-trash-can mr-1"></i> Retirar Anuncio
          </button>
        </div>
      </div>
    </div>
  );
}
