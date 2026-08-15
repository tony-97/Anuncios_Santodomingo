"use client";

import React, { useState } from "react";
import { useAds } from "@/context/AdsContext";

export default function ContactoPage() {
  const { showToast } = useAds();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
    showToast("Mensaje enviado al equipo de soporte.", "success");
  };

  return (
    <div className="flex flex-col min-h-full flex-grow">
      {/* BANNER HERO */}
      <section className="bg-indigo-950 text-white py-12 border-b border-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-extrabold uppercase px-3 py-1 rounded-full">
            Atención Directa
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-3">
            Contacto y Soporte Vecinal
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl mx-auto mt-2">
            ¿Tienes alguna pregunta, sugerencia o problema con un anuncio? Escríbenos directamente.
          </p>
        </div>
      </section>

      {/* FORMULARIO DE CONTACTO Y CANALES */}
      <section className="py-16 bg-white flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Columna Izquierda: Formulario */}
            <div className="lg:col-span-7 bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-sm text-slate-800">
              <h2 className="text-2xl font-black text-slate-900 mb-2">
                Envíanos un Mensaje
              </h2>
              <p className="text-xs text-slate-600 mb-6">
                Completa tus datos y nuestro equipo te responderá a la brevedad.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold uppercase text-slate-700 mb-1"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold uppercase text-slate-700 mb-1"
                  >
                    Correo Electrónico o Celular
                  </label>
                  <input
                    type="text"
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="correo@ejemplo.com o 987654321"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold uppercase text-slate-700 mb-1"
                  >
                    Mensaje o Consulta
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe tu consulta..."
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-md cursor-pointer"
                >
                  <i className="fa-solid fa-paper-plane mr-2"></i> Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Columna Derecha: Canales de Atención */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl space-y-6">
                <h3 className="text-xl font-extrabold text-amber-400">
                  Canales Comunales
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-400 text-indigo-950 rounded-xl flex items-center justify-center text-sm font-bold mt-0.5">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Ubicación del Proyecto
                      </h4>
                      <p className="text-indigo-200">
                        Santo Domingo y Huánuco Centro, Perú
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-400 text-indigo-950 rounded-xl flex items-center justify-center text-sm font-bold mt-0.5">
                      <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Atención por WhatsApp
                      </h4>
                      <p className="text-indigo-200">
                        +51 987 654 321 (Consultas académicas)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-sky-400 text-indigo-950 rounded-xl flex items-center justify-center text-sm font-bold mt-0.5">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        Correo Electrónico
                      </h4>
                      <p className="text-indigo-200">
                        soporte@anunciossantodomingo.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
