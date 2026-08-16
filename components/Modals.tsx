"use client";

import React, { useState, useEffect } from "react";
import { useAds } from "@/context/AdsContext";

export default function Modals() {
  const {
    activeModal,
    closeModal,
    addAd,
    deleteAdTargetId,
    deleteAd,
    showToast,
    openModal,
    anuncios,
    user,
    isLoggedIn,
    pendingOtpPhone,
    setPendingOtpPhone,
    login,
    register,
    verifyOtp,
  } = useAds();

  // Publish Form State
  const [category, setCategory] = useState<"empleo" | "alquiler">("empleo");
  const [district, setDistrict] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phone, setPhone] = useState("");
  const [color, setColor] = useState<"celeste" | "amarillo" | "verde" | "rosado">("celeste");

  // Auth Form States
  const [loginPhone, setLoginPhone] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regNombre, setRegNombre] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  // OTP State
  const [otpPhoneInput, setOtpPhoneInput] = useState("");
  const [otpCode, setOtpCode] = useState<string[]>(["7", "2", "8", "4", "1", "9"]);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync phone when user logs in or pending OTP changes
  useEffect(() => {
    if (user) {
      setPhone(user.telefono);
    }
  }, [user]);

  useEffect(() => {
    if (pendingOtpPhone) {
      setOtpPhoneInput(pendingOtpPhone);
    }
  }, [pendingOtpPhone]);

  // OTP Timer Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeModal === "otp" && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeModal, otpTimer]);

  if (!activeModal) return null;

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!district) {
      showToast("Selecciona un distrito válido.", "error");
      return;
    }
    const phoneToUse = phone.trim() || (user ? user.telefono : "");
    if (!phoneToUse) {
      showToast("Ingresa un número de celular válido.", "error");
      return;
    }

    addAd({
      categoria: category,
      distrito: district,
      titulo: title.toUpperCase().trim(),
      descripcion: desc.trim(),
      telefono: phoneToUse,
      color: color,
      userId: user?.id,
    });

    // Reset form
    setCategory("empleo");
    setDistrict("");
    setTitle("");
    setDesc("");
    setPhone(user?.telefono || "");
    setColor("celeste");
  };

  const handleConfirmDelete = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteAdTargetId) {
      deleteAd(deleteAdTargetId);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone || !loginPassword) {
      showToast("Por favor completa tu celular y contraseña.", "error");
      return;
    }
    setIsSubmitting(true);
    await login(loginPhone, loginPassword);
    setIsSubmitting(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNombre || !regPhone || !regPassword) {
      showToast("Todos los campos son obligatorios.", "error");
      return;
    }
    setIsSubmitting(true);
    const res = await register(regNombre, regPhone, regPassword);
    setIsSubmitting(false);
    if (res.success) {
      setOtpPhoneInput(regPhone);
      setOtpTimer(60);
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = otpCode.join("");
    if (fullCode.length !== 6) {
      showToast("Ingresa el código completo de 6 dígitos.", "error");
      return;
    }
    setIsSubmitting(true);
    await verifyOtp(otpPhoneInput || pendingOtpPhone, fullCode);
    setIsSubmitting(false);
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    const cleanVal = val.replace(/\D/g, "").slice(-1);
    const newCode = [...otpCode];
    newCode[index] = cleanVal;
    setOtpCode(newCode);

    // Auto focus next input
    if (cleanVal && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Filtrar anuncios estrictamente por el usuario activo (id o teléfono)
  const userAds = user
    ? anuncios.filter((ad) => {
        const isUser1 = user.telefono === "994385288" || String(user.id) === "1";
        const isUser2 = user.telefono === "948912502" || String(user.id) === "2";
        if (isUser1 && (ad.id === "seed-1" || ad.id === "seed-4" || ad.id === "seed-5")) return true;
        if (isUser2 && (ad.id === "seed-2" || ad.id === "seed-3" || ad.id === "seed-6")) return true;
        const matchesId = ad.userId != null && String(ad.userId) === String(user.id);
        const matchesPhone = ad.telefono && ad.telefono === user.telefono;
        return matchesId || matchesPhone;
      })
    : [];

  return (
    <>
      {/* ── MODAL 01: PUBLICAR AVISO (SIN PIN) ───────────────────────────── */}
      {activeModal === "publish" && (
        <div id="modal-publish" className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-indigo-950 to-indigo-900 p-5 text-white flex justify-between items-center border-b border-indigo-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-indigo-950 flex items-center justify-center font-bold text-lg shadow">
                  <i className="fa-solid fa-file-pen"></i>
                </div>
                <div>
                  <h2 className="font-black text-lg leading-tight">
                    Publicar Nuevo Aviso Digital
                  </h2>
                  <p className="text-xs text-indigo-200">
                    {user ? `Anunciante: ${user.nombre || user.telefono}` : "Pizarra comunitaria de Huánuco"}
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-indigo-300 hover:text-white text-lg p-1.5 rounded-lg hover:bg-indigo-800/50 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-grow text-slate-800">
              <form onSubmit={handlePublishSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                    1. Tipo de Publicación
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`border-2 rounded-2xl p-3.5 flex items-center gap-2.5 cursor-pointer transition ${
                        category === "empleo"
                          ? "border-indigo-600 bg-indigo-50/60 shadow-sm"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="opt-category"
                        value="empleo"
                        checked={category === "empleo"}
                        onChange={() => setCategory("empleo")}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-xs font-black text-slate-800">
                        💼 Empleo / Vacante
                      </span>
                    </label>
                    <label
                      className={`border-2 rounded-2xl p-3.5 flex items-center gap-2.5 cursor-pointer transition ${
                        category === "alquiler"
                          ? "border-indigo-600 bg-indigo-50/60 shadow-sm"
                          : "border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="opt-category"
                        value="alquiler"
                        checked={category === "alquiler"}
                        onChange={() => setCategory("alquiler")}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-xs font-black text-slate-800">
                        🏠 Alquiler / Habitación
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                    2. Distrito de Ubicación
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">-- Selecciona el distrito --</option>
                    <option value="Huánuco Centro">Huánuco Centro</option>
                    <option value="Amarilis">Amarilis / Paucarbamba</option>
                    <option value="Pillco Marca">Pillco Marca</option>
                    <option value="Otros">Otros distritos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
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
                        ? "ej. SE NECESITA MESERO O AYUDANTE"
                        : "ej. SE ALQUILA CUARTO DE ESTRENO"
                    }
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold uppercase text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                    4. Descripción y Requisitos
                  </label>
                  <textarea
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    rows={3}
                    maxLength={250}
                    placeholder={
                      category === "empleo"
                        ? "Describe los requisitos, turnos, sueldo aproximado y lugar de trabajo."
                        : "Describe los servicios incluidos (luz, agua, internet), baño y precio."
                    }
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                    5. Celular de Contacto (WhatsApp)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-emerald-600 font-bold text-sm">
                      <i className="fa-brands fa-whatsapp text-base"></i>
                    </span>
                    <input
                      type="tel"
                      value={phone || user?.telefono || ""}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      pattern="[0-9]{9}"
                      placeholder="987654321"
                      className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Los buscadores te contactarán directamente a este número por WhatsApp o llamada.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wide mb-1.5">
                    6. Color del Volante Digital
                  </label>
                  <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                    {(["celeste", "amarillo", "verde", "rosado"] as const).map(
                      (c) => (
                        <label key={c} className="cursor-pointer flex items-center gap-1.5">
                          <input
                            type="radio"
                            name="opt-color"
                            value={c}
                            checked={color === c}
                            onChange={() => setColor(c)}
                            className="sr-only peer"
                          />
                          <div
                            className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all ${
                              color === c
                                ? "border-slate-950 scale-110 shadow-md ring-2 ring-indigo-500"
                                : "border-slate-300 hover:scale-105"
                            } ${
                              c === "celeste"
                                ? "bg-sky-200"
                                : c === "amarillo"
                                ? "bg-amber-200"
                                : c === "verde"
                                ? "bg-emerald-200"
                                : "bg-pink-200"
                            }`}
                          >
                            {color === c && (
                              <i className="fa-solid fa-check text-slate-900 text-xs"></i>
                            )}
                          </div>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-black py-3.5 rounded-2xl text-sm shadow-lg shadow-indigo-600/30 transition transform hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-thumbtack"></i> Publicar en el Muro Digital
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 02: AUTENTICACIÓN TELEFÓNICA Y OTP ───────────── */}
      {activeModal === "otp" && (
        <div id="modal-otp" className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 text-slate-800 border border-slate-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-900 p-6 text-white text-center relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-indigo-300 hover:text-white text-lg p-1 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
              <div className="w-14 h-14 bg-amber-400 text-indigo-950 rounded-2xl flex items-center justify-center text-2xl mx-auto shadow-lg mb-3">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h3 className="text-xl font-black tracking-tight">
                Verificación de Teléfono OTP
              </h3>
              <p className="text-xs text-indigo-200 mt-1">
                Seguridad contra estafas y cuentas fraudulentas
              </p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Notificación SMS Simulado */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-start gap-3 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                  <i className="fa-solid fa-comment-sms"></i>
                </div>
                <div className="text-xs">
                  <span className="font-extrabold text-emerald-900 block">
                    SMS de Verificación Enviado
                  </span>
                  <p className="text-emerald-700 mt-0.5">
                    Código de seguridad enviado al celular: <strong>+51 {otpPhoneInput || pendingOtpPhone}</strong>
                  </p>
                  <span className="inline-block mt-1 bg-emerald-200/70 text-emerald-900 font-mono font-black px-2 py-0.5 rounded text-[11px]">
                    Código de prueba: 728419
                  </span>
                </div>
              </div>

              <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                <div>
                  <label className="block text-center text-xs font-extrabold text-slate-600 uppercase tracking-wider mb-3">
                    Ingresa el código de 6 dígitos
                  </label>
                  
                  {/* Casillas de Código OTP */}
                  <div className="flex justify-center gap-2">
                    {otpCode.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                        className="w-11 h-13 text-center text-2xl font-black font-mono bg-slate-50 border-2 border-indigo-500 text-indigo-950 rounded-xl shadow-inner focus:outline-none ring-2 ring-indigo-400/30"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                  <span>
                    <i className="fa-regular fa-clock mr-1 text-amber-600"></i> Expira en:{" "}
                    <strong className="text-slate-800 font-mono">00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpTimer(60);
                      showToast("Nuevo código SMS reenviado a tu celular.", "info");
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-bold hover:underline cursor-pointer"
                  >
                    Reenviar código
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-black py-3.5 rounded-2xl text-sm shadow-lg shadow-emerald-600/30 transition duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-lock-open"></i> {isSubmitting ? "Validando..." : "Validar Código y Acceder"}
                </button>
              </form>

              <div className="text-center pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => openModal("login")}
                  className="text-xs text-slate-500 hover:text-indigo-600 font-bold cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left mr-1"></i> Usar contraseña o usuario
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 03: PANEL "MIS ANUNCIOS" ─────────────────────── */}
      {activeModal === "my-ads" && (
        <div id="modal-my-ads" className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-slate-800 animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-950 to-slate-900 p-6 text-white flex justify-between items-center border-b border-indigo-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-indigo-950 flex items-center justify-center font-bold text-xl shadow">
                  <i className="fa-solid fa-rectangle-list"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-lg leading-tight">
                      Panel: Mis Anuncios Publicados
                    </h2>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                      {user?.nombre || "Anunciante"}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200">
                    Administra, revisa o retira tus avisos activos en la comunidad sin intermediarios
                  </p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-indigo-300 hover:text-white text-lg p-1.5 rounded-lg hover:bg-indigo-800/50 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Listado de Anuncios del Usuario */}
            <div className="p-6 overflow-y-auto space-y-4 flex-grow bg-slate-50/50">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                  Tus Avisos en Pizarra ({userAds.length})
                </span>
                <button
                  onClick={() => openModal("publish")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="fa-solid fa-plus"></i> Publicar Nuevo
                </button>
              </div>

              {userAds.length > 0 ? (
                userAds.map((ad) => (
                  <div
                    key={ad.id}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-200 transition"
                  >
                    <div className="space-y-1.5 flex-grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                          ● Activo
                        </span>
                        <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                          {ad.categoria}
                        </span>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          📍 {ad.distrito}
                        </span>
                      </div>
                      <h4 className="font-black text-sm text-slate-900 uppercase">
                        {ad.titulo}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        {ad.descripcion}
                      </p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-500 font-medium">
                        <span>
                          <i className="fa-regular fa-calendar-check mr-1 text-indigo-500"></i> Expira en:{" "}
                          <strong className="text-slate-700">14 días</strong>
                        </span>
                        <span>
                          <i className="fa-solid fa-phone mr-1 text-slate-400"></i> {ad.telefono}
                        </span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto flex-shrink-0">
                      <button
                        onClick={() => openModal("delete-confirm", ad.id)}
                        className="w-full sm:w-auto bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 font-bold px-3.5 py-2 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <i className="fa-regular fa-trash-can"></i> Retirar Aviso
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <i className="fa-regular fa-newspaper text-4xl text-slate-300 mb-2"></i>
                  <p className="text-sm font-bold text-slate-700">Aún no tienes avisos activos</p>
                  <p className="text-xs text-slate-400 mt-1">Crea tu primer anuncio para empleo o alquiler.</p>
                  <button
                    onClick={() => openModal("publish")}
                    className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold px-4 py-2 rounded-xl"
                  >
                    Publicar Gratis Ahora
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-clock-rotate-left text-amber-600"></i>
                Los avisos caducan automáticamente a los 15 días.
              </span>
              <button
                onClick={closeModal}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs cursor-pointer"
              >
                Cerrar Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 04: LOGIN CONVENCIONAL ───────────────────────────── */}
      {activeModal === "login" && (
        <div id="modal-login" className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center text-xl mx-auto mb-2 shadow-sm">
                <i className="fa-solid fa-right-to-bracket"></i>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Ingreso de Anunciante
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Accede para publicar y gestionar tus avisos</p>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Número de Celular
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{9}"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder="ej. 964821540"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white font-black py-3 rounded-xl text-sm cursor-pointer hover:bg-indigo-700 transition shadow-md shadow-indigo-600/30"
              >
                {isSubmitting ? "Ingresando..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center space-y-2">
              <button
                onClick={() => openModal("otp")}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
              >
                <i className="fa-solid fa-mobile-screen-button"></i> Ingresar con Código OTP (SMS)
              </button>
              <p className="text-xs text-slate-500">
                ¿No tienes cuenta aún?{" "}
                <button
                  onClick={() => openModal("register")}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 05: REGISTRO ─────────────────────────────────────── */}
      {activeModal === "register" && (
        <div id="modal-register" className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center text-xl mx-auto mb-2 shadow-sm">
                <i className="fa-solid fa-user-plus"></i>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Crear Cuenta Anunciante
              </h3>
              <p className="text-xs text-slate-500">Registro seguro con verificación SMS en Huánuco</p>
            </div>
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={regNombre}
                  onChange={(e) => setRegNombre(e.target.value)}
                  placeholder="ej. Juan Pérez"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Celular (9 dígitos)
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{9}"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="964821540"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  required
                  minLength={4}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 text-white font-black py-3 rounded-xl text-sm cursor-pointer hover:bg-emerald-700 transition shadow-md shadow-emerald-600/30"
              >
                {isSubmitting ? "Registrando..." : "Continuar a Verificación OTP"}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                ¿Ya tienes una cuenta?{" "}
                <button
                  onClick={() => openModal("login")}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 06: ÉXITO DE PUBLICACIÓN (SIN PIN) ─────────────────────────── */}
      {activeModal === "success" && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl shadow-sm">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-1">
              ¡Aviso Publicado con Éxito!
            </h3>
            <p className="text-xs text-slate-600 mb-5">
              Tu anuncio ya está visible para toda la comunidad en la pizarra digital de Huánuco.
            </p>

            <div className="bg-indigo-50/80 rounded-2xl p-4 border border-indigo-100 mb-5 text-left flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                <i className="fa-solid fa-rectangle-list"></i>
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-indigo-950 block">
                  Gestión Directa
                </span>
                <p className="text-indigo-800/90 mt-0.5">
                  Puedes ver y retirar este aviso en cualquier momento desde tu panel <strong>"Mis Anuncios"</strong> en el menú superior.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={closeModal}
                className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs cursor-pointer transition"
              >
                Ver en Pizarra
              </button>
              <button
                onClick={() => openModal("my-ads")}
                className="w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer transition shadow"
              >
                Ir a Mis Anuncios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 07: CONFIRMACIÓN DE RETIRO / ELIMINACIÓN (SIN PIN) ──────────── */}
      {activeModal === "delete-confirm" && (
        <div id="modal-delete-confirm" className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative text-slate-800 border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl shadow-sm">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 className="text-lg font-black text-center text-slate-900 mb-1">
              ¿Retirar Anuncio de la Pizarra?
            </h3>
            <p className="text-xs text-center text-slate-600 mb-5 leading-relaxed">
              Esta publicación dejará de ser visible de inmediato para los vecinos de Huánuco.
            </p>
            <form onSubmit={handleConfirmDelete} className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-1/2 bg-slate-100 text-slate-700 font-bold py-2.5 rounded-xl text-xs cursor-pointer hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer transition shadow flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-trash-can"></i> Sí, Retirar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
