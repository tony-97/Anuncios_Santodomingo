import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, generateOtp } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, telefono, password } = body;

    // ── Validation ──────────────────────────────────────────
    if (!nombre || !telefono || !password) {
      return Response.json(
        { error: "Todos los campos son obligatorios (nombre, telefono, password)." },
        { status: 400 }
      );
    }

    if (!/^\d{9}$/.test(telefono)) {
      return Response.json(
        { error: "El número de teléfono debe tener exactamente 9 dígitos." },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return Response.json(
        { error: "La contraseña debe tener al menos 4 caracteres." },
        { status: 400 }
      );
    }

    // ── Check existing user ─────────────────────────────────
    const existingUser = await prisma.user.findUnique({
      where: { telefono },
    });

    if (existingUser) {
      return Response.json(
        { error: "Este número de teléfono ya está registrado." },
        { status: 409 }
      );
    }

    // ── Create user ─────────────────────────────────────────
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        nombre: nombre.trim(),
        telefono,
        password: hashedPassword,
      },
    });

    // ── Generate simulated OTP ──────────────────────────────
    const otpCode = generateOtp();
    await prisma.otpCode.create({
      data: {
        telefono,
        codigo: otpCode,
        expiraEn: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
      },
    });

    // Simulation: log to console and return in response
    console.log(`\n📱 [OTP SIMULADO] Teléfono: ${telefono} → Código: ${otpCode}\n`);

    return Response.json(
      {
        message: "Usuario registrado. Verifica tu número con el código OTP.",
        userId: user.id,
        otpSimulado: otpCode, // Only for simulation — remove in production
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error en registro:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
