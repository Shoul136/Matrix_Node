import { loginUserCommand } from "./commands/LoginUser.js";
import { registerUser } from "./commands/RegisterUser.js";
import { resetPassword } from "./commands/ResetPassword.js";
import { resetPasswordByToken } from "./commands/ResetPasswordByToken.js";
import { updateAdminStatusUser } from "./commands/UpdateAdminStatusUser.js";
import { updateAdminUser } from "./commands/UpdateAdminUser.js";
import { updateUser } from "./commands/UpdateUser.js";
import { getUserByEmail } from "./queries/GetUserByEmail.js";
import { getUserById } from "./queries/GetUserById.js";
import { paginationUser } from "./queries/PaginationUser.js";

export const UsuarioRepository = {
    commands: {
        login: loginUserCommand,
        register: registerUser,
        resetPassword,
        resetPasswordByToken,
        updateAdminStatusUser,
        updateAdminUser,
        updateUser
    },
    queries: {
        getUserByEmail,
        getUserById,
        paginationUser
    }
}