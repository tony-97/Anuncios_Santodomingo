"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAds } from "@/context/AdsContext";
import FlyerCard from "@/components/FlyerCard";

function AvisosContent() {
  const searchParams = useSearchParams();
  const { anuncios, openModal } = useAds();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState<"todos" | "empleo" | "alquiler">("todos");
  const [districtFilter, setDistrictFilter] = useState("todos");

  useEffect(() => {
    const q = searchParams.get("q");
    const cat = searchParams.get("cat");
    const d = searchParams.get("distrito");

    if (q) setSearchQuery(q);
    if (cat === "empleo" || cat === "alquiler") setCurrentCategory(cat);
    if (d) setDistrictFilter(d);
  }, [searchParams]);

  const filteredAds = anuncios.filter((ad) => {
    if (currentCategory !== "todos" && ad.categoria !== currentCategory) return false;
    if (districtFilter !== "todos" && ad.distrito !== districtFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = ad.titulo.toLowerCase().includes(q);
      const matchDesc = ad.descripcion.toLowerCase().includes(q);
      const matchPhone = ad.telefono.includes(q);
      return matchTitle || matchDesc || matchPhone;
    }
    return true;
  });

  filteredAds.sort(
    (a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime()
  );

  return (
    <main className="py-8 bg-slate-100 flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Barra de Filtros */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col gap-4">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                <i className="fa-solid fa-magnifying-glass text-lg"></i>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por palabra clave... (ej. mesera, cuarto, delivery, departamento)"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-slate-800"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setCurrentCategory("todos")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition duration-200 cursor-pointer ${currentCategory === "todos"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  Todos los Avisos
                </button>
                <button
                  onClick={() => setCurrentCategory("empleo")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition duration-200 cursor-pointer ${currentCategory === "empleo"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  💼 Empleos
                </button>
                <button
                  onClick={() => setCurrentCategory("alquiler")}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition duration-200 cursor-pointer ${currentCategory === "alquiler"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  🏠 Alquileres
                </button>
              </div>

              <div className="w-full sm:w-auto">
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                >
                  <option value="todos">📍 Todos los Distritos</option>
                  <option value="Huánuco Centro">Huánuco Centro</option>
                  <option value="Amarilis">Amarilis / Paucarbamba</option>
                  <option value="Pillco Marca">Pillco Marca</option>
                  <option value="Otros">Otros Distritos</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tablero / Pizarra Virtual estilo Corcho */}
        <div className="pizarra-bg rounded-3xl p-6 sm:p-8 min-h-[520px] border-8 border-amber-950 shadow-2xl relative">
          <div className="absolute -top-5 left-8 bg-amber-900 text-amber-100 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-lg shadow-md border border-amber-700 flex items-center gap-2">
            <i className="fa-solid fa-thumbtack text-amber-400"></i> Tablero Comunitario Santo Domingo
          </div>

          {filteredAds.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
              {filteredAds.map((ad) => (
                <FlyerCard key={ad.id} ad={ad} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-24 text-slate-300">
              <i className="fa-regular fa-folder-open text-6xl mb-4 text-slate-400"></i>
              <h3 className="font-extrabold text-xl text-white">
                No hay avisos coincidentes
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mt-2">
                Prueba cambiando los términos de búsqueda o publica un nuevo aviso.
              </p>
              <button
                onClick={() => openModal("publish")}
                className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Publicar Primer Aviso
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function AvisosPage() {
  const { openModal } = useAds();

  return (
    <div className="flex flex-col min-h-full flex-grow">
      <Suspense fallback={<div className="p-12 text-center text-slate-500">Cargando avisos...</div>}>
        <AvisosContent />
      </Suspense>
    </div>
  );
}
