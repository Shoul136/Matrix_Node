import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrdenCompra from "./OrdenCompra.model.js";
import Proveedor from "./Proveedor.model.js";
import Usuario from "./Usuario.model.js";
import DetalleCotizacion from "./DetalleCotizacion.model.js";

@Table({
    tableName: 'cotizacion',
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'last_modified_date'
})

class Cotizacion extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    // Foreign Key
    @ForeignKey(() => OrdenCompra)
    @Column({type: DataType.INTEGER})
    declare orden_compra_id: number

    // Foreign Key
    @ForeignKey(() => Proveedor)
    @Column({type: DataType.INTEGER})
    declare proveedor_id: number

    @Column({type: DataType.INTEGER})
    declare numero_cotizacion: number

    @AllowNull(false)
    @Column({type: DataType.DATE})
    declare fecha_cotizacion: Date

    @AllowNull(false)
    @Column({type: DataType.DECIMAL(18,2)})
    declare monto_total: number

    @AllowNull(false)
    @Column({type: DataType.STRING(255)})
    declare pdf_nombre: string

    @AllowNull(false)
    @Column({type: DataType.TEXT})
    declare pdf_ruta: string

    @Column({type: DataType.TEXT})
    declare nota: string

    // Foreign Key
    @ForeignKey(() => Usuario)
    @Column({type: DataType.UUID})
    declare seleccionado_por_ingeniero: string

    @Column({type: DataType.DATE})
    declare fecha_seleccion: Date

    @Column({type: DataType.BOOLEAN})
    declare seleccionado_por_usuario: boolean

    // Foreign Key
    @ForeignKey(() => Usuario)
    @Column({type: DataType.UUID})
    declare cargado_por_usuario: string

    @Column({type: DataType.DATE})
    declare fecha_carga: Date

    // Foreign Key
    @ForeignKey(() => Usuario)
    @Column({type: DataType.UUID})
    declare created_by: string

    declare created_date: Date

    // Foreign Key
    @ForeignKey(() => Usuario)
    @Column({type: DataType.UUID})
    declare last_modified_by: string

    declare last_modified_date: Date

    @BelongsTo(() => OrdenCompra, 'orden_compra_id')
    declare orden_compra: OrdenCompra

    @BelongsTo(() => Proveedor, 'proveedor_id')
    declare proveedor: Proveedor

    @BelongsTo(() => Usuario, 'seleccionado_por_ingeniero')
    declare seleccionado_por: Usuario

    @BelongsTo(() => Usuario, 'cargado_por_usuario')
    declare cargado_por: Usuario

    @BelongsTo(() => Usuario, 'created_by')
    declare creator: Usuario

    @BelongsTo(() => Usuario, 'last_modified_by')
    declare updater: Usuario

    @HasMany(() => DetalleCotizacion)
    declare detalles_cotizacion: DetalleCotizacion[]
}

export default Cotizacion