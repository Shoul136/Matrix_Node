import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrdenCompra from "./OrdenCompra.model.js";
import Usuario from "./Usuario.model.js";
import DetalleRecepcion from "./DetalleRecepcion.model.js";

@Table({
    tableName: 'recepcion_material',
    timestamps: false
})

class RecepcionMaterial extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    // Foreign Key
    @ForeignKey(() => OrdenCompra)
    @Column({type: DataType.INTEGER})
    declare orden_compra_id: number

    @AllowNull(false)
    @Column({type: DataType.DATE})
    declare fecha_recepcion: Date

    // Foreign Key
    @ForeignKey(() => Usuario)
    @Column({type: DataType.UUID})
    declare recibido_por_usuario: string

    @AllowNull(false)
    @Column({type: DataType.INTEGER})
    declare numero_remision: number

    @Column({type: DataType.STRING})
    declare nota: string

    @BelongsTo(() => OrdenCompra, 'orden_compra_id')
    declare orden_compra: OrdenCompra

    @BelongsTo(() => Usuario, 'recibido_por_usuario')
    declare recibido_por: Usuario

    @HasMany(() => DetalleRecepcion)
    declare detalles_recepciones: []
}

export default RecepcionMaterial