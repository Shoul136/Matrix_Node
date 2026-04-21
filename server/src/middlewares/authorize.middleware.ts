import type { Request, Response, NextFunction} from "express"
import type { RolesEnum } from "../models/enums/index.js"

export const authorize = (allowedRoles: RolesEnum[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user

        if(!user || !user.roles) {
            return res.status(403).json({
                message: "Acceso denegado. No se encontraron roles de usuario."
            })
        }

        const hasRole = user.roles.some((role: any) => allowedRoles.includes(role));

        if(!hasRole){
            return res.status(403).json({
                message: "No tienes permisos suficientes para realizar esta acción."
            })
        }

        next();
    }
}