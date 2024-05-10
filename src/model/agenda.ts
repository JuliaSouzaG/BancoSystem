import { DataTypes, Model } from 'sequelize'
import sequelize from "../database/sequelize"

export class AgendaModel extends Model {
    private _nome!: string

    get nome(): string { // acessa o atributo nome
        return this._nome // retorna o atributo
    }
    set nome(value: string) { // declara tipo do argumento (valor que será inserido)
        this._nome = value // atributo recebe novo valor
    }
}

AgendaModel.init(
    {
        nome: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        }
    },
    {
        sequelize,
        modelName: 'AgendaModel',
        tableName: 'tbl_agenda',
        timestamps: false
    }


)
// nome do modelo
// nome da tabela que irá inserir
// timestamp: data e hora (true ou false para salvar)