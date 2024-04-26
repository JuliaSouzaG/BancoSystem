import { IBanco } from "../interface/banco-interface";
import { BancoModel } from "../model/banco-model";

export class BancoService {
    constructor() { }

    public async criar(novo_item: IBanco) {
        try {
            await BancoModel.create({
                numero: novo_item.numero,
                nome: novo_item.nome
            });
        } catch (erro: any) {
            throw new Error("Erro no criar [" + erro.message + "]");
        }

    }
    public async listar() {
        try {
            const bancos: BancoModel[] = await BancoModel.findAll(); //puxa todos os bancos
            return bancos;
        } catch (erro: any) {
            throw new Error(erro.massage);
        }
    }
    public async buscar(id: number) {
        try {
            const banco = <BancoModel> await BancoModel.findByPk(id);
            return banco;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    public async alterar(id: number, item: IBanco) {
        try {
            const banco: BancoModel = await this.buscar(id); // busquei o banco que quero
            if (banco) { // se o banco for encontrado
                banco.numero = item.numero;
                banco.nome = item.nome;
                banco.save();
            } else { // se não encontrar
                throw new Error('Banco não encontrado')
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    public async delete(id: number) {
        try {
            const banco: BancoModel = await this.buscar(id); // busquei o banco que quero
            if (banco) { // se o banco for encontrado
                banco.destroy();
            } else { // se não encontrar
                throw new Error('Banco não encontrado')
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

  
}
