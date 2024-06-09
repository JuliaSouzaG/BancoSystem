import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { BancoModel } from './banco-model';

export class AgenciaModel extends Model {
    private _id!: number;
    private _id_banco!: number;
    private _numero!: string;
    private _nome!: string;
    private _endereco!: string;

    get id_banco(): number {
        return this._id_banco;
    }

    set id_banco(value: number) {
        this._id_banco = value;
    }

    get endereco(): string {
        return this._endereco;
    }

    set endereco(value: string) {
        this._endereco = value;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }

    get numero(): string {
        return this._numero;
    }

    set numero(value: string) {
        this._numero = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}

AgenciaModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_banco: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: BancoModel, //modelo de referencia
                key: 'id', //chave primaria do modelo de referencia
            },
        },
    },
    {
        sequelize,
        modelName: 'AgenciaModel',
        tableName: 'tbl_agencia',
        timestamps: false,
    },
);