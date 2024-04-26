import { IAtm } from "../interface/atm-interface";
import { AtmModel } from "../model/atm-model";

export class AtmService {
    constructor() { }

    public async criar(novo_item: IAtm) {
        
        try {
            await AtmModel.create({
                numero: novo_item.numero,
                nome: novo_item.nome
            });
        } catch (erro: any) {
            throw new Error("Erro no criar [" + erro.message + "]");
        }
    }
}
