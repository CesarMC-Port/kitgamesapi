//importaciones
import db from '../models'
import jwt from "jsonwebtoken"
import config from '../config/jwt.config'

//credenciales de google

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(config.client_id)

//importacion de respuestas
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from '../config/http.request';
import { comparePassword } from '../config/bcrypt.config';

//importacion de base de datos
const {Usuarios,Gestiones} = db

//******************************************** confirmacion de token creado al iniciar sesion ********************************************/

export function confirmUsers(req: any, res: any) {

    try {
        //confirmacion token
        jwt.verify(req.body.Authorization, config.jwtSecret, async function (err: any, decodificado: any) {
            if (err === null) {
                //todo correcto
                const bul = await Verificate(JSON.parse(decodificado.payload))
                if (bul === 'algo salio mal') {
                    return res.status(INTERNAL_SERVER_ERROR).json({
                        message: "no funciono, algo va mal"
                    });
                } else {
                    return res.status(OK).json({
                        message: bul.Id_usuario
                    });
                }
            } else {
                //tiempo excedido
                return res.status(UNAUTHORIZED).json({
                    message: "no funciono, tiempo excedido"
                });
            }
        });
    } catch (error) {
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}

//******************************************** confirmar usuarios y clave del ususario ********************************************/

export async function loginUser(req: any, res: any) {

    try {
        //estructuring de datos recibidos
        const { email, password } = req.body;
        //revision de req.body para sabaer si no escribio nada
        if (!email || !password) {
            return res.status(BAD_REQUEST).json({
                message: 'Porfavor envia tu password y email'
            })
        }
        //revision y confirmacion de si el usuario existe en la base de datos
        const user = await Usuarios.findOne({ where: { Email: email } });
        if (!user) {
            return res.status(UNAUTHORIZED).json({
                message: "No existe este usuario en la plataforma"
            });
        }
        //revision y confirmacion de password en la base de datos
        if (comparePassword(password, user.dataValues.Password)) {
            return res.status(OK).json({ token: createToken(user) });
        }
        //todo correcto
        return res.status(UNAUTHORIZED).json({
            message: "Clave incorrecta"
        });

    } catch (error) {
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
};

//******************************************** confirmacion de credenciales de google y generacion de token ********************************************/

export async function loginGoogle(req: any, res: any) {
    const { tokengoogle } = req.body

    try {

        async function verify() {
            client.setCredentials({ access_token: tokengoogle })
            const userinfo = await client.request({
                url: "https://www.googleapis.com/oauth2/v3/userinfo",
            });
            let user = await Usuarios.findOne({ where: { Email: userinfo.data.email } })
            if (user === null) {
                res.status(BAD_REQUEST).send('no existe el usuario, registrate por favor')
            }
            if (user.dataValues.Email !== null) {
                return res.status(OK).json({ token: createToken(user) });
            }
        }
        verify().catch(console.error)

    } catch (error) {
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}

//******************************************** Crear token de acceso ********************************************/

export function createToken(user: any) {
    const email = user.dataValues.Email;
    let payload2 = {
        sub: email,
        iat: Date.now()
    };
    let payload = JSON.stringify(payload2)
    return jwt.sign({ payload }, config.jwtSecret, {
        expiresIn: 10800
    });
}

//******************************************** Verificar el token atravez del email anteriormente conseguido por la verificacion del token ********************************************/

async function Verificate(item: any) {
    let user = await Usuarios.findOne({ where: { Email: item.sub } }).catch(function () {
        return "No existe"
    });
    if (user === "No existe" || user === null) {
        return "algo salio mal"
    } else {
        return user
    }
}

//******************************************** Verificar el token atravez del id anteriormente conseguido por la verificacion del token ********************************************/

async function VerificateGestion(item: any) {
    let user = await Gestiones.findOne({ where: { Id_gestion: item.sub } }).catch(function () {
        return "No existe"
    });
    if (user === "No existe" || user === null) {
        return "algo salio mal"
    } else {
        return user
    }
}

//******************************************** Verificacion del token ********************************************/

export async function verify(token: any) {
    //confirmacion token
    return await jwt.verify(token, config.jwtSecret, async function (err: any, decodificado: any) {
        if (err === null) {
            //todo correcto
            const bul = await Verificate(JSON.parse(decodificado.payload))
            if (bul === 'algo salio mal') {
                return false
            } else {
                return bul
            }
        } else {
            //tiempo excedido
            return false
        }
    });
}

//******************************************** Crear token de gestion ********************************************/

export function createTokenGestion(id: any) {
    const idGestion = id;
    let payload2 = {
        sub: idGestion,
        iat: Date.now()
    };
    let payload = JSON.stringify(payload2)
    return jwt.sign({ payload }, config.jwtSecret, {
        expiresIn: 10800
    });
}

//******************************************** Verificacion del token gestion ********************************************/

export async function verifyGestion(tokenGestion: any) {
    //confirmacion token
    return await jwt.verify(tokenGestion, config.jwtSecret, async function (err: any, decodificado: any) {
        if (err === null) {
            //todo correcto
            const bul = await VerificateGestion(JSON.parse(decodificado.payload))
            if (bul === 'algo salio mal') {
                return false
            } else {
                return bul.Id_gestion
            }
        } else {
            //tiempo excedido
            return false
        }
    });
}