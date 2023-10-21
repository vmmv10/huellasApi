-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT,
    "instagram" TEXT NOT NULL,
    "tiktok" TEXT NOT NULL,
    "facebook" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "nombre" TEXT,
    "apellidos" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT,
    "email" TEXT,
    "autor" TEXT,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expedicion" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL,
    "precio" INTEGER NOT NULL,
    "ubicacion1" TEXT NOT NULL,
    "ubicacion2" TEXT[],

    CONSTRAINT "Expedicion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagen" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "uso" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,

    CONSTRAINT "Imagen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImagenTabla" (
    "id" SERIAL NOT NULL,
    "tabla" TEXT NOT NULL,
    "expedicion_id" INTEGER NOT NULL,
    "imagen_id" INTEGER NOT NULL,

    CONSTRAINT "ImagenTabla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Detalle" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,
    "expedicion_id" INTEGER NOT NULL,

    CONSTRAINT "Detalle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenTabla" ADD CONSTRAINT "ImagenTabla_expedicion_id_fkey" FOREIGN KEY ("expedicion_id") REFERENCES "Expedicion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImagenTabla" ADD CONSTRAINT "ImagenTabla_imagen_id_fkey" FOREIGN KEY ("imagen_id") REFERENCES "Imagen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Detalle" ADD CONSTRAINT "Detalle_expedicion_id_fkey" FOREIGN KEY ("expedicion_id") REFERENCES "Expedicion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
