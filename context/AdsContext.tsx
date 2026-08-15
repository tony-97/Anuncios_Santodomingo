"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Ad {
  id: string;
  categoria: "empleo" | "alquiler";
  distrito: string;
  titulo: string;
  descripcion: string;
  telefono: string;
  pin: string;
  color: "celeste" | "amarillo" | "verde" | "rosado";
  creado_en: string;
}

export const defaultAds: Ad[] = [
  {
    id: "seed-1",
    categoria: "empleo",
    distrito: "Huánuco Centro",
    titulo: "SE NECESITA MOTORIZADO PARA DELIVERY",
    descripcion:
      "De preferencia joven proactivo para reparto a domicilio en pollería céntrica. Horario de 3:00 PM a 11:00 PM. Trato directo, buena comisión. Razón Jr. 2 de Mayo N° 435.",
    telefono: "994385288",
    pin: "1234",
    color: "celeste",
    creado_en: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "seed-2",
    categoria: "alquiler",
    distrito: "Pillco Marca",
    titulo: "SE ALQUILA CUARTOS DE ESTRENO",
    descripcion:
      "Habitaciones cómodas con baño propio. Acabados modernos, excelente iluminación. Ubicado en Pasaje Los Girasoles, Pillco Marca. Referencia: Altura de Calle Los Ficus.",
    telefono: "948912502",
    pin: "1234",
    color: "verde",
    creado_en: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "seed-3",
    categoria: "alquiler",
    distrito: "Amarilis",
    titulo: "ALQUILO DEPARTAMENTO AMPLIO",
    descripcion:
      "Ubicado estratégicamente en el primer piso con fácil acceso. Jr. José Olaya N° 220 frente a EsSalud - Paucarbamba. Cuenta con sala, cocina, 2 habitaciones grandes.",
    telefono: "949900727",
    pin: "1234",
    color: "amarillo",
    creado_en: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "seed-4",
    categoria: "empleo",
    distrito: "Otros",
    titulo: "SE NECESITA UNA SEÑORITA",
    descripcion:
      "Para trabajar como ayudante en recreo campestre a las afueras de la ciudad. Con o sin experiencia en atención al cliente. Se brinda almuerzo.",
    telefono: "978953505",
    pin: "1234",
    color: "rosado",
    creado_en: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "seed-5",
    categoria: "empleo",
    distrito: "Huánuco Centro",
    titulo: "NECESITO REMALLADORES URGENTE",
    descripcion:
      "Con experiencia demostrable en costura y ensamble de prendas. Trabajo inmediato a destajo en taller de confección. Razón Jr. Pachacutec N° 204.",
    telefono: "927236450",
    pin: "1234",
    color: "celeste",
    creado_en: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: "seed-6",
    categoria: "alquiler",
    distrito: "Pillco Marca",
    titulo: "SE VENDE CASA CON TERRENO",
    descripcion:
      "Ocasión especial por viaje, terreno total de 252 mt2 listo para construir o habitar. Todos los documentos en regla. Contacto directo.",
    telefono: "964248432",
    pin: "1234",
    color: "amarillo",
    creado_en: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
];

type ModalType = "publish" | "login" | "register" | "delete" | "success" | null;

interface ToastState {
  message: string;
  type: "info" | "success" | "error";
  visible: boolean;
}

interface AdsContextType {
  anuncios: Ad[];
  activeModal: ModalType;
  deleteAdTargetId: string | null;
  displaySavedPin: string;
  toast: ToastState;
  openModal: (modal: ModalType, targetId?: string) => void;
  closeModal: () => void;
  showToast: (message: string, type?: "info" | "success" | "error") => void;
  addAd: (newAd: Omit<Ad, "id" | "creado_en">) => void;
  deleteAdWithPin: (adId: string, pin: string) => boolean;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

export function AdsProvider({ children }: { children: React.ReactNode }) {
  const [anuncios, setAnuncios] = useState<Ad[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [deleteAdTargetId, setDeleteAdTargetId] = useState<string | null>(null);
  const [displaySavedPin, setDisplaySavedPin] = useState<string>("----");
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "info",
    visible: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem("tablerovecino_ads");
    if (stored) {
      try {
        setAnuncios(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored ads", e);
        setAnuncios(defaultAds);
      }
    } else {
      setAnuncios(defaultAds);
      localStorage.setItem("tablerovecino_ads", JSON.stringify(defaultAds));
    }
  }, []);

  const openModal = (modal: ModalType, targetId?: string) => {
    if (targetId) {
      setDeleteAdTargetId(targetId);
    }
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal(null);
    setDeleteAdTargetId(null);
  };

  const showToast = (
    message: string,
    type: "info" | "success" | "error" = "info"
  ) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  const addAd = (adData: Omit<Ad, "id" | "creado_en">) => {
    const newAd: Ad = {
      ...adData,
      id: "ad-" + Date.now(),
      creado_en: new Date().toISOString(),
    };

    const updated = [newAd, ...anuncios];
    setAnuncios(updated);
    localStorage.setItem("tablerovecino_ads", JSON.stringify(updated));

    setDisplaySavedPin(adData.pin);
    setActiveModal("success");
    showToast("¡Anuncio colgado con éxito!", "success");
  };

  const deleteAdWithPin = (adId: string, pin: string): boolean => {
    const adIndex = anuncios.findIndex((a) => a.id === adId);
    if (adIndex === -1) {
      showToast("Anuncio no encontrado.", "error");
      closeModal();
      return false;
    }

    if (anuncios[adIndex].pin === pin) {
      const updated = anuncios.filter((a) => a.id !== adId);
      setAnuncios(updated);
      localStorage.setItem("tablerovecino_ads", JSON.stringify(updated));
      closeModal();
      showToast("El anuncio ha sido retirado de la pizarra.", "success");
      return true;
    } else {
      showToast("El PIN de retiro es incorrecto.", "error");
      return false;
    }
  };

  return (
    <AdsContext.Provider
      value={{
        anuncios,
        activeModal,
        deleteAdTargetId,
        displaySavedPin,
        toast,
        openModal,
        closeModal,
        showToast,
        addAd,
        deleteAdWithPin,
      }}
    >
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  const context = useContext(AdsContext);
  if (!context) {
    throw new Error("useAds must be used within an AdsProvider");
  }
  return context;
}
