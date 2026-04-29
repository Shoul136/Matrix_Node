import type { Response, NextFunction} from "express"
import type { AuthentificatedRequest } from "../interfaces/jwtPayload.interface.js";

// authorize.middleware.ts
export const authorize = (allowedItems: (string | number)[]) => {
    return (req: AuthentificatedRequest, res: Response, next: NextFunction) => {
        const userPermisos = req.user?.permisos || [];
        const userRoles = req.user?.roles || [];

        const hasRole = allowedItems.some(item => 
            typeof item === 'number' && userRoles.includes(item)
        );

        const hasPermission = allowedItems.some(item => 
            typeof item === 'string' && userPermisos.includes(item)
        );

        if (!hasRole && !hasPermission) {
            return res.status(403).json({ 
                message: "No tienes los privilegios necesarios para esta acción" 
            });
        }

        next();
    }
}