import {processMail} from '../config/email.config.js';

//importacion de respuestas
import { INTERNAL_SERVER_ERROR } from '../config/http.request.js';

//******************************************** Envio de formulario contacto ********************************************/

export async function contact(req:any , res:any){
    //estructuring de todos los datos
    const { nombre, correo, asunto, mensaje } = req.body

    try{

        //envio de correo
        await Promise.resolve((() => {
            processMail({
                from: `"Geslord" info@geslord.com`,
                to: correo,
                subject: asunto,
                html: `${mensaje}`
            })
        })());

        //control de datos/error
        res.send('enviado')

    }catch(error){
        console.log(error)
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ msg: "Internal server error" });
    }
}
