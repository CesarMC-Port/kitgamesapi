"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    jwtSecret: process.env.JWT_SECRET,
    client_id: process.env.CLIENT_ID,
    url: process.env.URL_WEB
};
exports.default = config;
