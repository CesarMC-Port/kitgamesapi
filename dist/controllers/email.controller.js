"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact = void 0;
const email_config_js_1 = require("../config/email.config.js");
//importacion de respuestas
const http_request_js_1 = require("../config/http.request.js");
//******************************************** Envio de formulario contacto ********************************************/
async function contact(req, res) {
    //estructuring de todos los datos
    const { nombre, correo, asunto, mensaje } = req.body;
    try {
        //envio de correo
        await Promise.resolve((() => {
            (0, email_config_js_1.processMail)({
                from: `"Geslord" info@geslord.com`,
                to: correo,
                subject: asunto,
                html: `${mensaje}`
            });
        })());
        //control de datos/error
        res.send('enviado');
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_js_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.contact = contact;
