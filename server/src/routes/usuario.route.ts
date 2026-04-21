import { Router } from "express";
import { JwtAuthService } from "../services/infrastructure/security/auth/JwtAuthService.js";
import { config } from "../config/settings/index.js";
import { AuthService } from "../services/application/auth/AuthService.js";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { UserService } from "../services/application/user/UserService.js";
import { validateToken } from "../middlewares/getSession.middleware.js";
import { MaildevService } from "../services/infrastructure/email/MaildevService.js";
import { validate } from "../middlewares/validate.middleware.js";
import { RegisterUsuarioSchema, ResetPasswordByTokenSchema, ResetPasswordSchema, SendPasswordSchema, UpdateAdminUsuarioSchema, UpdateStatusAdminSchema, UpdateUsuarioSchema } from "../schemas/usuario.schema.js";
import { AuthLoginSchema } from "../schemas/auth.schema.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { RolesEnum } from "../models/enums/index.js";

const router = Router()

const jwtService = new JwtAuthService(config.auth.secret, config.auth.expires)
const authService = new AuthService(jwtService)
const emailService = new MaildevService(config.mail.host, config.mail.port, config.settings.base_url_client);
const userService = new UserService(jwtService, emailService)
const controller = new UsuarioController(authService, userService)

// Rutas publicas
router.post("/login", validate(AuthLoginSchema), controller.login);
router.post("/register", validate(RegisterUsuarioSchema), controller.register)
router.post("/sendPassword", validate(SendPasswordSchema) ,controller.sendPassword)
router.patch("/password/reset/:token", validate(ResetPasswordByTokenSchema) ,controller.resetPasswordByToken)

// Consultas
router.get("/", validateToken, controller.getPaginationUser)
router.get("/search", validateToken, controller.getUserByEmail)
router.get("/:id", validateToken, controller.getUserById)

// Actualización por Usuario
router.patch("/update-user/", validateToken, validate(UpdateUsuarioSchema), controller.updateUser)
router.patch("/resetPassword/:id", validate(ResetPasswordSchema), validateToken, controller.resetPassword)

// Actualizacion por Admin
router.patch("/update-status-admin/:id", validateToken, authorize([RolesEnum.ADMIN]) ,validate(UpdateStatusAdminSchema), controller.updateAdminStatusUser)
router.patch("/update-admin-user/:id", validateToken, authorize([RolesEnum.ADMIN]), validate(UpdateAdminUsuarioSchema), controller.updateAdminUser)

export default router