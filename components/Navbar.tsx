"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAds } from "@/context/AdsContext";

export default function Navbar() {
  const pathname = usePathname();
  const { openModal } = useAds();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-indigo-950/95 backdrop-blur-md text-white border-b border-indigo-900/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="bg-amber-400 text-indigo-950 p-2.5 rounded-2xl shadow-md font-extrabold text-2xl tracking-tight flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <i className="fa-solid fa-thumbtack -rotate-12"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Anuncios<span className="text-amber-400">SantoDomingo</span>
                </span>
                <span className="hidden sm:inline-block bg-amber-400/20 text-amber-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-amber-400/30">
                  Oficial
                </span>
              </div>
              <p className="text-xs text-indigo-300 hidden sm:block">
                Pizarra Digital Comunitaria de Huánuco
              </p>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-semibold text-indigo-100">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-xl transition duration-150 ${
                isActive("/")
                  ? "bg-indigo-900 text-amber-300 font-extrabold shadow-sm"
                  : "hover:bg-indigo-900/60 hover:text-amber-300"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/avisos"
              className={`px-3.5 py-2 rounded-xl transition duration-150 ${
                isActive("/avisos")
                  ? "bg-indigo-900 text-amber-300 font-extrabold shadow-sm"
                  : "hover:bg-indigo-900/60 hover:text-amber-300"
              }`}
            >
              Avisos
            </Link>
            <Link
              href="/servicios"
              className={`px-3.5 py-2 rounded-xl transition duration-150 ${
                isActive("/servicios")
                  ? "bg-indigo-900 text-amber-300 font-extrabold shadow-sm"
                  : "hover:bg-indigo-900/60 hover:text-amber-300"
              }`}
            >
              Servicios
            </Link>
            <Link
              href="/nosotros"
              className={`px-3.5 py-2 rounded-xl transition duration-150 ${
                isActive("/nosotros")
                  ? "bg-indigo-900 text-amber-300 font-extrabold shadow-sm"
                  : "hover:bg-indigo-900/60 hover:text-amber-300"
              }`}
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className={`px-3.5 py-2 rounded-xl transition duration-150 ${
                isActive("/contacto")
                  ? "bg-indigo-900 text-amber-300 font-extrabold shadow-sm"
                  : "hover:bg-indigo-900/60 hover:text-amber-300"
              }`}
            >
              Contacto
            </Link>
          </nav>

          {/* Botones Acción */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={() => openModal("login")}
              className="text-xs font-bold text-indigo-200 hover:text-white px-3.5 py-2.5 rounded-xl border border-indigo-700/60 hover:border-indigo-500 transition duration-150 flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-right-to-bracket text-amber-400"></i>{" "}
              Ingresar
            </button>
            <button
              onClick={() => openModal("register")}
              className="text-xs font-bold text-white bg-indigo-800 hover:bg-indigo-700 px-3.5 py-2.5 rounded-xl border border-indigo-600 transition duration-150 flex items-center gap-1.5 shadow cursor-pointer"
            >
              <i className="fa-solid fa-user-plus text-green-400"></i>{" "}
              Registrarse
            </button>
            <button
              onClick={() => openModal("publish")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-extrabold transition duration-200 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <i className="fa-solid fa-circle-plus text-sm"></i> Publicar
              Gratis
            </button>
          </div>

          {/* Botón Hamburguesa Móvil */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openModal("publish")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fa-solid fa-plus"></i> Publicar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-xl bg-indigo-900/80 text-indigo-200 hover:text-white focus:outline-none cursor-pointer"
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-indigo-950 border-b border-indigo-800 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 font-semibold text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg ${
                isActive("/")
                  ? "bg-indigo-900 text-amber-300 font-bold"
                  : "hover:bg-indigo-900"
              }`}
            >
              Inicio
            </Link>
            <Link
              href="/avisos"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg ${
                isActive("/avisos")
                  ? "bg-indigo-900 text-amber-300 font-bold"
                  : "hover:bg-indigo-900"
              }`}
            >
              Avisos Clasificados
            </Link>
            <Link
              href="/servicios"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg ${
                isActive("/servicios")
                  ? "bg-indigo-900 text-amber-300 font-bold"
                  : "hover:bg-indigo-900"
              }`}
            >
              Servicios y Guía
            </Link>
            <Link
              href="/nosotros"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg ${
                isActive("/nosotros")
                  ? "bg-indigo-900 text-amber-300 font-bold"
                  : "hover:bg-indigo-900"
              }`}
            >
              Sobre el Proyecto
            </Link>
            <Link
              href="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg ${
                isActive("/contacto")
                  ? "bg-indigo-900 text-amber-300 font-bold"
                  : "hover:bg-indigo-900"
              }`}
            >
              Contacto
            </Link>
          </nav>
          <div className="pt-4 border-t border-indigo-900 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal("login");
              }}
              className="w-full text-center py-2.5 text-xs font-bold text-white bg-indigo-900 rounded-xl border border-indigo-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-right-to-bracket text-amber-400"></i>{" "}
              Ingresar
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal("register");
              }}
              className="w-full text-center py-2.5 text-xs font-bold text-white bg-indigo-800 rounded-xl border border-indigo-600 flex items-center justify-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-user-plus text-green-400"></i> Crear
              Cuenta
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
