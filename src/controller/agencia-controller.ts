import { Request, Response } from 'express';
import { IAgencia } from '../interface/agencia-interface';
import { AgenciaService } from '../services/agencia-service';

export class AgenciaController {
    private agenciaService: AgenciaService = new AgenciaService();

    //url: /api/agencia/criar
    public async criar(req: Request, res: Response) {
        //garante que o corpo da requisição foi enviado antes de continuar
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: { type: 'Erro', description: 'O corpo da requisição está vazio ou incompleto'}});
            return;
        }

        const new_agencia = req.body;

        //tenta incluir uma nova conta
        try {
            await this.agenciaService.incluir(new_agencia);
            res.status(201).json({ message: { type: 'info', description: 'Agencia criada com sucesso' }});
        } catch (erro: any) {
            console.log(erro.message);
            res.status(500).json({ message: { type: 'Erro', description: erro.message}}); //erro do lado do servidor
        }
    }

    //url: /api/agencia/listar
    public async listar(req: Request, res: Response) {
        try {
            const agencias = await this.agenciaService.listar();
            res.status(200).json({agencias});
        } catch (erro: any) {
            console.log(erro.message);
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    //url: /api/agencia/buscar?id_banco=  &&numero=
    public async buscarPorNumero(req: Request, res: Response) {
        //garante que a requisição
        if (!(<string>req.query.numero) || !req.query.id_banco) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente'}});
            return;
        }

        const numero = <string>req.query.numero;
        const id_banco = parseInt(<string>req.query.id_banco);

        //trata erros vindos do servidor
        try {
            const agencia = await this.agenciaService.buscarPorNumero(id_banco, numero);
            if (agencia) {
                res.status(200).json(agencia);
            } else {
                res.status(204).json({ message: { type: 'info', description: 'Agência não encontrada' }});
            }
        } catch (erro: any) {
            console.log(erro.message);
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    //url: /api/agencia/buscar?id_agencia=
    public async buscarPorId(req: Request, res: Response) {
        if (!req.query.id) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente'}});
            return;
        }

        const id = parseInt(<string>req.query.id);

        //trata erros vindos do servidor
        try {
            const agencia = await this.agenciaService.buscarPorId(id);
            if (agencia) {
                res.status(200).json(agencia);
            } else {
                res.status(204).json({ message: { type: 'info', description: 'Agência não encontrada' }});
            }
        } catch (erro: any) {
            console.log(erro.message);
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    //url: /api/agencia/atualizar?id=
    public async atualizar(req: Request, res: Response) {
        //garante que a requisição esteja correta
        if (!req.query.id) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente'}});
            return;
        }
        if (Object.keys(req.body).length === 0) {
            res.status(400).json({ message: { type: 'Erro', description: 'O corpo da requisição está vazio ou incompleto'}});
            return;
        }

        const id = parseInt(<string>req.query.id);
        const agencia: IAgencia = req.body;

        //trata os erros no servidor
        try {
            await this.agenciaService.atualizar(id, agencia);
            res.status(200).json({message: { type: 'info', description: 'Agência atualizada com sucesso'}});
        } catch (erro: any) {
            console.log(erro.message);
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }

    //url: /api/agencia/excluir?id=
    public async excluir(req: Request, res: Response) {
        //garante que a requisição esteja correta
        if (!req.query.id) {
            res.status(400).json({ message: { type: 'Erro', description: 'Parâmetro de busca ausente'}});
            return;
        }

        const id = parseInt(<string>req.query.id);

        //trata erros no servidor
        try {
            await this.agenciaService.excluir(id);
            res.status(200).json({message: { type: 'info', description: 'Agência excluída com sucesso'}});
        } catch (erro: any) {
            console.log(erro.message);
            res.status(500).json({ message: { type: 'Erro', description: erro.message}});
        }
    }
}