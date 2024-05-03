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
}
