import express from 'express';
import middlewares from './middlewares/middlewares';
import routes from './routes';
import db from './models'
import fs from 'fs-extra'
import http from 'http';
// import moment from "moment";
// import { Op } from "sequelize";

// Database initialization
// const {Conversiones,Usuarios,Alertas,ConversionesTime} = db

// Creamos la app
const app = express();
const servidor = http.createServer(app);

// Middlewares
middlewares(app);

// Rutas de la aplicacion
routes(app);

// Inicializamos la app e implementamos su posbile variable de entorno del puerto
app.set('puerto', process.env.PORT || 3009);

var cron = require('node-cron');

// Initialize currencies exchange list
// */59 * * * * * test command
// cron.schedule('0 6 * * *', async () => {
    
// });

// Check Status of payment of Users
// cron.schedule('35 19 * * *', async () => {
 
// });

servidor.listen(app.get('puerto'), () => {
    // fs.mkdirSync('./dist/files/archivos', { recursive: true });
    // fs.mkdirSync('./dist/files/excel', { recursive: true });
    fs.mkdirSync('./dist/files/pdf', { recursive: true });
    console.log("Escuchando en el puerto: ", + app.get('puerto'));
    db.sequelize.sync()
        .then(() => {
            console.log("Database synced successfully.");
        })
        .catch((error:any) => {
            console.error("Error syncing the database:", error);
        });
})