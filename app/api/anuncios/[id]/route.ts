import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest } from "@/lib/auth";

// ── GET /api/anuncios/[id] ─ Get a single ad by ID ─────────────

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const anuncioId = parseInt(id, 10);

    if (isNaN(anuncioId)) {
      return Response.json({ error: "ID inválido." }, { status: 400 });
    }

    const anuncio = await prisma.anuncio.findUnique({
      where: { id: anuncioId },
      include: {
        user: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    if (!anuncio) {
      return Response.json(
        { error: "Anuncio no encontrado." },
        { status: 404 }
      );
    }

    return Response.json({ anuncio });
  } catch (error) {
    console.error("Error obteniendo anuncio:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

// ── DELETE /api/anuncios/[id] ─ Delete ad (authenticated user) ─

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const anuncioId = parseInt(id, 10);

    if (isNaN(anuncioId)) {
      return Response.json({ error: "ID inválido." }, { status: 400 });
    }

    const user = await getUserFromRequest(request);
    if (!user) {
      return Response.json(
        { error: "No autorizado. Inicia sesión para retirar este anuncio." },
        { status: 401 }
      );
    }

    // ── Find ad ─────────────────────────────────────────────
    const anuncio = await prisma.anuncio.findUnique({
      where: { id: anuncioId },
    });

    if (!anuncio) {
      return Response.json(
        { error: "Anuncio no encontrado." },
        { status: 404 }
      );
    }

    // ── Verify Ownership ────────────────────────────────────
    if (anuncio.userId !== user.id) {
      return Response.json(
        { error: "No tienes permiso para retirar un anuncio de otro usuario." },
        { status: 403 }
      );
    }

    // ── Soft-delete (mark as inactive) ──────────────────────
    await prisma.anuncio.update({
      where: { id: anuncioId },
      data: { activo: false },
    });

    return Response.json({
      message: "El anuncio ha sido retirado de la pizarra.",
    });
  } catch (error) {
    console.error("Error eliminando anuncio:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
