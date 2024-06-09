export interface IConta {
    id: number;
    id_agencia: number;
    numero: string;
    nome_completo: string;
    cpf: string;
    password: string;
    saldo: number;
    limite_especial: number;
}

export interface IChaveBuscaConta {
    id_agencia: number;
    numero_conta: string;
}