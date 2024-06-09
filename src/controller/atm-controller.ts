import { Request, Response } from 'express';
import { AtmService } from '../services/atm-service';

export class AtmController {

    private atmService = new AtmService();

    public async criar(req: Request, res: Response) {
        if (Object.keys(req.body).length < 2) {
            res.status(400).json({ message: 'O corpo da requisição está vazio' });
            return;
        }
        try {
            console.log(req.body);
            await this.atmService.criar(req.body);
            res.status(201).json({ message: 'ATM criada com sucesso' });
        } catch (erro: any) {
            res.status(500).json({ message: erro.massage });
        }
    }
    public async listar(req: Request, res: Response) {
        try {
            const bancos = await this.atmService.listar();
            res.status(200).json({ bancos });
            return { bancos };
        } catch (erro: any) {
            res.status(500).json({ message: erro.message });
        }
    }
    public async buscar(req: Request, res: Response) {
        
        if (!req.params.id) { // se não achar parâmetro 
            res.status(400).json({ message: 'Parâmetro de busca não informado' });
            return
        }

        const pk: number = parseInt(req.params.id); // converter para string

        try {
            const atm = await this.atmService.buscar(pk);
            if (atm) {
                res.status(200).json({ atm });
            } else {
                res.status(204).json({ message: 'ATM não encontrada' });
            }

        } catch (erro: any) {
            res.status(500).json({ message: erro.message });
        }
    }
    public async alterar(req: Request, res: Response) {

        if (!req.query.id){ // verifica se tem parâmetro na url
            res.status(400).json({ message: 'Parâmetro de busca não encontrado' });
            return
        }
        if (Object.keys(req.body).length === 0) { // tras o que é pra ser alterado
            res.status(400).json({ message: 'O corpo da requisição está vazio' });
            return
        }
        const pk: number = parseInt(<string>req.query.id);
        
        try {
            this.atmService.alterar(pk, req.body)
            res.status(200).json({ message: 'ATM alterado com sucesso' });
        } catch (erro: any){
            res.status(500).json({ message: erro.message });
        }
    }
    public async delete(req: Request, res: Response) {

        if (!req.params.id){ // verifica se tem parâmetro na url
            res.status(400).json({ message: 'Parâmetro de busca não encontrado' });
            return
        }

        const pk: number = parseInt(<string>req.params.id);
        
        try {
            this.atmService.delete(pk)
            res.status(200).json({ message: 'Atm excluído com sucesso' });
        } catch (erro: any){
            res.status(500).json({ message: erro.message });
        }
    }


}