"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const email_1 = __importDefault(require("./routes/email"));
const login_1 = __importDefault(require("./routes/login"));
const login_controller_1 = require("./controllers/login.controller");
const http_request_1 = require("./config/http.request");
const information_1 = __importDefault(require("./routes/information"));
const files_1 = __importDefault(require("./routes/files"));
const sessionConfirmation = async (req, res, next) => {
    const AUTH_FORMAT_ERROR = "Format for Authorization: Bearer [token]";
    const AUTH_MISSING_ERROR = "No Authorization was found";
    const AUTH_VALIDATION_ERROR = "Error en validación";
    if (!req.path.includes("private")) {
        return next();
    }
    let tokenToVerify;
    // Verifica el encabezado de autorización
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const [scheme, token] = authHeader.split(" ");
        if (scheme !== "Bearer" || !token) {
            return res.status(http_request_1.UNAUTHORIZED).json({ msg: AUTH_FORMAT_ERROR });
        }
        tokenToVerify = token;
    }
    else if (req.body.token) {
        // Verifica si el token se pasó en el cuerpo de la solicitud
        tokenToVerify = req.body.token;
        delete req.body.token;
    }
    else {
        return res.status(http_request_1.UNAUTHORIZED).json({ msg: AUTH_MISSING_ERROR });
    }
    try {
        const user = await (0, login_controller_1.verify)(tokenToVerify);
        if (!user) {
            return res.status(http_request_1.UNAUTHORIZED).json({ msg: AUTH_VALIDATION_ERROR });
        }
        // Pasa al siguiente middleware si la verificación fue exitosa
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(http_request_1.UNAUTHORIZED).json({ msg: AUTH_VALIDATION_ERROR });
    }
};
// Rutas de la API
function routes(app) {
    // Rutas de la app
    app.use(sessionConfirmation);
    app.use('/email', email_1.default);
    app.use('/login', login_1.default);
    app.use('/information', information_1.default);
    app.use('/files', files_1.default);
}
exports.default = routes;
