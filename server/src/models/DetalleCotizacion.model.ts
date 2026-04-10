import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Cotizacion from "./Cotizacion.model.js";
import Material from "./Material.model.js";
import Proveedor from "./Proveedor.model.js";

@Table({
    tableName: 'detalle_cotizacion',
    timestamps: false
})

class DetalleCotizacion extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    // Foreign Key
    @ForeignKey(() => Cotizacion)
    @Column({type: DataType.INTEGER})
    declare cotizacion_id: number

    // Foreign Key
    @ForeignKey(() => Material)
    @Column({type: DataType.INTEGER})
    declare material_id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(800)})
    declare descripcion_proveedor: string

    @AllowNull(false)
    @Column({type: DataType.DECIMAL(18,2)})
    declare cantidad: number

    @AllowNull(false)
    @Column({type: DataType.DECIMAL(18,2)})
    declare precio_unitario: number

    @AllowNull(false)
    @Column({type: DataType.DECIMAL(18,2)})
    declare subtotal: number

    @BelongsTo(() => Cotizacion, 'cotizacion_id')
    declare cotizacion: Cotizacion

    @BelongsTo(() => Material, 'material_id')
    declare material: Material
}

export default DetalleCotizacion