import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { telefono, codigo } = body;

    // ── Validation ──────────────────────────────────────────
    if (!telefono || !codigo) {
      return Response.json(
        { error: "Teléfono y código OTP son obligatorios." },
        { status: 400 }
      );
    }

    // ── Find valid OTP ──────────────────────────────────────
    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        telefono,
        codigo,
        usado: false,
        expiraEn: { gte: new Date() },
      },
      orderBy: { creadoEn: "desc" },
    });

    if (!otpRecord) {
      return Response.json(
        { error: "Código OTP inválido o expirado." },
        { status: 400 }
      );
    }

    // ── Mark OTP as used ────────────────────────────────────
    await prisma.otpCode.update({
      where: { id: otpRecord.id },
      data: { usado: true },
    });

    // ── Mark user as verified ───────────────────────────────
    const user = await prisma.user.update({
      where: { telefono },
      data: { verificado: true },
    });

    // ── Generate JWT ────────────────────────────────────────
    const token = signToken({ userId: user.id, telefono: user.telefono });

    return Response.json({
      message: "Número verificado correctamente. ¡Bienvenido!",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        telefono: user.telefono,
        verificado: user.verificado,
      },
    });
  } catch (error) {
    console.error("Error en verificación OTP:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
