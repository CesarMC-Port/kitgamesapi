//importaciones
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(__dirname, '../../.env')}); 

let dataDev:object = (process.env.EMAIL_DEV) ? {
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
} : {}

//objeto de configuracion de servicio de correos
let transporter: object = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.USER_MAIL,
        pass: process.env.PASS_MAIL 
    },
    ...dataDev,
};

//creacion de tranporter2
let transporter2 = nodemailer.createTransport(transporter);

//funcion que envia los correos
export function processMail(mailOptions: any) {
    return transporter2.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log('hubo un error' + error.message);
        } else {
            console.log('Mensaje enviado');
        }
    });
}