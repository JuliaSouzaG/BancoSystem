import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { BancoModel } from './banco-model';
import { AtmModel } from './atm-model';


export class CredenciamentoModel extends Model {
    private _id_banco!: number;
    private _id_atm!: number;
    
    get id_atm(): number {
      return this._id_atm;
    }
    
    set id_atm(value: number) {
      this._id_atm = value;
    }
    
    get id_banco(): number 
    {
      return this._id_banco;
    }
    
    set id_banco(value: number)
     {
      this._id_banco = value;
    }
}

CredenciamentoModel.init(
    {
        id_banco: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            references: {
                model: BancoModel,
                key: 'id',
            },
        },
        id_atm: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: AtmModel,
                key: 'id',
            },           
        },
    },
    {
        sequelize,
        modelName: 'CredenciamentoModel',
        tableName: 'tbl_credenciamento',
        timestamps: false,
    },
);