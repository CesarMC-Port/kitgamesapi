"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const modelsPath = path_1.default.resolve(__dirname);
const basename = path_1.default.basename(__filename);
const db = {}; // Inicializa el objeto db con el tipo definido
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
const objectConfgurate = process.env.DB_LOCATION_PORT ? {
    port: 5433,
} : {};
// Objeto de configuración de Sequelize
const arregloSwift = {
    host: process.env.DB_HOST || 'localhost',
    ...objectConfgurate,
    dialect: 'postgres',
    omitNull: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
};
// Configuración de acceso a la base de datos
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'kitgame', process.env.DB_USER || 'kitgame', process.env.DB_PASS || 'kitgame', arregloSwift);
// Cargar modelos
fs_1.default.readdirSync(modelsPath)
    .filter((file) => file.endsWith('.js') && file !== basename)
    .forEach((file) => {
    const modelPath = path_1.default.join(modelsPath, file);
    const modelName = path_1.default.basename(file, '.js');
    const model = require(modelPath).default;
    if (typeof model !== 'function') {
        console.error(`Error: El modelo ${modelName} no es una función.`);
        return;
    }
    db[modelName] = model(sequelize, sequelize_1.DataTypes);
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// Añadir sequelize y Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
