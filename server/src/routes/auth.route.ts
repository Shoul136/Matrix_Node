import { Router } from "express"
import { AuthController } from "../controllers/AuthController.js"
import { AuthService } from "../services/application/auth/AuthService.js"
import { JwtAuthService } from "../services/infrastructure/security/auth/JwtAuthService.js"
import { config } from "../config/settings/index.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { RolesEnum } from "../models/enums/index.js";
import { validateToken } from "../middlewares/getSession.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { AssignPermissionSchema, AssignRoleSchema, CreatePermissionSchema, CreateRoleSchema, UpdatePermissionSchema, UpdateRoleSchema } from "../schemas/auth.schema.js";

const router = Router()

const jwtService = new JwtAuthService(config.auth.secret, config.auth.expires)
const authService = new AuthService(jwtService,)
const controller = new AuthController(authService)

router.get("/role/", validateToken ,authorize([RolesEnum.ADMIN]), controller.getAllRoles)
router.post("/role/", validateToken, authorize([RolesEnum.ADMIN]), validate(CreateRoleSchema), controller.createRole)
router.patch("/role/:id", validateToken, authorize([RolesEnum.ADMIN]), validate(UpdateRoleSchema), controller.updateRole)
router.delete("/role/:id", validateToken, authorize([RolesEnum.ADMIN]), controller.deleteRole)

router.get("/permission/", validateToken, authorize([RolesEnum.ADMIN]), controller.getPermission)
router.post("/permission/", validateToken, authorize([RolesEnum.ADMIN]), validate(CreatePermissionSchema), controller.createPermission)
router.patch("/permission/:id", validateToken, authorize([RolesEnum.ADMIN]), validate(UpdatePermissionSchema), controller.updatePermission)
router.delete("/permission/:id", validateToken, authorize([RolesEnum.ADMIN]), controller.deletePermission)

router.patch("/assign-permission/:id", validateToken, authorize([RolesEnum.ADMIN]), validate(AssignPermissionSchema) ,controller.assignPermissionsToRole)
router.patch("/assign-role/:id", validateToken, authorize([RolesEnum.ADMIN]), validate(AssignRoleSchema) ,controller.assignRolesToUser)

export default router