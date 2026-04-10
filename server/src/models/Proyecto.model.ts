import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'proyecto',
    timestamps: false
})

class Proyecto extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(200)})
    declare nombre: string

    @Column({type: DataType.TEXT})
    declare descripcion: string
}

export default Proyecto