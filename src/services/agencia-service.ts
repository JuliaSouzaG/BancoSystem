import { IAgencia } from '../interface/agencia-interface';
import { AgenciaModel } from '../model/agencia-model';
// import { ContaService } from './conta-service';

export class AgenciaService {
    // private contaService: ContaService;

    // constructor() {
    //     this.contaService = new ContaService();
    // }

    //CRUD
    public async incluir(item: IAgencia) {
        try {
            await AgenciaModel.create({
                numero: item.numero,
                nome: item.nome,
                endereco: item.endereco,
                id_banco: item.id_banco,
            });
            console.log('Agência criada com sucesso.');
        } catch (e: any) {
            throw new Error('Erro ao incluir uma nova agencia: ' + e.message);
        }
    }

    public async listar(): Promise<AgenciaModel[]> {
        try {
            const agencias = <AgenciaModel[]>await AgenciaModel.findAll();
            return agencias;
        } catch (e: any) {
            throw new Error('Erro ao buscar agencias: ' + e.message);
        }
    }

    public async buscarPorNumero(id_banco: number, numero: string): Promise<AgenciaModel> {
        try {
            const filtro = {
                where: {
                    id_banco: id_banco,
                    numero: numero,
                },
            };
            const agencia = <AgenciaModel>await AgenciaModel.findOne(filtro);
            return agencia;
        } catch (e: any) {
            throw new Error('Erro ao buscar agencia: ' + e.message);
        }
    }

    public async buscarPorId(id_agencia: number): Promise<AgenciaModel> {
        try {
            const agencia = <AgenciaModel>await AgenciaModel.findByPk(id_agencia);
            return agencia;
        } catch (e: any) {
            throw new Error('Erro ao buscar agencia: ' + e.message);
        }
    }

    public async atualizar(id_agencia: number, item: IAgencia) {
        try {
            //a agencia é buscada usando o filtro acima
            const agencia = await this.buscarPorId(id_agencia);

            if (agencia) {
                agencia.numero = item.numero;
                agencia.nome = item.nome;
                agencia.endereco = item.endereco;
                agencia.id_banco = item.id_banco;
                await agencia.save();
                console.log('Dados da agencia foram atualizados com sucesso.');
            } else {
                throw new Error('Agência não encontrada');
            }
        } catch (error: any) {
            throw new Error('Erro ao atualizar agencia: ' + error.message);
        }
    }

    public async excluir(id_agencia: number) {
        try {
            const agencia = await this.buscarPorId(id_agencia);

            //se a agencia for encontrada será excluída
            if (agencia) {
                await agencia.destroy();
                console.log('Agencia excluído com sucesso.');
            } else {
                throw new Error('Agência não encontrada');
            }
        } catch (error: any) {
            throw new Error('Erro ao excluir agencia: ' + error.message);
        }
    }

    private validarCPF(cpf: string): boolean {
        // Verifica se o CPF tem 11 caracteres e se são todos dígitos
        if (!/^\d{11}$/.test(cpf)) {
          return false;
        }
      
        // Converte a string em um array de números
        const cpfArray = cpf.split('').map(digito => parseInt(digito, 10));
      
        // Verifica se todos os dígitos são iguais, caso contrário, o CPF é inválido
        if (cpfArray.every(digito => digito === cpfArray[0])) {
          return false;
        }
      
        // Função auxiliar para calcular um dígito verificador
        function calcularDigito(baseArray: number[]): number {
          const soma = baseArray.reduce((acc, digito, index) => acc + digito * (baseArray.length + 1 - index), 0);
          const resto = soma % 11;
          return resto < 2 ? 0 : 11 - resto;
        }
      
        // Calcula o primeiro dígito verificador
        const primeiroDigitoVerificador = calcularDigito(cpfArray.slice(0, 9));
        if (primeiroDigitoVerificador !== cpfArray[9]) {
          return false;
        }
      
        // Calcula o segundo dígito verificador
        const segundoDigitoVerificador = calcularDigito(cpfArray.slice(0, 10));
        if (segundoDigitoVerificador !== cpfArray[10]) {
          return false;
        }    
        // CPF é válido
        return true;
      }

}