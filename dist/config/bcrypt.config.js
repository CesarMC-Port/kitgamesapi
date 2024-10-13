"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.bcryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcryptPassword = (pw) => {
    const salt = bcrypt_1.default.genSaltSync();
    const hash = bcrypt_1.default.hashSync(pw, salt);
    return hash;
};
exports.bcryptPassword = bcryptPassword;
const comparePassword = (pw, hash) => bcrypt_1.default.compareSync(pw, hash);
exports.comparePassword = comparePassword;
