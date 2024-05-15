import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/sequelize'

// Model: mapeamento das classes com Banco de dados, junta o conceitual(classe) com o banco

export class BancoModel extends Model { // classe conceitual
    private _id!: number
    private _numero!: string
    private _nome!: string

    get nome(): string { // pega valor
        return this._nome
    }

    set nome(value: string) { // atribui valor
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

// ligação da classe com a tabela (Banco de dados)
BancoModel.init( 
    {   // colunas do banco de dados
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
        modelName: 'BancoModel',
        tableName: 'tbl_banco',
        timestamps: false
    },
)
