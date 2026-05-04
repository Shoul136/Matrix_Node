import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Usuario from "./Usuario.model.js";

@Table({
    tableName: 'departamento',
    timestamps: false
})

class Departamento extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(200)})
    declare nombre: string

    // Foreign Key
    @AllowNull(true)
    @ForeignKey(() => Usuario)
    @Column({type: DataType.UUID})
    declare jefe_departamento: string | null

    @BelongsTo(() => Usuario, 'jefe_departamento')
    declare jefe: Usuario

    @HasMany(() => Usuario)
    declare usuarios: Usuario[]
}

export default Departamento