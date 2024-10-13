import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

const modelsPath = path.resolve(__dirname);
const basename = path.basename(__filename);
const db: any = {}; // Inicializa el objeto db con el tipo definido

dotenv.config({ path: path.join(__dirname, '../../.env') });

const objectConfgurate: { port?: number } = process.env.DB_LOCATION_PORT ? {
    port: 5433,
} : {};

// Objeto de configuración de Sequelize
const arregloSwift:any = {
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
const sequelize = new Sequelize(
    process.env.DB_NAME || 'kitgame',
    process.env.DB_USER || 'kitgame',
    process.env.DB_PASS || 'kitgame',
    arregloSwift
);

// Cargar modelos
fs.readdirSync(modelsPath)
    .filter((file) => file.endsWith('.js') && file !== basename)
    .forEach((file) => {
        const modelPath = path.join(modelsPath, file);
        const modelName = path.basename(file, '.js');
        const model = require(modelPath).default;

        if (typeof model !== 'function') {
            console.error(`Error: El modelo ${modelName} no es una función.`);
            return;
        }

        db[modelName] = model(sequelize, DataTypes);
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Añadir sequelize y Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;