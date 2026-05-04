import { createSupplier } from "./commands/CreateSupplier.js";
import { deleteSupplier } from "./commands/DeleteSupplier.js";
import { updateSupplier } from "./commands/UpdateSupplier.js";
import { getAllSupplier } from "./queries/GetAllSupplier.js";

export const ProveedorRepository = {
    commands: {
        createSupplier,
        deleteSupplier,
        updateSupplier
    },
    queries: {
        getAllSupplier
    }
}