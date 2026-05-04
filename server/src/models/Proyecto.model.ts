import { AllowNull, AutoIncrement, Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProyectoEstatus as ProyectoEnum } from "./enums/index.js";

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

    @Default(ProyectoEnum.CURSO)
    @AllowNull(false)
    @Column({type: DataType.STRING(20)})
    declare estatus: ProyectoEnum
}

export default Proyecto