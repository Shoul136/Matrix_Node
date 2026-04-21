import type { Request, Response, NextFunction } from 'express'
import { JwtAuthService } from '../services/infrastructure/security/auth/JwtAuthService.js'
import { config } from '../config/settings/index.js'

const authService = new JwtAuthService(config.auth.secret, config.auth.expires)

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer '))
        return res.status(401).json({ message: "No autorizado. Token faltante"})
    
    const token = authHeader.split(' ')[1];
    const decoded = authService.getSessionUsuario(token!);

    if(!decoded)
        return res.status(401).json({ message: "Token inválido o expirado", code: "AUTH_INVALID" });

    (req as any).user = decoded;
    next();
}