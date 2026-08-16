"use client";

import React, { useState } from "react";
import { useAds } from "@/context/AdsContext";

export default function Modals() {
  const {
    activeModal,
    closeModal,
    addAd,
    deleteAdTargetId,
    deleteAdWithPin,
    displaySavedPin,
    showToast,
  } = useAds();

  // Publish Form State
  const [category, setCategory] = useState<"empleo" | "alquiler">("empleo");
  const [district, setDistrict] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [color, setColor] = useState<"celeste" | "amarillo" | "verde" | "rosado">(
    "celeste"
  );

  // Delete Form State
  const [deletePin, setDeletePin] = useState("");

  if (!activeModal) return null;

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!district) {
      showToast("Selecciona un distrito válido.", "error");
      return;
    }
    addAd({
      categoria: category,
      distrito: district,
      titulo: title.toUpperCase().trim(),
      descripcion: desc.trim(),
      telefono: phone.trim(),
      pin: pin.trim(),
      color: color,
    });
    // Reset form
    setCategory("empleo");
    setDistrict("");
    setTitle("");
    setDesc("");
    setPhone("");
    setPin("");
    setColor("celeste");
  };

  const handleDeleteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteAdTargetId) {
      const success = deleteAdWithPin(deleteAdTargetId, deletePin.trim());
      if (success) {
        setDeletePin("");
      }
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    showToast("¡Sesión iniciada correctamente!", "success");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
    showToast("¡Cuenta de anunciante creada con éxito!", "success");
  };

  return (
    <>
      {/* MODAL PUBLICAR */}
      {activeModal === "publish" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="bg-indigo-950 p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-file-pen text-xl text-amber-400"></i>
                <h2 className="font-extrabold text-lg">
                  Escribe tu Aviso Digital
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="text-indigo-300 hover:text-white text-lg p-1 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-grow text-slate-800">
              <form onSubmit={handlePublishSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    1. Categoría
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`border-2 rounded-xl p-3 flex items-center gap-2 cursor-pointer transition ${category === "empleo"
                          ? "border-indigo-600 bg-indigo-50/50"
                          : "border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="opt-category"
                        value="empleo"
                        checked={category === "empleo"}
                        onChange={() => setCategory("empleo")}
                      />
                      <span className="text-xs font-bold text-slate-800">
                        💼 Empleo
                      </span>
                    </label>
                    <label
                      className={`border-2 rounded-xl p-3 flex items-center gap-2 cursor-pointer transition ${category === "alquiler"
                          ? "border-indigo-600 bg-indigo-50/50"
                          : "border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="opt-category"
                        value="alquiler"
                        checked={category === "alquiler"}
                        onChange={() => setCategory("alquiler")}
                      />
                      <span className="text-xs font-bold text-slate-800">
                        🏠 Alquiler
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    2. Distrito
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="">-- Selecciona el distrito --</option>
                    <option value="Huánuco Centro">Huánuco Centro</option>
                    <option value="Amarilis">Amarilis / Paucarbamba</option>
                    <option value="Pillco Marca">Pillco Marca</option>
                    <option value="Otros">Otros distritos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    3. Título del Aviso
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={40}
                    placeholder={
                      category === "empleo"
                        ? "ej. SE NECESITA MESERA O AYUDANTE"
                        : "ej. SE ALQUILA CUARTO O DEPARTAMENTO"
                    }
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    4. Detalle del Anuncio
                  </label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    rows={3}
                    maxLength={250}
                    placeholder={
                      category === "empleo"
                        ? "Describe los requisitos, horarios y sueldo aproximado para el puesto."
                        : "Describe los servicios incluidos, baño propio/compartido y precio."
                    }
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    5. Celular (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    pattern="[0-9]{9}"
                    placeholder="987654321"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                  />
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                  <label className="block text-xs font-bold text-amber-800 uppercase mb-1">
                    🔑 6. PIN de Borrado (4 dígitos)
                  </label>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                    pattern="[0-9]{4}"
                    placeholder="1234"
                    className="w-24 px-3 py-2 bg-white border border-amber-300 rounded-lg text-center font-bold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    7. Color del Papel
                  </label>
                  <div className="flex gap-3">
                    {(["celeste", "amarillo", "verde", "rosado"] as const).map(
                      (c) => (
                        <label key={c} className="cursor-pointer">
                          <input
                            type="radio"
                            name="opt-color"
                            value={c}
                            checked={color === c}
                            onChange={() => setColor(c)}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-8 h-8 rounded-full border-2 ${color === c ? "border-slate-900 scale-110" : "border-transparent"
                              } ${c === "celeste"
                                ? "bg-sky-200"
                                : c === "amarillo"
                                  ? "bg-amber-200"
                                  : c === "verde"
                                    ? "bg-emerald-200"
                                    : "bg-pink-200"
                              }`}
                          ></div>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition cursor-pointer"
                >
                  Colgar en la Pizarra
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL LOGIN */}
      {activeModal === "login" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="text-center mb-4">
              <h3 className="text-xl font-extrabold text-slate-900">
                Ingreso al Sistema
              </h3>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Usuario o correo"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
              />
              <input
                type="password"
                required
                placeholder="Contraseña"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
              />
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-2 rounded-xl text-sm cursor-pointer hover:bg-indigo-700 transition"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL REGISTRO */}
      {activeModal === "register" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="text-center mb-4">
              <h3 className="text-xl font-extrabold text-slate-900">
                Crear Cuenta
              </h3>
            </div>
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Nombre completo"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
              />
              <input
                type="tel"
                required
                pattern="[0-9]{9}"
                placeholder="Celular"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
              />
              <input
                type="password"
                required
                placeholder="Contraseña"
                className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm"
              />
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white font-bold py-2 rounded-xl text-sm cursor-pointer hover:bg-emerald-700 transition"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL EXITO */}
      {activeModal === "success" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative">
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">
              ¡Aviso Publicado!
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tu anuncio ya está visible.
            </p>
            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 mb-4">
              <p className="text-[10px] uppercase font-bold text-amber-800">
                PIN de Retiro:
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {displaySavedPin}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="w-full bg-slate-900 text-white font-bold py-2 rounded-xl text-sm cursor-pointer hover:bg-slate-800 transition"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* MODAL BORRADO CON PIN */}
      {activeModal === "delete" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-slate-800">
            <h3 className="text-lg font-extrabold text-slate-900 mb-2">
              Retirar Anuncio
            </h3>
            <form onSubmit={handleDeleteSubmit} className="space-y-4">
              <input
                type="password"
                value={deletePin}
                onChange={(e) => setDeletePin(e.target.value)}
                required
                pattern="[0-9]{4}"
                placeholder="****"
                className="w-32 px-4 py-2 bg-slate-100 border rounded-xl text-center font-bold text-xl mx-auto block"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-1/2 bg-slate-100 text-slate-700 font-bold py-2 rounded-xl text-xs cursor-pointer hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-rose-600 text-white font-bold py-2 rounded-xl text-xs cursor-pointer hover:bg-rose-700 transition"
                >
                  Retirar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
