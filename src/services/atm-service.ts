import { IAtm } from "../interface/atm-interface";
import { AtmModel } from "../model/atm-model";

export class AtmService {
    constructor() { }

    public async criar(novo_item: IAtm) {
        try {
            await AtmModel.create({
                codigo: novo_item.codigo,
                endereco: novo_item.endereco,
                ativo: novo_item.ativo
            });
        } catch (erro: any) {
            throw new Error("Erro no criar [" + erro.message + "]");
        }
    }
    public async listar() {
        try {
            const atms: AtmModel[] = await AtmModel.findAll(); //puxa todos os atm
            return atms;
        } catch (erro: any) {
            throw new Error(erro.massage);
        }
    }

    public async buscar(id: number) {
        try {
            const atm = <AtmModel>await AtmModel.findByPk(id);
            return atm;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }
    
    public async alterar(id: number, item: IAtm) {
        try {
            const atm: AtmModel = await this.buscar(id); // busquei o banco que quero
            if (atm) { // se o atm for encontrado
                atm.codigo = item.codigo;
                atm.endereco = item.endereco;
                atm.ativo = item.ativo;
                atm.save();
            } else { // se não encontrar
                throw new Error('ATM não encontrada')
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }
}
// recebe mensagens da web, parte e manda pro router