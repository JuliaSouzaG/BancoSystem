import { AgendaModel } from "../model/agenda";
import { IPessoa } from "../interface/agenda-interface";

export class AgendaService {
    private agendaModel: AgendaModel;

    constructor() { // conexão entre as classes
       this.agendaModel = new AgendaModel(); // criando uma propriedade com o mesmo tipo da classe que quero a conexão

    }

    public async criar(pessoa: IPessoa) { // async = mando a requisição, mas não espero o retorno
        try { 
            await AgendaModel.create({ // sempre que trabalho com função async usa-se o await (espera até terminar)
                nome: pessoa.nome
            })
        } catch (erro: any) { // capturar o erro
            throw new Error(erro.message); // dispara o erro que foi pego
        } 
    } 

    public async listarTudo() {
        try {
            const pessoas = await AgendaModel.findAll();
            return pessoas;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    public async ListarPorNome(chave: string) {
        const filtro = {
            where: {
                nome: chave,
            }
        } 
        try {
            const pessoas = await AgendaModel.findAll(filtro);
            return pessoas;
        } catch (erro: any) {
            throw new Error(erro.message)
        }
    }

    public async alterar(id: number, item: IPessoa) { // um argumento para buscar e outro para mudar
        try {
            const pessoa = await AgendaModel.findByPk(id);
            if(pessoa) {
                pessoa.nome = item.nome
                pessoa.save;
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }
    public async excluir(id: number) { // um argumento para buscar e outro para mudar
        try {
            const pessoa = await AgendaModel.findByPk(id);
            if(pessoa) {
                pessoa.destroy();
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }
}