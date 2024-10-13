import morgan from 'morgan';
import cors from 'cors';
import express from 'express';

export default function middlewares(app:any){
    // Configuración de la App
    app.disable('x-powered-by');

    const url = (process.env.IS_DEV === 'true') ? process.env.URL_WEB || 'http://localhost:4321' : '*'

    // Add headers before the routes are defined
    app.use(function (req:any, res:any, next:any) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', url);

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Pass to next layer of middleware
        next();
    });

    // Middlewares
    app.use(morgan('tiny'));

    if(process.env.IS_DEV === 'true'){
        app.use(cors({
            origin: [process.env.URL_WEB_SELECT || 'http://localhost:4321','https://www.google.com/']
        }));
    }else{
        app.use(cors({
            origin: '*'
        }))
    }
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
}
