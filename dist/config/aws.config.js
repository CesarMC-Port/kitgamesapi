"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = exports.BUCKET_NAME = exports.BUCKET_NAME_FOTOS = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// llaves de aws
const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
// nombre del bucket
//const BUCKET_NAME_PDF:any = process.env.BUCKET_PDF || 'geslord-desarrollo-bucket/pdf';
exports.BUCKET_NAME_FOTOS = process.env.BUCKET_FOTOS;
exports.BUCKET_NAME = process.env.BUCKET;
let ObjectBucket = {
    s3: '2006-03-01',
    accessKeyId: ID,
    secretAccessKey: SECRET,
    signatureVersion: 'v4',
    region: process.env.BUCKET_REGION || 'us-east-2'
};
exports.s3 = new aws_sdk_1.default.S3(ObjectBucket);
