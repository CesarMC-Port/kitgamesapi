"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage2 = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
//donde y como se guardaran los archivos con multer
const storage = multer_1.default.diskStorage({
    destination: path_1.default.join(__dirname, '../files/archivos'),
    filename: (req, file, cb) => {
        let filtro1 = /jpg|png|jpeg/;
        if (filtro1.test(file.mimetype) === true) {
            cb(null, `${(0, uuid_1.v4)()}.jpg`);
        }
    }
});
//funcion de la configuracion basica para el filtrado de datos con multer imagenes
exports.uploadImage2 = (0, multer_1.default)({
    storage,
    limits: { fileSize: 2000000 }
}).fields([{ name: 'fotoPerfil' }]);
