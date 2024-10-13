"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGestion = exports.createTokenGestion = exports.verify = exports.createToken = exports.loginGoogle = exports.loginUser = exports.confirmUsers = void 0;
//importaciones
const models_1 = __importDefault(require("../models"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = __importDefault(require("../config/jwt.config"));
//credenciales de google
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(jwt_config_1.default.client_id);
//importacion de respuestas
const http_request_1 = require("../config/http.request");
const bcrypt_config_1 = require("../config/bcrypt.config");
//importacion de base de datos
const { Usuarios, Gestiones } = models_1.default;
//******************************************** confirmacion de token creado al iniciar sesion ********************************************/
function confirmUsers(req, res) {
    try {
        //confirmacion token
        jsonwebtoken_1.default.verify(req.body.Authorization, jwt_config_1.default.jwtSecret, async function (err, decodificado) {
            if (err === null) {
                //todo correcto
                const bul = await Verificate(JSON.parse(decodificado.payload));
                if (bul === 'algo salio mal') {
                    return res.status(http_request_1.INTERNAL_SERVER_ERROR).json({
                        message: "no funciono, algo va mal"
                    });
                }
                else {
                    return res.status(http_request_1.OK).json({
                        message: bul.Id_usuario
                    });
                }
            }
            else {
                //tiempo excedido
                return res.status(http_request_1.UNAUTHORIZED).json({
                    message: "no funciono, tiempo excedido"
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.confirmUsers = confirmUsers;
//******************************************** confirmar usuarios y clave del ususario ********************************************/
async function loginUser(req, res) {
    try {
        //estructuring de datos recibidos
        const { email, password } = req.body;
        //revision de req.body para sabaer si no escribio nada
        if (!email || !password) {
            return res.status(http_request_1.BAD_REQUEST).json({
                message: 'Porfavor envia tu password y email'
            });
        }
        //revision y confirmacion de si el usuario existe en la base de datos
        const user = await Usuarios.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(http_request_1.UNAUTHORIZED).json({
                message: "No existe este usuario en la plataforma"
            });
        }
        //revision y confirmacion de password en la base de datos
        if ((0, bcrypt_config_1.comparePassword)(password, user.dataValues.Password)) {
            return res.status(http_request_1.OK).json({ token: createToken(user) });
        }
        //todo correcto
        return res.status(http_request_1.UNAUTHORIZED).json({
            message: "Clave incorrecta"
        });
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.loginUser = loginUser;
;
//******************************************** confirmacion de credenciales de google y generacion de token ********************************************/
async function loginGoogle(req, res) {
    const { tokengoogle } = req.body;
    try {
        async function verify() {
            client.setCredentials({ access_token: tokengoogle });
            const userinfo = await client.request({
                url: "https://www.googleapis.com/oauth2/v3/userinfo",
            });
            let user = await Usuarios.findOne({ where: { Email: userinfo.data.email } });
            if (user === null) {
                res.status(http_request_1.BAD_REQUEST).send('no existe el usuario, registrate por favor');
            }
            if (user.dataValues.Email !== null) {
                return res.status(http_request_1.OK).json({ token: createToken(user) });
            }
        }
        verify().catch(console.error);
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.loginGoogle = loginGoogle;
//******************************************** Crear token de acceso ********************************************/
function createToken(user) {
    const email = user.dataValues.Email;
    let payload2 = {
        sub: email,
        iat: Date.now()
    };
    let payload = JSON.stringify(payload2);
    return jsonwebtoken_1.default.sign({ payload }, jwt_config_1.default.jwtSecret, {
        expiresIn: 10800
    });
}
exports.createToken = createToken;
//******************************************** Verificar el token atravez del email anteriormente conseguido por la verificacion del token ********************************************/
async function Verificate(item) {
    let user = await Usuarios.findOne({ where: { Email: item.sub } }).catch(function () {
        return "No existe";
    });
    if (user === "No existe" || user === null) {
        return "algo salio mal";
    }
    else {
        return user;
    }
}
//******************************************** Verificar el token atravez del id anteriormente conseguido por la verificacion del token ********************************************/
async function VerificateGestion(item) {
    let user = await Gestiones.findOne({ where: { Id_gestion: item.sub } }).catch(function () {
        return "No existe";
    });
    if (user === "No existe" || user === null) {
        return "algo salio mal";
    }
    else {
        return user;
    }
}
//******************************************** Verificacion del token ********************************************/
async function verify(token) {
    //confirmacion token
    return await jsonwebtoken_1.default.verify(token, jwt_config_1.default.jwtSecret, async function (err, decodificado) {
        if (err === null) {
            //todo correcto
            const bul = await Verificate(JSON.parse(decodificado.payload));
            if (bul === 'algo salio mal') {
                return false;
            }
            else {
                return bul;
            }
        }
        else {
            //tiempo excedido
            return false;
        }
    });
}
exports.verify = verify;
//******************************************** Crear token de gestion ********************************************/
function createTokenGestion(id) {
    const idGestion = id;
    let payload2 = {
        sub: idGestion,
        iat: Date.now()
    };
    let payload = JSON.stringify(payload2);
    return jsonwebtoken_1.default.sign({ payload }, jwt_config_1.default.jwtSecret, {
        expiresIn: 10800
    });
}
exports.createTokenGestion = createTokenGestion;
//******************************************** Verificacion del token gestion ********************************************/
async function verifyGestion(tokenGestion) {
    //confirmacion token
    return await jsonwebtoken_1.default.verify(tokenGestion, jwt_config_1.default.jwtSecret, async function (err, decodificado) {
        if (err === null) {
            //todo correcto
            const bul = await VerificateGestion(JSON.parse(decodificado.payload));
            if (bul === 'algo salio mal') {
                return false;
            }
            else {
                return bul.Id_gestion;
            }
        }
        else {
            //tiempo excedido
            return false;
        }
    });
}
exports.verifyGestion = verifyGestion;
