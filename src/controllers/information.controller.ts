//importaciones
import { Request, Response, NextFunction } from "express";
import db from '../models'
//inicializacion de base de datos

import cloudinary from 'cloudinary';

//importacion de libreria encargado de horas/fechas
import moment from 'moment'

//importar liberia para la generacion de codigos
import { v4 as uuidv4 } from 'uuid';

//importacion de respuestas
import { OK, UNAUTHORIZED, BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../config/http.request';

//encryptacion de password
import { bcryptPassword } from '../config/bcrypt.config';

//importacion de datos importantes para una gesion
// import { Op, DataTypes, where } from 'sequelize';

const {
    // Sequelize,
    // sequelize,
    Product,
    QRProduct,
    Usuarios,
} = db

cloudinary.config({
    cloud_name: process.env.CLO_NAME,
    api_key: process.env.CLO_KEY,
    api_secret: process.env.CLO_SECRET
})

//---------------------------------------------------------------------------------------------------------------------/
//-------------------------------------------- Funciones usuario ------------------------------------------------------/
//---------------------------------------------------------------------------------------------------------------------/


//******************************************** Funcion para crear usuarios ********************************************/

export async function createUser(req: Request, res: Response) {

    //todos lo datos necesarios para la creacion de una cuenta en geslord

    let { nombre, contrasenia, apellido, role, email, ciudad, pais } = req.body

    try {
        //funcion creadora de nuevos usuarios

        if (process.env.OPEN_TRAFFIC !== 'false' && email === 'sahylinnlagos13@gmail.com') {

            console.log(db)
            const user = await Usuarios.findOne({ where: { Email: email } });
            if (user) {
                return res.status(UNAUTHORIZED).json({
                    message: "El correo ya se encuentra registrado"
                });
            }

            let newUser = await Usuarios.create({
                Nombre_usuario: nombre,
                Password: bcryptPassword(contrasenia),
                Apellido: apellido,
                Role: role,
                Email: email,
                Ciudad: ciudad,
                Pais: pais,
            })

            //confirmacion de creacion de usuario

            if (newUser) {
                return res.status(OK).json({
                    message: 'Usuario creado',
                })
            }

        } else {
            res.status(UNAUTHORIZED).json({
                message: "Registros cerrados."
            });
            return;
        }
    } catch (error) {
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}

//******************************************** Actalizacion de correo verificado al registrase con Google ********************************************/

export async function confirmarGoogle(req:any, res: Response) {
    try {

        //guardando variable en base de datos
        await Usuarios.update({
            Confirmacion_correo: true
        },
            {
                where: {
                    Id_usuario: req?.user?.userId
                }
            })

        //control de datos/error
        res.status(OK).send('actualizado')

    } catch (error) {
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}


//---------------------------------------------------------------------------------------------------------------------/
//-------------------------------------------- Funciones registros QRProduct ---------------------------------------------/
//---------------------------------------------------------------------------------------------------------------------/

export async function addQRProduct(req: Request, res: Response) {
    try {

        interface Objects {
            fecha: string;
            idRelation: string;
            productoAsociado?: string;
            dispositivoAsociado?: string;
            juegoAsociado?: string;
            codeQR: string; 
            status?: string;
            lastUseDetected?: string;
        }

        let objects: Objects[] = []
        let code:string = uuidv4();
        let iterableObject = {...req.body};
        delete iterableObject.image
        for(let i:number = 0; i < req.body?.cantidad; i++){
            objects = [...objects, {
                ...iterableObject,
                fecha:moment.utc().format(),
                idRelation:code,
                codeQR:uuidv4(),
            }]
        }

        let product = await Product.findOne({where: {name: req.body?.productoAsociado}})
        if(!product){
            const result:any = await cloudinary.uploader.upload(req.body?.image)
            await Product.create({
                image: result.secure_url,
                name: req.body?.productoAsociado
            })
        }

        let QRproducts = await QRProduct.bulkCreate(objects);

        if (QRproducts) {
            return res.status(OK).json({
                message: 'Lote de Producto creado con éxito.',
                data: QRproducts
            })
        } else {
            return res.status(BAD_REQUEST).json({
                message: "Error al crear Lote de Producto"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: "Error al crear Lote de Producto."
        })
    }
}

export async function editQRProduct(req: Request, res: Response) {
    try {
        //funcion para actualizar un QRProduct

        const data = await QRProduct.update({
                ...req.body
            },
            {
                where: {
                    id: req.body.id,
                },
                returning: true,
        })

        return res.status(OK).json({
            message: 'Lote de Producto editado con éxito.',
            data: data[1]
        })
    } catch (error) {
        console.log(error)
        res.status(INTERNAL_SERVER_ERROR).json({
            message: "Error al editar Lote de Producto."
        })
    }
}

export async function deleteQRProduct(req: Request, res: Response) {
    try {

        //funcion eliminadora de Lote de Producto 
        const QRProductEncontrado = await QRProduct.findOne({
            where: {
                id: req.body.id,
            }
        });

        if (QRProductEncontrado) {
            QRProductEncontrado.destroy();
            res.status(OK).json({
                message: 'Lote de Producto eliminado con éxito',
            })
        } else {
            res.status(BAD_REQUEST).json({
                message: 'Error al eliminar el Lote de Producto'
            })
        }
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({
            message: "Error al eliminar Lote de Producto."
        })
    }
}

export async function getAllProduct(req: Request, res: Response) {
    try {

        //importacion de todos los servicios de un usuario y gestion
        const Productt = await Product.findAll({ order: ['id'] })

        res.status(OK).send({Product:Productt})

    } catch (error) {
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}

export async function getQRProduct(req: Request, res: Response) {
    try {

        //importacion de todos los servicios de un usuario y gestion
        const QRProductt = await QRProduct.findAll({ order: ['id'] })

        //mandamos los QRProduct
        res.status(OK).send({QRProduct:QRProductt})

    } catch (error) {
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}

export async function getOneQRProduct(req: Request, res: Response) {
    try {

        //importacion de todos los servicios de un usuario y gestion
        const QRProductt = await QRProduct.findAll({ order: ['id'] })

        //mandamos los QRProduct
        res.status(OK).send({QRProduct:QRProductt})

    } catch (error) {
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}

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