import { Request, Response } from 'express';
import { AtmService } from '../services/atm-service';

export class AtmController {

    private atmService = new AtmService

    public async criar(req: Request, res: Response) {
        if (Object.keys(req.body).length < 2) {
            res.status(400).json({ message: 'O corpo da requisição está vazio' });
            return;
        }
        try {
            console.log(req.body);
            await this.atmService.criar(req.body);
            res.status(201).json({ message: 'Banco criado com sucesso' });
        } catch (erro: any) {
            res.status(500).json({ message: erro.massage });
        }
    }

}