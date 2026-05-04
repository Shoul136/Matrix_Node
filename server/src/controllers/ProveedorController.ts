import type { Request, Response, NextFunction } from "express"
import type { SupplierService } from "../services/application/supplier/SupplierService.js";

export class ProveedorController {
    constructor(
        private readonly _supplierService : SupplierService
    ) { }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this._supplierService.getAll();
            if (!result) return res.status(400).json({ message: "No se encontro ningun proveedor registrado" })
            return res.status(200).json({ result })
        } catch (error) {
            next(error)
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const proveedorData = req.body
            const result = await this._supplierService.create(proveedorData)
            return res.status(200).json({ message: "proveedor creado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const proveedorData = req.body
            const result = await this._supplierService.update(Number(id), proveedorData)
            return res.status(200).json({ message: "proveedor actualizado exitosamente!", data: result })
        } catch (error) {
            next(error)
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this._supplierService.delete(Number(id))
            if (result)
                return res.status(200).json({ message: "proveedor eliminado exitosamente!" })
        } catch (error) {
            next(error)
        }
    }
}