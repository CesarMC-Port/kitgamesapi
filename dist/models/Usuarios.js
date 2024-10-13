"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, type) => {
    const Usuarios = sequelize.define('Usuarios', {
        Id_usuario: {
            type: type.INTEGER(),
            autoIncrement: true,
            primaryKey: true
        },
        Nombre_usuario: {
            type: type.STRING(30),
            allowNull: false,
        },
        Apellido: {
            type: type.STRING(30),
            allowNull: false
        },
        Email: {
            type: type.TEXT,
            allowNull: false,
            unique: true
        },
        Role: {
            type: type.STRING(30),
            allowNull: false
        },
        Pais: {
            type: type.STRING(30),
            allowNull: false
        },
        Ciudad: {
            type: type.STRING(30),
            allowNull: false,
        },
        Password: {
            type: type.TEXT,
            allowNull: false
        },
    }, {
        initialAutoIncrement: 1000
    });
    return Usuarios;
};
