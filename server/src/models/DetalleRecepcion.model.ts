import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Cotizacion from "./Cotizacion.model.js";
import DetalleCotizacion from "./DetalleCotizacion.model.js";
import RecepcionMaterial from "./RecepcionMaterial.model.js";

@Table({
    tableName: 'detalle_recepcion',
    timestamps: false
})

class DetalleRecepcion extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    // Foreign Key
    @ForeignKey(() => Cotizacion)
    @Column({type: DataType.INTEGER})
    declare cotizacion_id: number

    // Foreign Key
    @ForeignKey(() => DetalleCotizacion)
    @Column({type: DataType.INTEGER})
    declare detalle_cotizacion_id: number

    // Foreign Key
    @ForeignKey(() => RecepcionMaterial)
    @Column({type: DataType.INTEGER})
    declare recepcion_material_id: number

    @AllowNull(false)
    @Column({type: DataType.DECIMAL(18,2)})
    declare cantidad_recibida: number

    @BelongsTo(() => Cotizacion)
    declare cotizacion: Cotizacion

    @BelongsTo(() => DetalleCotizacion)
    declare detalle_cotizacion: DetalleCotizacion

    @BelongsTo(() => RecepcionMaterial)
    declare recepcion_material: RecepcionMaterial
}

export default DetalleRecepcion