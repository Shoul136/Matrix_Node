import { assignPermissions } from "./commands/AssignPermissions.js";
import { assignRole } from "./commands/AssignRole.js";
import { createPermission } from "./commands/CreatePermission.js";
import { createRole } from "./commands/CreateRole.js";
import { deletePermission } from "./commands/DeletePermission.js";
import { deleteRole } from "./commands/DeleteRole.js";
import { updatePermission } from "./commands/UpdatePermission.js";
import { updateRole } from "./commands/UpdateRole.js";
import { getAllPermission } from "./queries/GetAllPermission.js";
import { getAllRoles } from "./queries/GetAllRoles.js";
import { getPermissionById } from "./queries/GetPermissionById.js";
import { getRoleById, getRolesById } from "./queries/GetRoleById.js";

export const AuthRepository = {
    commands: {
        createRole,
        deleteRole,
        updateRole,        
        createPermission,
        deletePermission,
        updatePermission,
        assignPermissions,
        assignRole
    },
    queries: {
        getAllPermission,
        getAllRoles,
        getRoleById,
        getRolesById,
        getPermissionById
    }
}