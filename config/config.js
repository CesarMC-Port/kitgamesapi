'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  development: {
    username: process.env.DB_NAME || 'kitgame',
    password: process.env.DB_NAME || 'kitgame',
    database: process.env.DB_NAME || 'kitgame',
    host: process.env.DB_HOST || 'localhost',
    dialect: "postgres"
  },
  test: {
    username: process.env.DB_NAME || 'kitgame',
    password: process.env.DB_NAME || 'kitgame',
    database: process.env.DB_NAME || 'kitgame',
    host: process.env.DB_HOST || 'localhost',
    dialect: "postgres"
  },
  production: {
    username: process.env.DB_NAME || 'kitgame',
    password: process.env.DB_NAME || 'kitgame',
    database: process.env.DB_NAME || 'kitgame',
    host: process.env.DB_HOST || 'localhost',
    dialect: "postgres"
  }
}
