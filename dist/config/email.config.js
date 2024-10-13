"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMail = void 0;
//importaciones
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
let dataDev = (process.env.EMAIL_DEV) ? {
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
} : {};
//objeto de configuracion de servicio de correos
let transporter = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL
    },
    ...dataDev,
};
//creacion de tranporter2
let transporter2 = nodemailer_1.default.createTransport(transporter);
//funcion que envia los correos
function processMail(mailOptions) {
    return transporter2.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('hubo un error' + error.message);
        }
        else {
            console.log('Mensaje enviado');
        }
    });
}
exports.processMail = processMail;
