import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import Permiso from "./Permiso.model.js";
import RolePermiso from "./RolePermiso.model.js";
import Usuario from "./Usuario.model.js";
import UsuarioRole from "./UsuarioRole.model.js";

@Table({
    tableName: 'role',
    timestamps: false
})

class Role extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)    
    declare id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(100)})
    declare nombre: string

    @Column({type: DataType.STRING(400)})
    declare descripcion: string

    @BelongsToMany(() => Permiso, () => RolePermiso, 'role_id', 'permiso_id')
    declare permisos: Permiso[]

    @BelongsToMany(() => Usuario, () => UsuarioRole, 'role_id', 'usuario_id')
    declare usuarios: Usuario[]
}

export default Role