import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import Role from "./Role.model.js";
import RolePermiso from "./RolePermiso.model.js";

@Table({
    tableName: 'permiso',
    timestamps: false
})

class Permiso extends Model{   
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(100)})
    declare nombre: string

    @Column({type: DataType.STRING(400)})
    declare descripcion: string

    @BelongsToMany(() => Role, () => RolePermiso, 'permiso_id', 'role_id')
    declare roles: Role[]
}

export default Permiso