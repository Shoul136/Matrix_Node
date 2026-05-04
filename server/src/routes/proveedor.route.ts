import { Router } from "express"
import { SupplierService } from "../services/application/supplier/SupplierService.js"
import { ProveedorController } from "../controllers/ProveedorController.js"
import { validateToken } from "../middlewares/getSession.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { SupplierSchema, UpdateSupplierSchema } from "../schemas/catalog.schema.js"

const router = Router()
const supplierService = new SupplierService()
const controller = new ProveedorController(supplierService)

router.get("/", validateToken, controller.getAll)
router.post("/", validateToken, validate(SupplierSchema), controller.create)
router.patch("/:id", validateToken, validate(UpdateSupplierSchema), controller.update)
router.delete("/:id", validateToken, controller.delete)

export default router