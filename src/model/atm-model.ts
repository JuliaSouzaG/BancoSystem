import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';

export class AtmModel extends Model {
    private _id!: number;
    private _codigo!: string;
    private _endereco!: string;
    private _ativo!: boolean;

    get ativo(): boolean {
        return this._ativo;
    }

    set ativo(value: boolean) {
        this._ativo = value;
    }

    get endereco(): string {
        return this._endereco;
    }

    set endereco(value: string) {
        this._endereco = value;
    }

    get codigo(): string {
        return this._codigo;
    }

    set codigo(value: string) {
        this._codigo = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }
}

AtmModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: 'AtmModel',
        tableName: 'tbl_atm',
        timestamps: false,
    },
);