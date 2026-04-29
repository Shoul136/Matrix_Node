import { Router } from "express"
import { AuthController } from "../controllers/AuthController.js"
import { AuthService } from "../services/application/auth/AuthService.js"
import { JwtAuthService } from "../services/infrastructure/security/auth/JwtAuthService.js"
import { config } from "../config/settings/index.js";

const router = Router()

const jwtService = new JwtAuthService(config.auth.secret, config.auth.expires)
const authService = new AuthService(jwtService)
const controller = new AuthController(authService)

router.get("/role/", controller.getAllRoles)
router.post("/role/", controller.createRole)
router.patch("/role/:id", controller.updateRole)
router.delete("/role/:id", controller.deleteRole)

router.get("/permission/", controller.getPermission)
router.post("/permission/", controller.createPermission)
router.post("/assign-permission/", controller.assignPermissionsToRole)
router.post("/assign-role/", controller.assignRolesToUser)

export default router