"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, type) => {
    const QRProduct = sequelize.define('QRProduct', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER,
        },
        fecha: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: null
        },
        idRelation: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: -1,
        },
        productoAsociado: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: null
        },
        dispositivoAsociado: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        juegoAsociado: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: null
        },
        impreso: {
            type: type.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        // nameAsociado: {
        //     type: type.TEXT,
        //     allowNull: false
        // },
        codeQR: {
            type: type.TEXT,
            allowNull: false,
        },
        lastUseDetected: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: '',
        },
        status: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: null
        },
    }, {
        initialAutoIncrement: 1000,
        modelName: "QRProduct",
        tableName: "QRProduct",
        timestamps: false
    });
    return QRProduct;
};
