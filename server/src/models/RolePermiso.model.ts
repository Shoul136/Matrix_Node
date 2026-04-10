import { Column, DataType, Table, Model, PrimaryKey, AutoIncrement, ForeignKey, AllowNull} from "sequelize-typescript";
import Role from "./Role.model.js";
import Permiso from "./Permiso.model.js";

@Table({
    tableName: 'role_permiso',
    timestamps: false
})

class RolePermiso extends Model{
    // Foreign Key    
    @ForeignKey(() => Role)
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    declare role_id: number

    // Foreign Key
    @ForeignKey(() => Permiso)
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    declare permiso_id: number
}

export default RolePermiso