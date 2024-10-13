"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (sequelize, type) => {
    const Game = sequelize.define('Game', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER,
        },
        features: {
            type: type.JSONB(),
            allowNull: true
        },
        image: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: null
        },
        name: {
            type: type.TEXT,
            allowNull: true,
            defaultValue: null
        }
    }, {
        initialAutoIncrement: 1000,
        modelName: "Game",
        tableName: "Game",
        timestamps: false
    });
    return Game;
};
