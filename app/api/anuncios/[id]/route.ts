import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPin } from "@/lib/auth";

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

// ── DELETE /api/anuncios/[id] ─ Delete ad with PIN verification ─

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

    const body = await request.json();
    const { pin } = body;

    if (!pin) {
      return Response.json(
        { error: "El PIN es obligatorio para retirar un anuncio." },
        { status: 400 }
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

    // ── Verify PIN ──────────────────────────────────────────
    const pinValid = await verifyPin(pin, anuncio.pin);
    if (!pinValid) {
      return Response.json(
        { error: "El PIN de retiro es incorrecto." },
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
