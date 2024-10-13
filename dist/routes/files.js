"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
//importe controladores usuario
const files_controller_1 = require("../controllers/files.controller");
//importe controladores caja
const files_controller_2 = require("../controllers/files.controller");
// tomar todos los productos
router.post("/imagenPerfil", files_controller_1.cargarImagenPerfil);
router.get("/exportarData", files_controller_2.exportarData);
router.get("/downloadImportFormat", files_controller_2.downloadImportFormat);
exports.default = router;
