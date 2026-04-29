import { AuthRepository } from "../../../repositories/auth/index.js";
import { UsuarioRepository } from "../../../repositories/usuario/index.js";
import { AuthResponseSchema, type AuthLoginDTO, type AuthResponse } from "../../../schemas/auth.schema.js";
import type { IAutService } from "../../infrastructure/security/auth/IAutService.js";
import bcrypt from 'bcrypt'

export class AuthService {
    constructor
    (
        private readonly _authService: IAutService,
        private readonly _usuarioService: IAutService
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
        
        return AuthResponseSchema.parse(rawResponse)
    }

    async getAllRoles(){
        const data = await AuthRepository.queries.getAllRoles()
        return data
    }

    async createRole(nombre: any, descripcion : any){
        const data = await AuthRepository.commands.createRole(nombre, descripcion)
        return data
    }

    async updateRole(id : number, role : any){
        const data = await AuthRepository.commands.updateRole(id, role)
        return data
    }

    async deleteRole(id : any){
        const data = await AuthRepository.commands.deletionRole(id)
        return true
    }

    async getAllPermission(){
        const data = await AuthRepository.queries.getAllPermission()
        return data
    }

    async createPermission(nombre: string, descripcion: string){
        const data = await AuthRepository.commands.createPermission(nombre, descripcion)
        return data
    }

    async assignPermissionsToRole(roleId : number, permissionIds : number[]){
        const role = await AuthRepository.queries.getRoleById(roleId);
        if(!role)
            throw new Error('Role no encontrado')

        await AuthRepository.commands.assignPermissions(role, permissionIds)
        return role;
    }

    async assignRolesToUser(id: string, roleIds: number[]){
        const usuario = await UsuarioRepository.queries.getUserById(id);
        if(!usuario)
            throw new Error('Usuario no encontrado al cual asignar un rol')

        await AuthRepository.commands.assignRole(usuario, roleIds)
        return usuario
    }
}