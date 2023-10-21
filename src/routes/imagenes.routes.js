import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: env('cloud_name'),
    api_key: env('api_key'),
    api_secret: env('api_secret')
});


const prisma = new PrismaClient()

const router = Router();

router.post('/imagenes', async (req, res) => {
    const data = await request.formData();
    const image = data.get('file');
    const uso = data.get('uso');
    const tabla = data.get('tabla');
    const expedicionId = data.get('tabla_id');

    if (!image) {
        return res.json("No se ha subido ninguna imagen", { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes)

    const response = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result)
        })
            .end(buffer)
    });
    const reImg = await prisma.imagen.create(
        {
            data: {
                url: response.secure_url,
                nombre: image.name,
                uso: uso,
                public_id: response.public_id,
                imagen_tabla: {
                    create: [
                        {
                            tabla: tabla,
                            expedicion_id: parseInt(expedicionId),
                        }
                    ]
                }
            },

        }
    )
})