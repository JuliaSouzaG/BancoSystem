import { Request, Response } from 'express';
import { ContaService } from '../services/conta-service';
import { IConta } from '../interface/conta-interface';
import { ContaModel } from '../model/conta-model';

export class ContaController {
    private contaService = new ContaService();

    // url: /api/conta/criar
    // body: IConta
    public async criar(req: Request, res: Response) {
        //garante que o corpo da requisição foi enviado antes de continuar
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: { type: 'Erro', description: 'O corpo da requisição não foi informado' }});
            return;
        }

        const nova_conta: IConta = req.body;

        try {
            await this.contaService.criar(nova_conta);
            res.status(201).json({ message: { type: 'Info', description: 'Conta criada com sucesso' }});
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message }});
        }
    }

    // url: /api/conta/listar
    public async listar(req: Request, res: Response) {
        try {
            const contas: ContaModel[] = await this.contaService.listar();
            res.status(200).json({ contas });
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message }});
        }
    }

    // url: /api/conta/buscar?cpf=
    public async buscarPorCPF(req: Request, res: Response) {
        
        
        if (!req.query.cpf) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente' }});
            return;
        }

        const cpf_conta = <string>req.query.cpf;

        try {
            const conta = await this.contaService.buscarPorCpf(cpf_conta);
            if (conta) {
                res.status(200).json(conta);
            } else {
                res.status(204).json({ message: { type: 'Info', description: 'conta não encontrada' }});
            }
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message }});
        }
    }

        // url: /api/conta/buscar?id_agencia=  &&numero=  
        public async buscarPorNumero(req: Request, res: Response) {
        
            if (!req.query.numero || !req.query.id_agencia) {
                res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente' }});
                return;
            }
    
            const numero = <string>req.query.numero;
            const id_agencia = parseInt(<string>req.query.id_agencia);
    
            try {
                const conta = await this.contaService.buscarPorNumero(id_agencia, numero);
                if (conta) {
                    res.status(200).json(conta);
                } else {
                    res.status(204).json({ message: { type: 'Info', description: 'conta não encontrada' }});
                }
            } catch (erro: any) {
                res.status(500).json({ message: { type: 'Erro', description: erro.message }});
            }
        }

    //url: /api/conta/atualizar?id_conta=
    //body: dados da conta
    public async atualizar(req: Request, res: Response) {
        
        //garante que a requisição foi enviada corretamente
        if (req.query.id) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente' }});
            return;
        }
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: { type: 'Erro', description: 'O corpo da requisição está vazio' }});
            return;
        }

        const id = parseInt(<string>req.query.id);
        const conta: IConta = req.body;

        try {
            await this.contaService.atualizar(id, conta);
            res.status(200).json({ message: { type: 'Info', description: 'Conta atualizada com sucesso' }});
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message }});
        }
    }

    //url: /api/conta/excluir?id_conta=
    public async excluir(req: Request, res: Response) {
        
        if (!req.query.id) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente' }});
            return;
        }

        const id = parseInt(<string>req.query.id);

        try {
            await this.contaService.excluir(id);
            res.status(200).json({ message: { type: 'Info', description: 'Conta excluída com sucesso' }});
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message }});
        }
    }
}