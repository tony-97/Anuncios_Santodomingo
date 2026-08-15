import { prisma } from "@/lib/prisma";

// ── POST /api/cron/expire-ads ─ Deactivate expired ads ──────────

export async function POST() {
  try {
    const result = await prisma.anuncio.updateMany({
      where: {
        activo: true,
        expiraEn: { lt: new Date() },
      },
      data: { activo: false },
    });

    console.log(`⏰ [CRON] ${result.count} anuncios expirados desactivados.`);

    return Response.json({
      message: `${result.count} anuncios expirados han sido desactivados.`,
      count: result.count,
    });
  } catch (error) {
    console.error("Error en cron expire-ads:", error);
    return Response.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
