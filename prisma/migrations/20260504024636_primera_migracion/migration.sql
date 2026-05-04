-- CreateTable
CREATE TABLE "Propiedad" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION NOT NULL,
    "moneda" TEXT NOT NULL DEFAULT 'USD',
    "direccion" TEXT NOT NULL,
    "barrio" TEXT NOT NULL,
    "latitud" DOUBLE PRECISION NOT NULL,
    "longitud" DOUBLE PRECISION NOT NULL,
    "metros_cuadrados" DOUBLE PRECISION NOT NULL,
    "ambientes" INTEGER NOT NULL,
    "es_torre" BOOLEAN NOT NULL DEFAULT false,
    "cochera" BOOLEAN NOT NULL DEFAULT false,
    "seguridad_24hs" BOOLEAN NOT NULL DEFAULT false,
    "amenities" TEXT[],
    "fotos" TEXT[],
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Propiedad_pkey" PRIMARY KEY ("id")
);
