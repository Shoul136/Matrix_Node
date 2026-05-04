import { Router } from "express"
import { DepartamentService } from "../services/application/departament/DepartamentService.js"
import { DepartamentoController } from "../controllers/DepartamentoController.js"
import { validateToken } from "../middlewares/getSession.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { DepartamentSchema, UpdateDepartamentSchema } from "../schemas/catalog.schema.js"

const router = Router()
const departamentService = new DepartamentService()
const controller = new DepartamentoController(departamentService)

router.get("/", validateToken, controller.getAll)
router.post("/", validateToken, validate(DepartamentSchema), controller.create)
router.patch("/:id", validateToken, validate(UpdateDepartamentSchema), controller.update)
router.delete("/:id", validateToken, controller.delete)

export default router