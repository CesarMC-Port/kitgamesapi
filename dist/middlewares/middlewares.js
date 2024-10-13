"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
function middlewares(app) {
    // Configuración de la App
    app.disable('x-powered-by');
    const url = (process.env.IS_DEV === 'true') ? process.env.URL_WEB || 'http://localhost:4321' : '*';
    // Add headers before the routes are defined
    app.use(function (req, res, next) {
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
    app.use((0, morgan_1.default)('tiny'));
    if (process.env.IS_DEV === 'true') {
        app.use((0, cors_1.default)({
            origin: [process.env.URL_WEB_SELECT || 'http://localhost:4321', 'https://www.google.com/']
        }));
    }
    else {
        app.use((0, cors_1.default)({
            origin: '*'
        }));
    }
    app.use(express_1.default.json({ limit: '50mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
}
exports.default = middlewares;
