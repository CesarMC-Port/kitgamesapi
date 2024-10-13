"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
//importe controladores
const login_controller_1 = require("../controllers/login.controller");
// tomar todos los productos
router.post("/", login_controller_1.loginUser);
router.post("/ver", login_controller_1.confirmUsers);
router.post("/google", login_controller_1.loginGoogle);
exports.default = router;
