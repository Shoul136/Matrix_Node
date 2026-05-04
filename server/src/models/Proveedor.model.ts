import { AllowNull, AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    tableName: 'proveedor',
    timestamps: false
})

class Proveedor extends Model{
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number

    @AllowNull(false)
    @Column({type: DataType.STRING(200)})
    declare nombre: string

    @AllowNull(false)
    @Column({type: DataType.STRING(100)})
    declare contacto_principal: string

    @AllowNull(false)
    @Column({type: DataType.STRING(14)})
    declare telefono: string
    
    @AllowNull(false)
    @Column({type: DataType.STRING(100)})
    declare email: string

    @AllowNull(false)
    @Column({type: DataType.STRING(800)})
    declare direccion: string

    @AllowNull(false)
    @Column({type: DataType.STRING(13)})
    declare rfc: string

    @AllowNull(false)
    @Column({type: DataType.STRING(20)})
    declare estatus: string
}

export default Proveedor