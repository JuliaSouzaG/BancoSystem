import { TIPO_OPERACAO } from "../utils/enums";

export interface IATM {
    id: number;
    codigo: string;
    endereco: string;
    ativo: boolean;
}

export interface IOperacao {
    id_atm: number;
    id_banco: number;
    numero_agencia: string;
    numero_conta: string;
    password: string;
    tipo: TIPO_OPERACAO,
    valor: number;
}