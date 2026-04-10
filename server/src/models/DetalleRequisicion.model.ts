import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Requisicion from "./Requisicion.model.js";
import Material from "./Material.model.js";

@Table({
    tableName: 'detalle_requisicion',
    timestamps: false
})

class DetalleRequisicion extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    // Foreign Key
    @ForeignKey(() => Requisicion)
    @Column({type: DataType.INTEGER})
    declare requisicion_id: number

    // Foreign Key
    @ForeignKey(() => Material)
    @Column({type: DataType.INTEGER})
    declare material_id: number

    @AllowNull(false)
    @Column({type: DataType.DECIMAL(18,2)})
    declare cantidad_solicitada: number

    @Column({type: DataType.TEXT})
    declare nota: string

    @Column({type: DataType.TEXT})
    declare descripcion_ad_hoc: string

    @BelongsTo(() => Requisicion, 'requisicion_id')
    declare requisicion: Requisicion

    @BelongsTo(() => Material, 'material_id')
    declare material: Material
}

export default DetalleRequisicion