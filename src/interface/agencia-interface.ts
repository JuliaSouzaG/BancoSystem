export interface IAgencia {
    id: number;
    id_banco: number;
    numero: string;
    nome: string;
    endereco: string;
}

export interface IBuscaAgenciaPorNumero {
    id_banco: number;
    numero: string;
}