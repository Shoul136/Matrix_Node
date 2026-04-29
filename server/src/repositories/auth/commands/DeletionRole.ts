import Role from "../../../models/Role.model.js"

export const deletionRole = async(id : any) => {
    const role = await Role.findByPk(id);
    
    if (!role) {
        throw new Error('El rol que intentas eliminar no existe');
    }

    await role.destroy()
    return { success: true } 
}