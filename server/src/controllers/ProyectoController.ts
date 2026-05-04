import type { Request, Response, NextFunction } from "express"
import type { ProjectService } from "../services/application/project/ProjectService.js";

export class ProyectoController {
    constructor(
        private readonly _projectService: ProjectService
    ) { }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._projectService.getAll();
            if (!result) return res.status(400).json({ message: "No se encontro ningun proyecto registrado" })
            return res.status(200).json({ result })
        } catch (error) {
            next(error)
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const proyectoData = req.body
            const result = await this._projectService.create(proyectoData)
            return res.status(200).json({ message: "Proyecto creado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const proyectoData = req.body
            const result = await this._projectService.update(Number(id), proyectoData)
            return res.status(200).json({ message: "Proyecto actualizado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this._projectService.delete(Number(id))
            if (result)
                return res.status(200).json({ message: "Proyecto eliminado exitosamente!" })
        } catch (error) {
            next(error)
        }
    }
}