import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Requisicion from "./Requisicion.model.js";
import Usuario from "./Usuario.model.js";
import Proveedor from "./Proveedor.model.js";
import Cotizacion from "./Cotizacion.model.js";
import RecepcionMaterial from "./RecepcionMaterial.model.js";
import OrdenCompraEstatus from "./OrdenCompraEstatus.model.js";
import { OrdenCompraEstatus as OrderCompraEnum } from './enums/index.js'
@Table({
    tableName: 'orden_compra',
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'last_modified_date'
})

class OrdenCompra extends Model
{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    // Foreign Key
    @ForeignKey(() => Requisicion)
    @Column({type: DataType.INTEGER})
    declare requisicion_id: number

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

    // Foreign Key
    @ForeignKey(() => Proveedor)
    @Column({type: DataType.INTEGER})
    declare proveedor_id: number

    @Column({type: DataType.DATE})
    declare fecha_eta: Date

    @AllowNull(false)
    @Column({type: DataType.DECIMAL(18,2)})
    declare total_estimado: number

    @Column({type: DataType.STRING(255)})
    declare pdf_nombre: string

    @Column({type: DataType.STRING})
    declare pdf_ruta: string

    @Column({type: DataType.DATE})
    declare fecha_emision: Date

    @Column({type: DataType.DECIMAL(18,2)})
    declare monto_total_po: number

    @Column({type: DataType.DATE})
    declare fecha_entrega_real: Date

    @Column({type: DataType.TEXT})
    declare nota: string

    @ForeignKey(() => OrdenCompraEstatus)
    @Column({type: DataType.INTEGER})
    declare estatus_id: OrderCompraEnum

    @BelongsTo(() => Requisicion, 'requisicion_id')
    declare requisicion: Requisicion

    @BelongsTo(() => Usuario, 'created_by')
    declare creator: Usuario

    @BelongsTo(() => Usuario, 'last_modified_by')
    declare updater: Usuario

    @BelongsTo(() => Proveedor, 'proveedor_id')
    declare proveedor: Proveedor

    @BelongsTo(() => OrdenCompraEstatus, 'estatus_id')
    declare estatus: OrdenCompraEstatus

    @HasMany(() => Cotizacion)
    declare cotizaciones: Cotizacion[]

    @HasMany(() => RecepcionMaterial)
    declare recepciones_material: RecepcionMaterial[]
}

export default OrdenCompra