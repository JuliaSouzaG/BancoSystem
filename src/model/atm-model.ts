import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/sequelize'

export class AtmModel extends Model {
    private _id!: number
    private _numero!: string
    private _nome!: string

    get nome(): string {
        return this._nome
    }

    set nome(value: string) {
        this._nome = value
    }

    get numero(): string {
        return this._numero
    }

    set numero(value: string) {
        this._numero = value
    }

    get id(): number {
        return this._id
    }

    set id(value: number) {
        this._id = value
    }
}

AtmModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'AtmModel',
        tableName: 'tbl_atm',
        timestamps: false
    },
)
