import { Router } from "express";
import { validateToken } from "../middlewares/getSession.middleware.js";
import { ProyectoController } from "../controllers/ProyectoController.js";
import { ProjectService } from "../services/application/project/ProjectService.js";
import { validate } from "../middlewares/validate.middleware.js";
import { ProjectSchema, UpdateProjectSchema } from "../schemas/catalog.schema.js";

const router = Router()
const projectService = new ProjectService()
const controller = new ProyectoController(projectService)

router.get("/", validateToken, controller.getAll)
router.post("/", validateToken, validate(ProjectSchema), controller.create)
router.patch("/:id", validateToken, validate(UpdateProjectSchema), controller.update)
router.delete("/:id", validateToken, controller.delete)

export default router 