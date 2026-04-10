import { AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Usuario from "./Usuario.model.js";
import Departamento from "./Departamento.model.js";
import Proyecto from "./Proyecto.model.js";
import DetalleRequisicion from "./DetalleRequisicion.model.js";
import OrdenCompra from "./OrdenCompra.model.js";

@Table({
    tableName: 'requisicion',
    timestamps: false
})

class Requisicion extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(800)})
    declare nombre: string

    // Foreign Key
    @ForeignKey(() => Usuario)
    @Column({type: DataType.UUID})
    declare solicitado_por_usuario: string

    // Foreign Key
    @ForeignKey(() => Departamento)
    @Column({type: DataType.INTEGER})
    declare departamento_id: number

    // Foreign Key
    @ForeignKey(() => Proyecto)
    @Column({type: DataType.INTEGER})
    declare proyecto_id: number

    @Column({type: DataType.STRING})
    declare nota: string

    @Column({type: DataType.STRING})
    declare motivo_rechazo: string

    @AllowNull(false)
    @Column({type: DataType.STRING})
    declare estatus: string

    @BelongsTo(() => Departamento, 'departamento_id')
    declare departamento: Departamento

    @BelongsTo(() => Usuario, 'solicitado_por_usuario')
    declare solicitado_por: Usuario

    @BelongsTo(() => Proyecto, 'proyecto_id')
    declare proyecto: Proyecto
    
    @HasMany(() => DetalleRequisicion)
    declare detalle_requisiciones: DetalleRequisicion[]

    @HasMany(() => OrdenCompra)
    declare ordenes_compra: OrdenCompra[]
}

export default Requisicion