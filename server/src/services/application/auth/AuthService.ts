import { validateAndTransform } from "../../../mapper/generic.js";
import { AuthRepository } from "../../../repositories/auth/index.js";
import { UsuarioRepository } from "../../../repositories/usuario/index.js";
import { AuthResponseSchema, PermissionResponseSchema, RoleResponseSchema, type AuthLoginDTO, type AuthResponse, type PermissionDTO, type PermissionResponseDTO, type RoleDTO, type RoleResponseDTO } from "../../../schemas/auth.schema.js";
import { UsuarioResponseSchema, type UsuarioResponse } from "../../../schemas/usuario.schema.js";
import type { IAutService } from "../../infrastructure/security/auth/IAutService.js";
import bcrypt from 'bcrypt'

export class AuthService {
    constructor
    (
        private readonly _authService: IAutService
    ) { }

    async login(data: AuthLoginDTO) : Promise<AuthResponse>{
        const user = await UsuarioRepository.commands.login(data.email);
        if (!user) throw new Error("Usuario no encontrado")

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error("La contraseña o el nombre de usuario es incorrecto");
        }        

        const allPermissions: string[] = user.roles?.flatMap((role: any) =>
            role.permisos?.map((p: any) => p.nombre)
        ) || [];

        const token = this._authService.createToken(user, user.roles, allPermissions);
        const session = this._authService.getSessionUsuario(token)

        const rawResponse = {
            usuario: user,
            token, 
            session
        }
        
        return validateAndTransform(AuthResponseSchema, rawResponse);
    }

    async getAllRoles() : Promise<RoleResponseDTO[]>{
        const data = await AuthRepository.queries.getAllRoles()            
        return validateAndTransform(RoleResponseSchema, data)        
    }

    async createRole(roleData: PermissionDTO) : Promise<RoleResponseDTO>{
        const data = await AuthRepository.commands.createRole(roleData.nombre, roleData.descripcion)
        return validateAndTransform(RoleResponseSchema, data)        
    }

    async updateRole(id : number, role : RoleDTO) : Promise<RoleResponseDTO>{
        const data = await AuthRepository.commands.updateRole(id, role)
        return validateAndTransform(RoleResponseSchema, data)
    }

    async deleteRole(id : number){
        const data = await AuthRepository.commands.deleteRole(id)
        if(!data.success)
            return false
        return true
    }

    async getAllPermission() : Promise<PermissionResponseDTO[]>{
        const data = await AuthRepository.queries.getAllPermission()
        return validateAndTransform(PermissionResponseSchema, data)
    }

    async createPermission(roleData: PermissionDTO) : Promise<PermissionResponseDTO>{
        const data = await AuthRepository.commands.createPermission(roleData.nombre, roleData.descripcion)
        return validateAndTransform(PermissionResponseSchema, data)
    }

    async updatePermission(id : number, permission : PermissionDTO) : Promise<PermissionResponseDTO>{
        const data = await AuthRepository.commands.updatePermission(id, permission)
        return validateAndTransform(PermissionResponseSchema, data)
    }

    async deletePermission(id : number){
        const data = await AuthRepository.commands.deletePermission(id)        
        return data.success
    }

    async assignPermissionsToRole(id : number, permissionIds : number[]) : Promise<RoleResponseDTO>{
        const role = await AuthRepository.queries.getRoleById(id);
        if(!role)
            throw new Error('Role no encontrado')

        const permission = await AuthRepository.queries.getPermissionById(permissionIds)
        
        if(permission != null && permission.length !== permissionIds.length)
            throw new Error('Uno o más permisos no fueron encontrados');

        const updatedRole = await AuthRepository.commands.assignPermissions(role.id , permissionIds)
        return validateAndTransform(RoleResponseSchema, updatedRole)
    }

    async assignRolesToUser(id: string, roleIds: number[]) : Promise<UsuarioResponse>{
        const usuario = await UsuarioRepository.queries.getUserById(id);
        if(!usuario)
            throw new Error('Usuario no encontrado al cual asignar un rol')

        const roles = await AuthRepository.queries.getRolesById(roleIds)
        if(roles != null && roles.length !== roleIds.length)
            throw new Error('Uno o más roles no fueron encontrados')
        
        const updatedUser = await AuthRepository.commands.assignRole(usuario.id, roleIds)
        if(!updatedUser)
            throw new Error('Error al asignar los roles')

        return validateAndTransform(UsuarioResponseSchema, updatedUser)
    }
}