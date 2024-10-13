import express from 'express';
var router = express.Router();

//importe controladores usuario

import { cargarImagenPerfil } from '../controllers/files.controller';

//importe controladores caja

import {  exportarData, downloadImportFormat } from '../controllers/files.controller';

// tomar todos los productos

router.post("/imagenPerfil", cargarImagenPerfil)
router.get("/exportarData", exportarData)
router.get("/downloadImportFormat", downloadImportFormat)

export default router;