import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromRequest, hashPin } from "@/lib/auth";
import { Categoria } from "@prisma/client";

// ── GET /api/anuncios ─ List active, non-expired ads with filters ──

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const categoria = searchParams.get("categoria");
    const distrito = searchParams.get("distrito");
    const q = searchParams.get("q");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    // Build where clause
    const where: Record<string, unknown> = {
      activo: true,
      expiraEn: { gte: new Date() },
    };

    if (categoria && (categoria === "EMPLEO" || categoria === "ALQUILER")) {
      where.categoria = categoria as Categoria;
    }

    if (distrito && distrito !== "todos") {
      where.distrito = distrito;
    }

    if (q) {
      where.OR = [
        { titulo: { contains: q } },
        { descripcion: { contains: q } },
      ];
    }

    const [anuncios, total] = await Promise.all([
      prisma.anuncio.findMany({
        where,
        orderBy: { creadoEn: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              nombre: true,
            },
          },
        },
      }),
      prisma.anuncio.count({ where }),
    ]);

    return Response.json({
      anuncios,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error listando anuncios:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}

// ── POST /api/anuncios ─ Create a new ad (requires auth) ──────────

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return Response.json(
        { error: "No autorizado. Inicia sesión primero." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { categoria, distrito, titulo, descripcion, telefono, color, pin } = body;

    // ── Validation ──────────────────────────────────────────
    if (!categoria || !distrito || !titulo || !descripcion || !telefono || !pin) {
      return Response.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    if (!["EMPLEO", "ALQUILER"].includes(categoria)) {
      return Response.json(
        { error: "Categoría inválida. Usa EMPLEO o ALQUILER." },
        { status: 400 }
      );
    }

    if (!/^\d{9}$/.test(telefono)) {
      return Response.json(
        { error: "El teléfono debe tener exactamente 9 dígitos." },
        { status: 400 }
      );
    }

    if (!/^\d{4}$/.test(pin)) {
      return Response.json(
        { error: "El PIN debe ser de 4 dígitos." },
        { status: 400 }
      );
    }

    // ── Create ad ───────────────────────────────────────────
    const hashedPin = await hashPin(pin);
    const expiraEn = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days

    const anuncio = await prisma.anuncio.create({
      data: {
        categoria: categoria as Categoria,
        distrito: distrito.trim(),
        titulo: titulo.trim().toUpperCase(),
        descripcion: descripcion.trim(),
        telefono: telefono.trim(),
        color: color?.toUpperCase() || "CELESTE",
        pin: hashedPin,
        expiraEn,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            nombre: true,
          },
        },
      },
    });

    return Response.json(
      {
        message: "¡Anuncio publicado con éxito!",
        anuncio,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando anuncio:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
