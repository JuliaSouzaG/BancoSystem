
import { IConta } from '../interface/conta-interface';
import { ContaModel } from '../model/conta-model';


export class ContaService {
    
    private contaModel!: ContaModel;

    constructor() {
    }

    //CRUD
    public async criar(item: IConta) {
        
        if (this.validarCPF(item.cpf) == false) {
            throw new Error('Erro ao incluir um novo conta: CPF inválido');
        }
        
        try {
            this.contaModel = await ContaModel.create({
                id: item.id,
                id_agencia: item.id_agencia,
                numero: item.numero,
                nome_completo: item.nome_completo,
                cpf: item.cpf,
                password: item.password,
                saldo: item.saldo,
                limite_especial: item.limite_especial,
            });
            console.log('Nova conta criada com sucesso:', this.contaModel.toJSON());
            return this.contaModel;
        } catch (erro: any) {
            throw new Error('Erro ao incluir um novo conta: ' + erro.message);
        }
    }

    public async listar(): Promise<ContaModel[]> {
        try {
            const contas = ContaModel.findAll();
            return contas;
        } catch (erro: any) {
            throw new Error('Erro ao listar contas: ' + erro.message);
        }
    }

    public async buscar(id_conta: number): Promise<ContaModel> {
        try {
            const conta = <ContaModel> await ContaModel.findByPk(id_conta);
            return conta;
        } catch (erro: any) {
            throw new Error('Erro ao buscar contas: ' + erro.message);
        }
    }

    public async buscarPorCpf(cpf: string): Promise<ContaModel> {
        try {
            const filtro = {
                where: {
                    cpf: cpf,
                },
            };
            this.contaModel = <ContaModel> await ContaModel.findOne(filtro);
            return this.contaModel;
        } catch (erro: any) {
            throw new Error('Erro ao buscar contas: ' + erro.message);
        }
    }

    public async buscarPorNumero(id_agencia: number, numero: string): Promise<ContaModel> {
        try {
            const filtro = {
                where: {
                    id_agencia: id_agencia,
                    numero: numero,
                },
            };
            this.contaModel = <ContaModel> await ContaModel.findOne(filtro);
            return this.contaModel;
        } catch (erro: any) {
            throw new Error('Erro ao buscar contas: ' + erro.message);
        }
    }

    public async atualizar(id_conta: number, item: IConta) {
        
        if (this.validarCPF(item.cpf) == false) {
            throw new Error('Erro ao incluir um novo conta: CPF inválido');
        }
        
        try {
            const conta = await this.buscar(id_conta);
            if (conta) {
                conta.id_agencia = item.id_agencia;
                conta.numero = item.numero;
                conta.nome_completo = item.nome_completo;
                conta.cpf = item.cpf;
                conta.password = item.password;
                conta.saldo = item.saldo;
                conta.limite_especial = item.limite_especial;
                await conta.save();
            } else {
                throw new Error('Conta não encontrada');
            }
        } catch (erro: any) {
            throw new Error('Erro ao atualizar conta: ' + erro.message);
        }
    }

    public async excluir(id_conta: number) {
        try {
            const conta = await this.buscar(id_conta);
            if (conta) {
                await this.contaModel.destroy();
            } else {
                throw new Error('Conta não encontrada');
            }
        } catch (erro: any) {
            throw new Error('Erro ao excluir conta: ' + erro.message);
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
