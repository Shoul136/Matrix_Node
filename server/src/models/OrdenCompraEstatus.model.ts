import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'orden_compra_estatus',
    timestamps: false
})

class OrdenCompraEstatus extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(30)})
    declare nombre: string    
}

export default OrdenCompraEstatus