import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

// ── GET /api/anuncios/mis-anuncios ─ Get current user's ads ─────

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return Response.json(
        { error: "No autorizado. Inicia sesión primero." },
        { status: 401 }
      );
    }

    const anuncios = await prisma.anuncio.findMany({
      where: { userId: user.id },
      orderBy: { creadoEn: "desc" },
    });

    return Response.json({
      anuncios,
      total: anuncios.length,
    });
  } catch (error) {
    console.error("Error obteniendo mis anuncios:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
