"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
//importe controladores usuario
const information_controller_1 = require("../controllers/information.controller");
//importe QRProduct
const information_controller_2 = require("../controllers/information.controller");
//importe get special
// import { getData } from '../controllers/information.controller';
// urls post de la aplicacion
router.post('/create', information_controller_1.createUser);
router.post('/confirmarGoogle', information_controller_1.confirmarGoogle);
router.post('/private/addQRProduct', information_controller_2.addQRProduct);
router.post('/private/editQRProduct', information_controller_2.editQRProduct);
router.post('/private/deleteQRProduct', information_controller_2.deleteQRProduct);
// urls get de la aplicacion
// router.get('/getData', getData)
router.get('/private/getQRProduct', information_controller_2.getQRProduct);
router.get('/private/getOneQRProduct', information_controller_2.getOneQRProduct);
router.get('/private/getAllProduct', information_controller_2.getAllProduct);
exports.default = router;
