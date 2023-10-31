import { Router } from "express";
import { authToken, login, register } from '../controllers/userController.js'

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.post('/auth', authToken);


export default router