"use client";

import React from "react";
import { useAds } from "@/context/AdsContext";

export default function ServiciosPage() {
  const { openModal } = useAds();

  return (
    <div className="flex flex-col min-h-full flex-grow">
      {/* BANNER HERO SERVICIOS */}
      <section className="bg-indigo-950 text-white py-12 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-extrabold uppercase px-3 py-1 rounded-full">
            Guía & Funcionalidades
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-3">
            Servicios del Sistema Comunitaria
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl mx-auto mt-2">
            Todo lo que necesitas saber para buscar y publicar avisos sin intermediarios ni cobros ocultos.
          </p>
        </div>
      </section>

      {/* GRID DE SERVICIOS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-indigo-400 transition shadow-sm">
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-5">
                <i className="fa-solid fa-bolt"></i>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                Publicación Inmediata
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Publica en menos de 60 segundos sin formularios infinitos ni validaciones molestas.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-emerald-400 transition shadow-sm">
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-5">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                Contacto WhatsApp
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Un clic para abrir el chat de WhatsApp directo con el anunciante o realizar una llamada.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-amber-400 transition shadow-sm">
              <div className="w-14 h-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-5">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                Filtros por Distrito
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filtra ofertas en Huánuco Centro, Amarilis, Pillco Marca y zonas vecinas instantáneamente.
              </p>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 hover:border-rose-400 transition shadow-sm">
              <div className="w-14 h-14 bg-rose-500 text-white rounded-2xl flex items-center justify-center text-2xl mb-5">
                <i className="fa-solid fa-key"></i>
              </div>
              <h3 className="font-extrabold text-lg text-slate-900 mb-2">
                PIN de Borrado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Control absoluto. Asigna un PIN de 4 dígitos para descolgar tu aviso cuando concretes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GUÍA EN 3 PASOS */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-slate-900">
              ¿Cómo publicar en 3 sencillos pasos?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
              <span className="text-5xl font-black text-indigo-200 absolute top-4 right-6">
                01
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                Haz clic en "Publicar Gratis"
              </h3>
              <p className="text-xs text-slate-600">
                Abre el formulario desde cualquier pantalla presionando el botón verde.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
              <span className="text-5xl font-black text-indigo-200 absolute top-4 right-6">
                02
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                Llena los datos y tu celular
              </h3>
              <p className="text-xs text-slate-600">
                Indica el título, descripción, tu número de celular y un PIN de 4 dígitos.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative">
              <span className="text-5xl font-black text-indigo-200 absolute top-4 right-6">
                03
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">
                ¡Aviso en la Pizarra!
              </h3>
              <p className="text-xs text-slate-600">
                Tu aviso aparecerá al instante para que los vecinos te contacten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (FAQ) */}
      <section className="py-16 bg-white flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-10">
            Preguntas Frecuentes (FAQ)
          </h2>

          <div className="space-y-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                ¿Tiene algún costo publicar o buscar anuncios?
              </h3>
              <p className="text-xs text-slate-600">
                No, el proyecto Anuncios Santo Domingo es 100% gratuito tanto para quienes buscan como para quienes publican.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                ¿Cómo puedo borrar mi aviso cuando consiga trabajador o inquilino?
              </h3>
              <p className="text-xs text-slate-600">
                Busca tu aviso en la pizarra, presiona el botón "Retirar Anuncio" e ingresa el PIN de 4 dígitos que elegiste al momento de publicar.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base mb-1">
                ¿En qué ciudades o distritos opera?
              </h3>
              <p className="text-xs text-slate-600">
                Está enfocado en Santo Domingo, Huánuco Centro, Amarilis, Pillco Marca y zonas aledañas del departamento de Huánuco.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => openModal("publish")}
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold px-8 py-3.5 rounded-2xl shadow-lg transition cursor-pointer"
            >
              <i className="fa-solid fa-circle-plus mr-2"></i> Publicar un Anuncio Ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
