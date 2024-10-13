"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneQRProduct = exports.getQRProduct = exports.getAllProduct = exports.deleteQRProduct = exports.editQRProduct = exports.addQRProduct = exports.confirmarGoogle = exports.createUser = void 0;
const models_1 = __importDefault(require("../models"));
//inicializacion de base de datos
const cloudinary_1 = __importDefault(require("cloudinary"));
//importacion de libreria encargado de horas/fechas
const moment_1 = __importDefault(require("moment"));
//importar liberia para la generacion de codigos
const uuid_1 = require("uuid");
//importacion de respuestas
const http_request_1 = require("../config/http.request");
//encryptacion de password
const bcrypt_config_1 = require("../config/bcrypt.config");
//importacion de datos importantes para una gesion
// import { Op, DataTypes, where } from 'sequelize';
const { 
// Sequelize,
// sequelize,
Product, QRProduct, Usuarios, } = models_1.default;
cloudinary_1.default.config({
    cloud_name: process.env.CLO_NAME,
    api_key: process.env.CLO_KEY,
    api_secret: process.env.CLO_SECRET
});
//---------------------------------------------------------------------------------------------------------------------/
//-------------------------------------------- Funciones usuario ------------------------------------------------------/
//---------------------------------------------------------------------------------------------------------------------/
//******************************************** Funcion para crear usuarios ********************************************/
async function createUser(req, res) {
    //todos lo datos necesarios para la creacion de una cuenta en geslord
    let { nombre, contrasenia, apellido, role, email, ciudad, pais } = req.body;
    try {
        //funcion creadora de nuevos usuarios
        if (process.env.OPEN_TRAFFIC !== 'false' && email === 'sahylinnlagos13@gmail.com') {
            console.log(models_1.default);
            const user = await Usuarios.findOne({ where: { Email: email } });
            if (user) {
                return res.status(http_request_1.UNAUTHORIZED).json({
                    message: "El correo ya se encuentra registrado"
                });
            }
            let newUser = await Usuarios.create({
                Nombre_usuario: nombre,
                Password: (0, bcrypt_config_1.bcryptPassword)(contrasenia),
                Apellido: apellido,
                Role: role,
                Email: email,
                Ciudad: ciudad,
                Pais: pais,
            });
            //confirmacion de creacion de usuario
            if (newUser) {
                return res.status(http_request_1.OK).json({
                    message: 'Usuario creado',
                });
            }
        }
        else {
            res.status(http_request_1.UNAUTHORIZED).json({
                message: "Registros cerrados."
            });
            return;
        }
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.createUser = createUser;
//******************************************** Actalizacion de correo verificado al registrase con Google ********************************************/
async function confirmarGoogle(req, res) {
    var _a;
    try {
        //guardando variable en base de datos
        await Usuarios.update({
            Confirmacion_correo: true
        }, {
            where: {
                Id_usuario: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId
            }
        });
        //control de datos/error
        res.status(http_request_1.OK).send('actualizado');
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.confirmarGoogle = confirmarGoogle;
//---------------------------------------------------------------------------------------------------------------------/
//-------------------------------------------- Funciones registros QRProduct ---------------------------------------------/
//---------------------------------------------------------------------------------------------------------------------/
async function addQRProduct(req, res) {
    var _a, _b, _c, _d;
    try {
        let objects = [];
        let code = (0, uuid_1.v4)();
        let iterableObject = { ...req.body };
        delete iterableObject.image;
        for (let i = 0; i < ((_a = req.body) === null || _a === void 0 ? void 0 : _a.cantidad); i++) {
            objects = [...objects, {
                    ...iterableObject,
                    fecha: moment_1.default.utc().format(),
                    idRelation: code,
                    codeQR: (0, uuid_1.v4)(),
                }];
        }
        let product = await Product.findOne({ where: { name: (_b = req.body) === null || _b === void 0 ? void 0 : _b.productoAsociado } });
        if (!product) {
            const result = await cloudinary_1.default.uploader.upload((_c = req.body) === null || _c === void 0 ? void 0 : _c.image);
            await Product.create({
                image: result.secure_url,
                name: (_d = req.body) === null || _d === void 0 ? void 0 : _d.productoAsociado
            });
        }
        let QRproducts = await QRProduct.bulkCreate(objects);
        if (QRproducts) {
            return res.status(http_request_1.OK).json({
                message: 'Lote de Producto creado con éxito.',
                data: QRproducts
            });
        }
        else {
            return res.status(http_request_1.BAD_REQUEST).json({
                message: "Error al crear Lote de Producto"
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(http_request_1.INTERNAL_SERVER_ERROR).json({
            message: "Error al crear Lote de Producto."
        });
    }
}
exports.addQRProduct = addQRProduct;
async function editQRProduct(req, res) {
    try {
        //funcion para actualizar un QRProduct
        const data = await QRProduct.update({
            ...req.body
        }, {
            where: {
                id: req.body.id,
            },
            returning: true,
        });
        return res.status(http_request_1.OK).json({
            message: 'Lote de Producto editado con éxito.',
            data: data[1]
        });
    }
    catch (error) {
        console.log(error);
        res.status(http_request_1.INTERNAL_SERVER_ERROR).json({
            message: "Error al editar Lote de Producto."
        });
    }
}
exports.editQRProduct = editQRProduct;
async function deleteQRProduct(req, res) {
    try {
        //funcion eliminadora de Lote de Producto 
        const QRProductEncontrado = await QRProduct.findOne({
            where: {
                id: req.body.id,
            }
        });
        if (QRProductEncontrado) {
            QRProductEncontrado.destroy();
            res.status(http_request_1.OK).json({
                message: 'Lote de Producto eliminado con éxito',
            });
        }
        else {
            res.status(http_request_1.BAD_REQUEST).json({
                message: 'Error al eliminar el Lote de Producto'
            });
        }
    }
    catch (error) {
        res.status(http_request_1.INTERNAL_SERVER_ERROR).json({
            message: "Error al eliminar Lote de Producto."
        });
    }
}
exports.deleteQRProduct = deleteQRProduct;
async function getAllProduct(req, res) {
    try {
        //importacion de todos los servicios de un usuario y gestion
        const Productt = await Product.findAll({ order: ['id'] });
        res.status(http_request_1.OK).send({ Product: Productt });
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.getAllProduct = getAllProduct;
async function getQRProduct(req, res) {
    try {
        //importacion de todos los servicios de un usuario y gestion
        const QRProductt = await QRProduct.findAll({ order: ['id'] });
        //mandamos los QRProduct
        res.status(http_request_1.OK).send({ QRProduct: QRProductt });
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.getQRProduct = getQRProduct;
async function getOneQRProduct(req, res) {
    try {
        //importacion de todos los servicios de un usuario y gestion
        const QRProductt = await QRProduct.findAll({ order: ['id'] });
        //mandamos los QRProduct
        res.status(http_request_1.OK).send({ QRProduct: QRProductt });
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_request_1.INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
exports.getOneQRProduct = getOneQRProduct;
//******************************************** Get by id and all modals ********************************************/
// export async function getData(req: Request, res: Response) {
//     try {
//         let { token, tokenGestion, data: data2 } = req.query
//         const userId: any = await verify(token)
//         if (userId === false) {
//             res.status(UNAUTHORIZED).json({
//                 message: "Error en validación"
//             });
//             return;
//         }
//         const mapOperator = (operator:any) => {
//             switch (operator) {
//                 case 'like':
//                     return Op.like;
//                 case 'iLike':
//                     return Op.iLike;
//                 case 'or':
//                     return Op.or;
//                 case 'and':
//                     return Op.and;
//                 default:
//                     console.log("/////////operador no soportado")
//             }
//         }
//         //funcion get ventas
//         let allData:any = {}
//         let data = JSON.parse(data2)
//         await Promise.all(Object.keys(data)?.map(async e => {
//             if(typeof data[e] === 'object'){
//                 if(data[e]?.operator){
//                     let firstmapop:any = mapOperator(data[e]?.operator)
//                     let whereClause:any = {};
//                     let conditions:any = [];
//                     data[e].value.forEach((condition:any) => {
//                         Object.keys(condition).forEach(es => {
//                             if(condition[es]?.operator){
//                                 const typeCo = Model[e]?.rawAttributes?.[es]?.type;
//                                 let mapop:any = mapOperator(condition[es]?.operator)
//                                 if(typeCo instanceof DataTypes.INTEGER && condition[es]?.operator === 'iLike'){
//                                     conditions = [...conditions, sequelize.literal(`CAST("${es}" AS TEXT) ILIKE \'%${condition[es].value}%\'`)]
//                                 }else{
//                                     conditions = [...conditions, {[es]: {[mapop]:condition[es].value}}]
//                                 }
//                             }else{
//                                 conditions = [...conditions, {[es]: condition[es]}]
//                             }
//                         })
//                     });
//                     whereClause[firstmapop] = conditions;  
//                     let include = data[e]?.include ? {
//                         include: [
//                             ...data[e]?.include.map((f:any) => {
//                                 return {
//                                     ...f,
//                                     model: Model[f?.model]
//                                 }
//                             })
//                         ]
//                     } : {}
//                     let response = await Model[e].findAll({where:{Id_gestion: gestionId,...whereClause},...include})
//                     allData = {...allData, [e]: response}
//                 }else{
//                     if(typeof Object.values(data[e])[0] === 'string' || typeof Object.values(data[e])[0] === 'number'){
//                         let keySelect:any = Object.values(data[e])[0]
//                         let response = await Model[e].findOne({
//                             where:{ Id_gestion: gestionId, [Object.keys(data[e])[0]]: keySelect}
//                         })
//                         allData = { ...allData, [e]: { ...allData[e], [keySelect]: response }}
//                         return
//                     }else{
//                         let newObject = {}
//                         let number:any = Object.values(data[e])[0]
//                         let dataItered:any = (number || []).filter((n:any, index:any) => number.indexOf(n) === index);
//                         await Promise.all(dataItered?.map(async (a:any) => {
//                             let response = await Model[e].findOne({
//                                 where:{ Id_gestion: gestionId, [Object.keys(data[e])[0]]: a}
//                             })
//                             newObject = {[a]: response}
//                         }))
//                         allData = { ...allData, [e]: {
//                             ...allData[e],
//                             [Object.keys(data[e])[0]]: newObject
//                         }}
//                         return
//                     } 
//                 }
//             }else{
//                 return null 
//             }          
//         }))
//         //confirmacion get venta
//         if (allData) {
//             return res.status(OK).send({allData})
//         } else {
//             return res.status(BAD_REQUEST).json({
//                 message: "Error al consultar ventas."
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         return res.status(INTERNAL_SERVER_ERROR).json({
//             message: "Error al consultar ventas."
//         })
//     }
// }
