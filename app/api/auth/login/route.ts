import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { telefono, password } = body;

    // ── Validation ──────────────────────────────────────────
    if (!telefono || !password) {
      return Response.json(
        { error: "Teléfono y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    // ── Find user ───────────────────────────────────────────
    const user = await prisma.user.findUnique({
      where: { telefono },
    });

    if (!user) {
      return Response.json(
        { error: "Credenciales incorrectas." },
        { status: 401 }
      );
    }

    // ── Verify password ─────────────────────────────────────
    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return Response.json(
        { error: "Credenciales incorrectas." },
        { status: 401 }
      );
    }

    // ── Check verification ──────────────────────────────────
    if (!user.verificado) {
      return Response.json(
        { error: "Tu cuenta aún no ha sido verificada. Verifica tu OTP primero." },
        { status: 403 }
      );
    }

    // ── Generate JWT ────────────────────────────────────────
    const token = signToken({ userId: user.id, telefono: user.telefono });

    return Response.json({
      message: "¡Sesión iniciada correctamente!",
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        telefono: user.telefono,
        verificado: user.verificado,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
