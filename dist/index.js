"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = __importDefault(require("./middlewares/middlewares"));
const routes_1 = __importDefault(require("./routes"));
const models_1 = __importDefault(require("./models"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const http_1 = __importDefault(require("http"));
// import moment from "moment";
// import { Op } from "sequelize";
// Database initialization
// const {Conversiones,Usuarios,Alertas,ConversionesTime} = db
// Creamos la app
const app = (0, express_1.default)();
const servidor = http_1.default.createServer(app);
// Middlewares
(0, middlewares_1.default)(app);
// Rutas de la aplicacion
(0, routes_1.default)(app);
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
    fs_extra_1.default.mkdirSync('./dist/files/pdf', { recursive: true });
    console.log("Escuchando en el puerto: ", +app.get('puerto'));
    models_1.default.sequelize.sync()
        .then(() => {
        console.log("Database synced successfully.");
    })
        .catch((error) => {
        console.error("Error syncing the database:", error);
    });
});
