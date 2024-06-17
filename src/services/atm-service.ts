import { IATM, IOperacao } from '../interface/atm-interface';
import { AtmModel } from '../model/atm-model';
import { BancoService } from './banco-service';


export class ATMService {
    private bancoService!: BancoService;

    constructor() {
        this.bancoService = new BancoService();

    }

    public async criar(item: IATM) {
        try {
            await AtmModel.create({
                codigo: item.codigo,
                endereco: item.endereco,
            });
        } catch (e: any) {
            throw new Error('Erro ao tentar incluir um novo ATM: ' + e.message);
        }
    }

    public async listar(): Promise<AtmModel[]> {
        try {
            const bancos = await AtmModel.findAll();
            return bancos;
        } catch (e: any) {
            throw new Error('Erro ao tentar listar ATMs: ' + e.message);
        }
    }

    public async buscarPorCodigo(codigo_atm: string): Promise<AtmModel> {
        try {
            const filtro = {
                where: {
                    codigo: codigo_atm,
                },
            };
            const atm = <AtmModel>await AtmModel.findOne(filtro);
            return atm;
        } catch (e: any) {
            throw new Error('Erro ao tentar buscar ATM: ' + e.message);
        }
    }

    public async buscarPorId(id_atm: number): Promise<AtmModel> {
        try {
            const atm = <AtmModel>await AtmModel.findByPk(id_atm);
            return atm;
        } catch (e: any) {
            throw new Error('Erro ao tentar buscar ATM: ' + e.message);
        }
    }

    public async atualizar(id_banco: number, item: IATM) {
        try {
            const atm = await this.buscarPorId(id_banco);

            if (atm) {
                atm.codigo = item.codigo;
                atm.endereco = item.endereco;
                atm.ativo = item.ativo;
                await atm.save();
            } else {
                throw new Error('ATM não encontrado');
            }
        } catch (error: any) {
            throw new Error('Erro ao tentar atualizar ATM: ' + error.message);
        }
    }

    public async excluir(id_atm: number) {
        try {
            const atm = await this.buscarPorId(id_atm);
            if (atm) {
                await atm.destroy();
            } else {
                throw new Error('ATM não encontrado');
            }
        } catch (error: any) {
            throw new Error('Erro ao tentar excluir ATM: ' + error.message);
        }
    }
    
}