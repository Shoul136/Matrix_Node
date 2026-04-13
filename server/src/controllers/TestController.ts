import { type Request, type Response, type NextFunction} from 'express'
import { type IEmailService } from '../services/email/IEmailService.js'
import type { IManageFileService } from '../services/storage/IManageFileServices.js'
import fs from 'fs/promises'
import type { IAutService } from '../services/security/auth/IAutService.js'
import { getPaginationOptions, getPagingData } from '../utils/pagination.js'
import Usuario from '../models/Usuario.model.js'
import { fromUnix } from '../utils/formatDate.js'

export class TestController{
    constructor(
        private readonly _emailservice: IEmailService,
        private readonly _storageService: IManageFileService,
        private readonly _authService: IAutService,        
    ) {}

    testEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body
            await this._emailservice.send(
                email,
                'Prueba desde Controller',
                '<h1>¡Inyección de dependencias funcionado!</h1>'
            )
            res.status(201).json({ msg: 'Email enviado exitosamente desde el controlador'})
        } catch (error) {
            next(error)
        }
    }

    testUpload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.file){
                return res.status(400).json({ msg: 'No se recibió ningún archivo'})
            }
            const result = await this._storageService.uploadImage(
                req.file.path,
                req.file.filename
            )

            await fs.unlink(req.file.path)
            
            res.status(201).json({
                msg: 'Archivo subido a Cloudinary y eliminado del servidor local',
                data: result
            })
        } catch (error) {
            next(error)
        }
    }

    testAuth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            
            const usuario = await Usuario.findOne({
                where: { email },
                include: ['roles']
            })

            if(!usuario)
                return res.status(404).json({ msg: 'Usuario no encontrado en la base de datos'});

            const token = this._authService.createToken(usuario, usuario.roles)
            const session = this._authService.getSessionUsuario(token)

            res.status(200).json({
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    roles: usuario.roles?.map(r => r.nombre)                    
                },
                token,
                decoded: {
                    ...session,
                    iat_readable: fromUnix(session.iat),
                    exp_readable: fromUnix(session.exp)
                }
            })
        } catch (error) {
            next(error)
        }
    }

    testPagination = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { page = 1, size = 5 } = req.query
            const { limit, offset } = getPaginationOptions(Number(page), Number(size))

            const data = await Usuario.findAndCountAll({
                limit,
                offset,
                attributes: ['id', 'email'],
                order: [['id', 'ASC']]
            })    

            const result = getPagingData(data, Number(page), limit)

            res.status(200).json(result)            
        } catch (error) {
            next(error)
        }
    }
}