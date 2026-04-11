import { type Request, type Response, type NextFunction } from "express";
import { ZodError } from "zod";

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(`[Error] ${req.method} ${req.path}:`, err);

    let statusCode = err.status || 500;
    let message = err.message || "Sucedió un error inesperado en el servidor";
    let errors: any[] = [];

    if(err instanceof ZodError){
        statusCode = 400;
        message = "Error de validación";
        errors = err.issues.map(e => ({
            campo: e.path.join('.'),
            mensaje: e.message
        }));
    }

    res.status(statusCode).json({
        status: statusCode,
        message,
        errors: errors.length > 0 ? errors : undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
}