import express from 'express';
var router = express.Router();

//importe controladores
import {  loginUser , confirmUsers, loginGoogle } from '../controllers/login.controller';

// tomar todos los productos
router.post("/", loginUser);
router.post("/ver", confirmUsers)
router.post("/google", loginGoogle)


export default router;