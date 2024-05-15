import { Request, Response } from 'express';
import { BancoService } from "../services/banco-service";

export class BancoController {
    // pega do browser (req) e responde (res) pro service, recebe pedido do insonia e responde
    // tratamento de requisicoes
    private bancoService = new BancoService();

    public async criar(req: Request, res: Response) {
        if (Object.keys(req.body).length < 2) {
            res.status(400).json({ message: 'O corpo da requisição está vazio' });
            return;
        }
        try {
            console.log(req.body);
            await this.bancoService.criar(req.body);
            res.status(201).json({ message: 'Banco criado com sucesso' });
        } catch (erro: any) {
            res.status(500).json({ message: erro.massage });
        }
    }

    public async Listar(req: Request, res: Response) {
        try {
            const bancos = await this.bancoService.listar();
            res.status(200).json({ bancos });
            return { bancos };
        } catch (erro: any) {
            res.status(500).json({ message: erro.message });
        }
    }
    // url: /api/banco/buscar/:id
    public async buscar(req: Request, res: Response) {
        if (!req.params.id) { // se não achar parâmetro 
            res.status(400).json({ message: 'Parâmetro de busca não informado' });
            return
        }

        const pk: number = parseInt(req.params.id); // converter para string

        try {
            const banco = await this.bancoService.buscar(pk);
            if (banco) {
                res.status(200).json({ banco });
            } else {
                res.status(204).json({ message: 'Banco não encontrado ' });
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
            this.bancoService.alterar(pk, req.body)
            res.status(200).json({ message: 'Banco alterado com sucesso' });
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
            this.bancoService.delete(pk)
            res.status(200).json({ message: 'Banco excluído com sucesso' });
        } catch (erro: any){
            res.status(500).json({ message: erro.message });
        }
    }

}
