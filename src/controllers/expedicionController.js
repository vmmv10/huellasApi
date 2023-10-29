import { prisma } from "../libs/prisma.js"

export async function getExpediciones(req, res) {
  const data = await prisma.expedicion.findMany({})
  console.log(data)
  res.json(data)
}

export async function getExpedicionesUser(req, res) {
  const data = await prisma.expedicion.findMany({
    where: {
      usuario_id: Number(req.params.user_id)
    },
    include: {
      imagen_tabla: {
        where: {
          imagen: {
            uso: 'principal'
          }
        },
        include: {
          imagen: true,
        }
      }
    },
  })
  console.log(data)
  res.json(data)
}

export async function getExpedicion(req, res) {
  const data = await prisma.expedicion.findFirst({
    where: {
      id: Number(req.params.id)
    },
    include: {
      imagen_tabla: {
        select: {
          imagen: {
            select: {
              id: true,
              url: true, // Puedes seleccionar los campos de imagen que necesites
              nombre: true,
              uso: true,
              public_id: true
            }
          }
        }
      },
      detalles: true,
    }
  })
  const exp = {
    id: data.id,
    userId: data.userId,
    titulo: data.titulo,
    descripcion: data.descripcion,
    fecha: data.fecha,
    precio: data.precio,
    ubicacion1: data.ubicacion1,
    ubicacion2: data.ubicacion2,
    detalles: data.detalles,
    imagenes: data.imagen_tabla.map((imagenTabla) => imagenTabla.imagen)
  }
  res.json(exp)
}

export async function postExpedicion(req, res) {
  const expedicion = req.body
  const usuario = await prisma.expedicion.create(
    {
      data: {
        titulo: expedicion.titulo,
        descripcion: expedicion.descripcion,
        fecha: expedicion.fecha,
        precio: expedicion.precio,
        ubicacion1: expedicion.ubicacion1,
        ubicacion2: expedicion.ubicacion2,
        userId: req.params.user_id,
      }
    }
  )
  res.json('Realizado con éxito', 200)
}