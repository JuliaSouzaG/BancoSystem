import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/sequelize';
import { AgenciaModel } from './agencia-model';

export class ContaModel extends Model {
    
    private _id!: number;
    private _id_agencia!: number;
    private _numero!: string;
    private _nome_completo!: string;
    private _cpf!: string;
    private _password!: string;
    private _saldo!: number;
    private _limite_especial!: number;

    get limite_especial(): number {
        return this._limite_especial;
    }

    set limite_especial(value: number) {
        this._limite_especial = value;
    }

    get saldo(): number {
        return this._saldo; //parseFloat(this.getDataValue('saldo'));
    }

    set saldo(value: number) {
        this._saldo = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get cpf(): string {
        return this._cpf;
    }

    set cpf(value: string) {
        this._cpf = value;
    }

    get nome_completo(): string {
        return this._nome_completo;
    }

    set nome_completo(value: string) {
        this._nome_completo = value;
    }

    get numero(): string {
        return this._numero;
    }

    set numero(value: string) {
        this._numero = value;
    }

    get id_agencia(): number {
        return this._id_agencia;
    }

    set id_agencia(value: number) {
        this._id_agencia = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }


    //operações bancárias
    public verificarSaldoDisponivel(valor: number): boolean {
        const limite = this.saldo + this.limite_especial;
        if ( limite < valor) {
            return false;
        } else {
            return true;
        }
    }
    
    public depositar(valor: number) {
        this.saldo += valor;
    }

    public sacar(valor: number) {
        this.saldo -= valor;
    }

}

ContaModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        id_agencia: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: AgenciaModel,
                key: 'id',
            },
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        saldo: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0.0,
        },
        limite_especial: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0.0,
        },
    },
    {
        sequelize,
        modelName: 'ContaModel',
        tableName: 'tbl_conta',
        timestamps: false,
    },
);