import { AllowNull, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import Role from "./Role.model.js";
import UsuarioRole from "./UsuarioRole.model.js";
import Departamento from "./Departamento.model.js";
import { UsuarioEnum } from "./enums/index.js";

@Table({
    tableName: 'usuario',
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'last_modified_date'
})

class Usuario extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)    
    declare id: string

    @AllowNull(false)
    @Column({type: DataType.STRING(100)})
    declare email: string

    @AllowNull(false)
    @Column({type: DataType.STRING(100)})
    declare password: string

    @AllowNull(false)
    @Column({type: DataType.STRING(100)})
    declare nombre: string

    @AllowNull(false)
    @Column({type: DataType.STRING(60)})
    declare apellido_paterno: string

    @AllowNull(false)
    @Column({type: DataType.STRING(60)})
    declare apellido_materno: string

    // Foreign Key
    @ForeignKey(() => Departamento)
    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    declare departamento_id: number

    // Foreign Key
    @Column({type: DataType.UUID})
    declare created_by: string

    declare created_date: Date

    // Foreign Key
    @Column({type: DataType.UUID})
    declare last_modified_by: string

    declare last_modified_date: Date

    @Default(UsuarioEnum.Activo)
    @Column({type: DataType.STRING})
    declare estatus: UsuarioEnum

    @BelongsTo(() => Departamento)
    declare departamento: Departamento

    @BelongsToMany(() => Role, () => UsuarioRole, 'usuario_id', 'role_id')
    declare roles: Role[]

    @Column({
        type: DataType.VIRTUAL,
        get() {
            const nombre = this.getDataValue('nombre') || '';
            const paterno = this.getDataValue('apellido_paterno') || '';
            const materno = this.getDataValue('apellido_materno') || '';
            return [nombre, paterno, materno].filter(Boolean).join(' ');
        }
    }) 
    declare nombre_completo: string;
}

export default Usuario;