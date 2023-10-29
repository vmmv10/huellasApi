import { Router } from "express";
import { subirImagen } from "../controllers/imagenController";
import { isAuthenticated } from "../middleware";

const router = Router();

router.post('/imagenes/id', isAuthenticated, subirImagen);


export default router