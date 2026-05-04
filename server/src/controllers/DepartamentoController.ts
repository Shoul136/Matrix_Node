import type { Request, Response, NextFunction } from "express"
import type { DepartamentService } from "../services/application/departament/DepartamentService.js";

export class DepartamentoController {
    constructor(
        private readonly _departamentService: DepartamentService
    ) { }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._departamentService.getAll();
            if (!result) return res.status(400).json({ message: "No se encontro ningun departamento registrado" })
            return res.status(200).json({ result })
        } catch (error) {
            next(error)
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const departamentoData = req.body
            const result = await this._departamentService.create(departamentoData)
            return res.status(200).json({ message: "departamento creado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const departamentoData = req.body
            const result = await this._departamentService.update(Number(id), departamentoData)
            return res.status(200).json({ message: "departamento actualizado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this._departamentService.delete(Number(id))
            if (result)
                return res.status(200).json({ message: "departamento eliminado exitosamente!" })
        } catch (error) {
            next(error)
        }
    }
}