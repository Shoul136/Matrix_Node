import type { Request, Response, NextFunction } from "express"
import type { AuthService } from "../services/application/auth/AuthService.js"
import type { AssignPermissionDto, AssignRoleDto, PermissionDTO, RoleDTO } from "../schemas/auth.schema.js";

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
            const roleData = req.body as RoleDTO
            const result = await this._authService.createRole(roleData)
            return res.status(200).json({ message: "¡Rol creado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    updateRole = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const roleData = req.body as RoleDTO
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
            const roleData: PermissionDTO = req.body
            const result = await this._authService.createPermission(roleData)
            return res.status(200).json({ message: "¡Permiso creado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    updatePermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const roleData = req.body as PermissionDTO
            const result = await this._authService.updatePermission(Number(id), roleData)
            return res.status(200).json({ message: "Permiso actualizado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    deletePermission = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;            
            const result = await this._authService.deletePermission(Number(id))                        
            if(result)
                return res.status(200).json({ message: "¡Permiso eliminado exitosamente!"})
        } catch (error) {
            next(error)
        }
    }

    assignPermissionsToRole = async (req: Request, res: Response, next: NextFunction) => {        
        try {
            const { id } = req.params
            const { permissionIds } = req.body as AssignPermissionDto
            const result = await this._authService.assignPermissionsToRole(Number(id), permissionIds);
            return res.json({ message: "Permisos actualizados correctamente", result});
        } catch (error) {
            next(error)
        }
    }

    assignRolesToUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const { roleIds } = req.body as AssignRoleDto
            const result = await this._authService.assignRolesToUser(id as string, roleIds)
            return res.json({ message: "Roles asignados correctamente", result});
        } catch (error) {
            next(error)
        }
    }
}