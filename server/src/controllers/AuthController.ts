import type { Request, Response, NextFunction } from "express"
import type { AuthService } from "../services/application/auth/AuthService.js"

export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._authService.getAllRoles();
            if (!result) return res.status(400).json({ message: "No se encontro ningun rol registrado" })
            return res.status(200).json({ result })
        } catch (error) {
            next(error)
        }
    }

    createRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {nombre, descripcion} = req.body;
            const result = await this._authService.createRole(nombre, descripcion)
            return res.status(200).json({ message: "¡Rol creado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    updateRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const roleData = req.body
            const result = await this._authService.updateRole(Number(id), roleData)
            return res.status(200).json({ message: "¡Rol actualizado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    deleteRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;            
            const result = await this._authService.deleteRole(Number(id))                        
            if(result)
                return res.status(200).json({ message: "¡Rol eliminado exitosamente!"})
        } catch (error) {
            next(error)
        }
    }

    getPermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._authService.getAllPermission();
            if (!result) return res.status(400).json({ message: "No se encontro ningun permiso registrado" })
            return res.status(200).json({ result })
        } catch (error) {
            next(error)
        }
    }

    createPermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {nombre, descripcion} = req.body;
            const result = await this._authService.createPermission(nombre, descripcion)
            return res.status(200).json({ message: "¡Permiso creado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    assignPermissionsToRole = async (req: Request, res: Response, next: NextFunction) => {        
        try {
            const { roleId, permissionIds } = req.body
            const result = await this._authService.assignPermissionsToRole(roleId as number, permissionIds);
            return res.json({ message: "Permisos actualizados correctamente", result});
        } catch (error) {
            next(error)
        }
    }

    assignRolesToUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { roleIds } = req.body
            const result = await this._authService.assignRolesToUser(id as string, roleIds)
            return res.json({ message: "Roles asignados correctamente", result});
        } catch (error) {
            next(error)
        }
    }
}