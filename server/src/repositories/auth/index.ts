import { assignPermissions } from "./commands/AssignPermissions.js";
import { assignRole } from "./commands/AssignRole.js";
import { createPermission } from "./commands/CreatePermission.js";
import { createRole } from "./commands/CreateRole.js";
import { deletionRole } from "./commands/DeletionRole.js";
import { updateRole } from "./commands/UpdateRole.js";
import { getAllPermission } from "./queries/GetAllPermission.js";
import { getAllRoles } from "./queries/GetAllRoles.js";
import { getRoleById } from "./queries/GetRoleById.js";

export const AuthRepository = {
    commands: {
        createRole,
        deletionRole,
        updateRole,        
        createPermission,
        assignPermissions,
        assignRole
    },
    queries: {
        getAllPermission,
        getAllRoles,
        getRoleById
    }
}