import { CredenciamentoModel } from "../model/credenciamento-model";

export class CredenciamentoService {

    private credenciamentoModel: CredenciamentoModel;

    constructor() {
        this.credenciamentoModel =  new CredenciamentoModel();
    }

    public async criar(idBanco: number, idAtm: number) {
        try {
            await CredenciamentoModel.create({
                id_banco: idBanco,
                id_atm: idAtm
            })
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    public async buscar(idBanco: number, idAtm: number): Promise<CredenciamentoModel | null> {
        const filtro = {
            where: {
                id_banco: idBanco,
                id_atm: idAtm
            }
        }
        try {
            return await CredenciamentoModel.findOne(filtro);
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }


    public async excluir(idBanco: number, idAtm: number) {
        try {
            const cred = await this.buscar(idBanco, idAtm);
            if (cred) {
                cred.destroy();
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    public async listar() {
        try {
            const credenciamentos = await CredenciamentoModel.findAll();
            return credenciamentos;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

}