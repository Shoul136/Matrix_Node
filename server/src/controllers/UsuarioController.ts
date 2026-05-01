import type { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/application/auth/AuthService.js";
import type { UserService } from "../services/application/user/UserService.js";
import type { ServiceResponse } from "../interfaces/service.interface.js";
import type { RegisterUsuarioDTO, ResetPasswordByTokenDTO, ResetPasswordDto } from "../schemas/usuario.schema.js";
import type { AuthLoginDTO } from "../schemas/auth.schema.js";

export class UsuarioController {
    constructor(
        private readonly _authService: AuthService,
        private readonly _userService: UserService
    ) { }

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as AuthLoginDTO
            const result = await this._authService.login(data)
            return res.status(200).json(result)
        } catch (error) {
            next(error);
        }
    }

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const usuarioData: RegisterUsuarioDTO = req.body
            const result = await this._userService.registerUser(usuarioData)
            return res.status(200).json({ msg: "¡Usuario creado exitosamente!", data: result })
        } catch (error) {
            next(error);
        }
    }

    resetPassword = async (req: Request, res: Response<ServiceResponse>, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body as ResetPasswordDto
            const result = await this._userService.resetPassword(id as string, data)
            if (!result.success)
                return res.status(400).json({ success: false, message: result.message, ...(result.code && { code: result.code }) })

            return res.status(200).json({
                success: true, message: result.message
            });
        } catch (error) {
            next(error)
        }
    }

    resetPasswordByToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = req.body as ResetPasswordByTokenDTO;
            const { token } = req.params

            const result = await this._userService.resetPasswordByToken(token as string, data)
            return res.status(200).json({ msg: "¡Password actualizada correctamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    sendPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            if (!email)
                return res.status(400).json({ msg: 'El email es obligatorio' });

            const result = await this._userService.sendPassword(email)
            return res.status(200).json({ msg: '¡Correo electronico enviado correctamente!', data: result })
        } catch (error) {
            next(error)
        }
    }

    updateAdminStatusUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const result = await this._userService.updateAdminStatusUser(id as string)
            return res.status(200).json({ message: "¡Cambio de estatus exitoso!", data: result })
        } catch (error) {
            next(error)
        }
    }

    updateAdminUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const result = await this._userService.updateAdminUser(id as string, req.body)
            return res.status(200).json({ message: '¡Usuario actualizado exitosamente!', data: result })
        } catch (error) {
            next(error)
        }
    }

    updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user_id = (req as any).user.id
            const result = await this._userService.updateUser(user_id, req.body)
            return res.status(200).json({
                message: "¡Usuario actualizado exitosamente!",
                data: result
            });
        } catch (error) {
            next(error)
        }
    }

    getUserById = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
              if (!id) {
                return res.status(400).json({ message: "El parámetro id es requerido" });
            }
            const result = await this._userService.getUserById(id as string)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    getUserByEmail = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.query
            if (!email) {
                return res.status(400).json({ message: "El parámetro email es requerido" });
            }
            const result = await this._userService.getUserByEmail(email as string)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    getPaginationUser = async(req: Request, res: Response, next: NextFunction) => {        
        try {
            const { page = 1, size = 5 } = req.query
            const result = await this._userService.paginationUser(Number(page), Number(size))
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}