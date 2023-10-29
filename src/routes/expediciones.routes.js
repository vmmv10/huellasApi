import { Router } from "express";
import { getExpedicion, getExpediciones, getExpedicionesUser, postExpedicion } from "../controllers/expedicionController.js";
import { isAuthenticated } from "../middleware.js";

const router = Router();

router.get('/expediciones', getExpediciones)
router.get('/expediciones/:id', isAuthenticated, getExpedicion);
router.get('/expediciones/usuario/:user_id', isAuthenticated, getExpedicionesUser);
router.post('/expediciones/usuario/:user_id', isAuthenticated, postExpedicion);

export default router;