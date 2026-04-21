import Usuario from "../../../models/Usuario.model.js"

export const resetPasswordByToken = async(user_id: string, passwordHashed: string) : Promise<boolean> => {
    const [affectedCount] = await Usuario.update(
        { password: passwordHashed},
        { where: { id: user_id}}
    )
    return affectedCount > 0
}