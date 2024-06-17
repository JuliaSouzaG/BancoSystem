import { Request, Response } from 'express';
import { IATM } from '../interface/atm-interface';
import { ATMService } from '../services/atm-service';

export class ATMController {
    private atmService: ATMService = new ATMService();

    //url: /api/atm/criar
    public async criar(req: Request, res: Response) {
        //testa erros vindos do browser
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: { type: 'Erro', description: 'O corpo da requisição está vazio ou incompleto'}});
            return;
        }

        const new_atm: IATM = req.body;

        //testa erros no servidor
        try {
            await this.atmService.criar(new_atm);
            res.status(201).json({ message: { type: 'info', description: 'ATM criado com sucesso' }});
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    //url: /api/atm/listar
    public async listar(req: Request, res: Response) {
        try {
            const atms = await this.atmService.listar();
            res.status(200).json({atms});
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    // url: /api/atm/buscar?codigo=
    public async buscarPorCodigo(req: Request, res: Response) {
        if (!req.query.codigo) {
            res.status(400).json({ message: { type: 'Erro', description:'Parâmetro de busca ausente' }});
            return;
        }

        const codigo = <string>req.query.codigo;

        //testa erros no servidor
        try {
            const atm = await this.atmService.buscarPorCodigo(codigo);
            if (atm) {
                res.status(200).json(atm);
            } else {
                res.status(204).json({ message: { type: 'info', description:'ATM não encontrado' }});
            }
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    //url: /api/atm/atualizar?id=
    public async atualizar(req: Request, res: Response) {
        //testa erros vindos do browser
        if (!req.query.id) {
            res.status(400).json({ message: { type: 'Erro', description:'URL incorreta: parâmetro de busca ausente' }});
            return;
        }

        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: { type: 'Erro', description:'O corpo da requisição está vazio' }});
            return;
        }

        const id = parseInt(<string>req.query.id);
        const atm: IATM = req.body;

        //testa erros no servidor
        try {
            await this.atmService.atualizar(id, atm);
            res.status(200).json({ message: { type: 'info', description:'ATM atualizado com sucesso' }});
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    //url: /api/atm/excluir?id=
    public async excluir(req: Request, res: Response) {
        //testa erros vindos do browser
        if (!(<string>req.query.id)) {
            res.status(400).json({ message: { type: 'Erro', description:'Parâmetro de busca ausente' }});
            return;
        }

        const id = <string>req.query.id;

        //testa erros vindos do servidor
        try {
            await this.atmService.excluir(parseInt(id));
            res.status(200).json({ message: { type: 'info', description: 'ATM excluído com sucesso' }});
        } catch (erro: any) {
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    //operações bancárias

}