"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAds } from "@/context/AdsContext";
import FlyerCard from "@/components/FlyerCard";

export default function Home() {
  const router = useRouter();
  const { anuncios, openModal } = useAds();

  const [searchQuery, setSearchQuery] = useState("");
  const [district, setDistrict] = useState("todos");

  const jobCount = anuncios.filter((a) => a.categoria === "empleo").length;
  const rentCount = anuncios.filter((a) => a.categoria === "alquiler").length;

  const recentAds = [...anuncios]
    .sort((a, b) => new Date(b.creado_en).getTime() - new Date(a.creado_en).getTime())
    .slice(0, 6);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (district && district !== "todos") params.set("distrito", district);
    router.push(`/avisos?${params.toString()}`);
  };

  return (
    <main className="flex-grow">
      {/* HERO BUSCADOR */}
      <section className="bg-gradient-to-b from-indigo-950 via-indigo-900 to-slate-900 text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4">
            <i className="fa-solid fa-bullhorn"></i>
            <span>Clasificados Directos de Santo Domingo & Huánuco</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            ¿Qué estás buscando hoy en <span className="text-amber-400">tu comunidad</span>?
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl mx-auto mt-3">
            Encuentra trabajo, alquila habitaciones o publica tu aviso gratis en segundos.
          </p>

          {/* CAJA DE BÚSQUEDA INTEGRADA */}
          <div className="mt-8 max-w-3xl mx-auto bg-white p-3 sm:p-4 rounded-3xl shadow-2xl border border-indigo-800 text-slate-800">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="¿Qué buscas? ej. mesera, departamento, cuarto..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
                />
              </div>
              <div className="w-full sm:w-48">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="todos">📍 Todos los distritos</option>
                  <option value="Huánuco Centro">Huánuco Centro</option>
                  <option value="Amarilis">Amarilis / Paucarbamba</option>
                  <option value="Pillco Marca">Pillco Marca</option>
                  <option value="Otros">Otros distritos</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-indigo-950 font-black px-6 py-3 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <i className="fa-solid fa-search"></i> Buscar
              </button>
            </form>
          </div>

          {/* CONTADORES DE ESTADÍSTICA */}
          <div className="mt-8 flex justify-center gap-8 text-xs font-semibold text-indigo-200">
            <div>
              <i className="fa-solid fa-briefcase text-amber-400 mr-1"></i>{" "}
              <strong className="text-white text-base">{jobCount}</strong> Empleos
            </div>
            <div>
              <i className="fa-solid fa-house-chimney text-emerald-400 mr-1"></i>{" "}
              <strong className="text-white text-base">{rentCount}</strong> Alquileres
            </div>
            <div>
              <i className="fa-solid fa-shield-halved text-sky-400 mr-1"></i> Sin comisiones
            </div>
          </div>
        </div>
      </section>

      {/* TARJETAS DE CATEGORÍAS PRINCIPALES */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest text-center mb-6">
            Explora por Categorías
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Categoría Empleos */}
            <Link
              href="/avisos?cat=empleo"
              className="group bg-indigo-50 hover:bg-indigo-600 rounded-3xl p-6 border border-indigo-100 transition duration-300 flex items-center gap-5 shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-indigo-600 text-white group-hover:bg-white group-hover:text-indigo-600 rounded-2xl flex items-center justify-center text-2xl shadow transition">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 group-hover:text-white transition">
                  💼 Empleos y Trabajos
                </h3>
                <p className="text-xs text-slate-600 group-hover:text-indigo-100 transition">
                  Mozos, delivery, costura, atención y más
                </p>
              </div>
            </Link>

            {/* Categoría Alquileres */}
            <Link
              href="/avisos?cat=alquiler"
              className="group bg-emerald-50 hover:bg-emerald-600 rounded-3xl p-6 border border-emerald-100 transition duration-300 flex items-center gap-5 shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-emerald-600 text-white group-hover:bg-white group-hover:text-emerald-600 rounded-2xl flex items-center justify-center text-2xl shadow transition">
                <i className="fa-solid fa-house-chimney"></i>
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 group-hover:text-white transition">
                  🏠 Cuartos y Alquileres
                </h3>
                <p className="text-xs text-slate-600 group-hover:text-emerald-100 transition">
                  Habitaciones, departamentos y terrenos
                </p>
              </div>
            </Link>

            {/* Publicación Rápida */}
            <button
              onClick={() => openModal("publish")}
              className="group bg-amber-50 hover:bg-amber-400 rounded-3xl p-6 border border-amber-200 transition duration-300 flex items-center gap-5 shadow-sm hover:shadow-xl text-left cursor-pointer"
            >
              <div className="w-14 h-14 bg-amber-500 text-white group-hover:bg-indigo-950 group-hover:text-amber-400 rounded-2xl flex items-center justify-center text-2xl shadow transition">
                <i className="fa-solid fa-plus-circle"></i>
              </div>
              <div>
                <h3 className="font-black text-lg text-slate-900 group-hover:text-indigo-950 transition">
                  📢 Publicar Aviso Gratis
                </h3>
                <p className="text-xs text-slate-600 group-hover:text-indigo-950 transition">
                  Sin contraseñas. Colga tu anuncio hoy
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* AVISOS RECIENTES */}
      <section className="py-12 bg-slate-100 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <span className="text-indigo-600 font-extrabold text-xs uppercase tracking-widest">
                Últimas Publicaciones
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Avisos Recientes en la Comunidad
              </h2>
            </div>
            <Link
              href="/avisos"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow"
            >
              Ver Todos los Avisos <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recentAds.map((ad) => (
              <FlyerCard key={ad.id} ad={ad} />
            ))}
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <section className="py-12 bg-indigo-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black">
            ¿Tienes un empleo u oferta de alquiler?
          </h2>
          <p className="text-indigo-200 text-xs sm:text-sm">
            Llega a cientos de vecinos de Huánuco y Santo Domingo en minutos. Es totalmente gratuito y sin comisiones.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openModal("publish")}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-xl transition transform hover:scale-105 cursor-pointer"
            >
              <i className="fa-solid fa-circle-plus mr-2"></i> Publicar Aviso Gratis Ahora
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
