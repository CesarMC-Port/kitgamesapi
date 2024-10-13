import { Request, Response, NextFunction } from "express";
import email from './routes/email'
import login from './routes/login'
import { verify } from "./controllers/login.controller";
import { UNAUTHORIZED } from './config/http.request';

import information from './routes/information'
import files from './routes/files'

const sessionConfirmation = async (req: Request, res: Response, next: NextFunction) => {
    const AUTH_FORMAT_ERROR = "Format for Authorization: Bearer [token]";
    const AUTH_MISSING_ERROR = "No Authorization was found";
    const AUTH_VALIDATION_ERROR = "Error en validación";
    if (!req.path.includes("private")) {return next()}
    
    let tokenToVerify: string | undefined;

    // Verifica el encabezado de autorización
    const authHeader = req.header("Authorization");
    if (authHeader) {
        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            return res.status(UNAUTHORIZED).json({ msg: AUTH_FORMAT_ERROR });
        }
        
        tokenToVerify = token;
    } else if (req.body.token) {
        // Verifica si el token se pasó en el cuerpo de la solicitud
        tokenToVerify = req.body.token;
        delete req.body.token;
    } else {
        return res.status(UNAUTHORIZED).json({ msg: AUTH_MISSING_ERROR });
    }

    try {
        const user:any = await verify(tokenToVerify);
        
        if (!user) {
            return res.status(UNAUTHORIZED).json({ msg: AUTH_VALIDATION_ERROR });
        }
        
        // Pasa al siguiente middleware si la verificación fue exitosa
        req.user = user;
        next();
    } catch (error) {
        return res.status(UNAUTHORIZED).json({ msg: AUTH_VALIDATION_ERROR });
    }
};

// Rutas de la API
export default function routes(app:any){

    // Rutas de la app
    app.use(sessionConfirmation)
    app.use('/email', email);
    app.use('/login', login);
    app.use('/information', information);
    app.use('/files', files);

}