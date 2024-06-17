import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/sequelize'


export class UsuarioModel extends Model {
    private _id!: number;
    private _nome!: string;
    private _login!: string;
    private _password!: string;
    
    get id(): number {
      return this._id;
    }
    
    set id(value: number) {
      this._id = value;
    }
    
    get nome(): string {
      return this._nome;
    }
    
    set nome(value: string) {
      this._nome = value;
    }
    
    get login(): string {
      return this._login;
    }
    
    set login(value: string) {
      this._login = value;
    }
    get password(): string {
      return this._password;
    }
    
    set password(value: string) {
      this._password = value;
    }
}

UsuarioModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        password: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        modelName: "UsuarioModel",
        tableName: "tbl_usuario",
        timestamps: false,
    }
)