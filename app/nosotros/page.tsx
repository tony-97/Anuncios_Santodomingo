"use client";

import React from "react";

export default function NosotrosPage() {
  return (
    <div className="flex flex-col min-h-full flex-grow">
      {/* BANNER HERO */}
      <section className="bg-indigo-950 text-white py-12 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-extrabold uppercase px-3 py-1 rounded-full">
            Innovación Social
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-3">
            Sobre el Proyecto Anuncios Santo Domingo
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Conectando vecinos de Huánuco a través de la digitalización de avisos comunitarios.
          </p>
        </div>
      </section>

      {/* HISTORIA Y MISIÓN */}
      <section className="py-16 bg-white border-b border-slate-200 flex-grow">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Digitalizando la Pizarra Comunitaria
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                En muchas comunidades de Santo Domingo y Huánuco, la forma tradicional de alquilar un cuarto o buscar trabajo es colocar papelitos en postes y murales públicos.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Este proyecto universitario toma esa costumbre local y la traslada al mundo digital para que cualquier vecino pueda publicar y consultar avisos directo en su teléfono.
              </p>
            </div>
            <div className="bg-indigo-900 text-white rounded-3xl p-8 shadow-xl space-y-4">
              <div className="w-12 h-12 bg-amber-400 text-indigo-950 rounded-2xl flex items-center justify-center text-xl font-bold">
                <i className="fa-solid fa-heart"></i>
              </div>
              <h3 className="text-xl font-extrabold">Nuestra Misión</h3>
              <p className="text-xs text-indigo-100 leading-relaxed">
                Facilitar el acceso libre a oportunidades de empleo local y alquileres dignos sin cobro de comisiones, reduciendo la brecha digital en la región.
              </p>
            </div>
          </div>

          {/* VALORES CLAVE */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                <i className="fa-solid fa-handshake"></i>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                Inclusión
              </h3>
              <p className="text-xs text-slate-600">
                Acceso 100% gratuito sin barreras para todos los ciudadanos.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                Transparencia
              </h3>
              <p className="text-xs text-slate-600">
                Trato directo entre vecino y vecino sin intermediarios.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                <i className="fa-solid fa-seedling"></i>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                Sostenibilidad
              </h3>
              <p className="text-xs text-slate-600">
                Reducción del uso de papel impreso y contaminación visual en las calles.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
