import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Usuario from "./Usuario.model.js";

@Table({
    tableName: 'material',
    timestamps: true,
    createdAt: 'created_date',
    updatedAt: 'last_modified_date'
})

class Material extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(400)})
    declare nombre: string

    @AllowNull(false)
    @Column({type: DataType.STRING(800)})
    declare descripcion: string

    @Column({type: DataType.STRING(100)})
    declare numero_parte: string

    @Column({type: DataType.STRING(30)})
    declare unidad_medida: string

    @AllowNull(false)
    @Column({type: DataType.DECIMAL()})
    declare costo_promedio: number

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

    @AllowNull(false)
    @Column({type: DataType.STRING(20)})
    declare estatus: string

    @BelongsTo(() => Usuario, 'created_by')
    declare creator: Usuario

    @BelongsTo(() => Usuario, 'last_modified_by')
    declare updater: Usuario
}

export default Material