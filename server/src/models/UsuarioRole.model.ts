import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Usuario from "./Usuario.model.js";
import Role from "./Role.model.js";

@Table({
    tableName: 'usuario_role',
    timestamps: false
})

class UsuarioRole extends Model{
    // Foreign Key
    @ForeignKey(() => Usuario)
    @PrimaryKey
    @Column({type: DataType.UUID})
    declare usuario_id: string

    // Foreign Key
    @ForeignKey(() => Role)
    @PrimaryKey
    @Column({type: DataType.INTEGER})
    declare role_id: number
}

export default UsuarioRole
