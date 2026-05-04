import { createDepartment } from "./commands/CreateDepartment.js";
import { deleteDepartament } from "./commands/DeleteDepartment.js";
import { updateDepartament } from "./commands/UpdateDepartment.js";
import { getAllDepartament } from "./queries/GetAllDepartment.js";

export const DepartamentoRepository = {
    commands: {
        createDepartment,
        deleteDepartament,
        updateDepartament
    },
    queries: {
        getAllDepartament
    }
}