"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-slate-800">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="bg-amber-400 text-slate-950 p-1.5 rounded-lg font-black text-lg">
                <i className="fa-solid fa-thumbtack"></i>
              </div>
              <span className="font-extrabold text-lg tracking-tight">
                AnunciosSantoDomingo
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Proyecto de digitalización comunitaria para anuncios de empleo y
              alquileres en Huánuco, Perú.
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-200 uppercase tracking-wider mb-3 text-xs">
              Navegación
            </h4>
            <ul className="space-y-2 font-medium">
              <li>
                <Link href="/" className="hover:text-amber-400 transition">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/avisos"
                  className="hover:text-amber-400 transition"
                >
                  Avisos Clasificados
                </Link>
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-amber-400 transition"
                >
                  Servicios y Guía
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="hover:text-amber-400 transition"
                >
                  Sobre el Proyecto
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-amber-400 transition"
                >
                  Contacto y Soporte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-slate-200 uppercase tracking-wider mb-3 text-xs">
              Contacto
            </h4>
            <p className="mb-2">
              <i className="fa-solid fa-location-dot text-amber-400 mr-2"></i>{" "}
              Huánuco / Santo Domingo, Perú
            </p>
            <p className="mb-2">
              <i className="fa-solid fa-shield-halved text-emerald-400 mr-2"></i>{" "}
              Avisos directos sin intermediarios
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-slate-500 text-[11px] gap-2">
          <p>© 2026 AnunciosSantoDomingo. Plataforma Comunitaria.</p>
          <p>Desarrollado para el avance del proyecto universitario.</p>
        </div>
      </div>
    </footer>
  );
}
