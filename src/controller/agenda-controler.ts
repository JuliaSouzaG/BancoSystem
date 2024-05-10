import { AgendaService } from "../services/agenda-service";
import { Request, Response } from "express";

export class AgendaController {
    private agendaService: AgendaService;

    constructor() {
        this.agendaService = new AgendaService();
    }
    public async criar(req: Request, res: Response){ // comunicação com o http
        if (Object.keys(req.body).length === 0) { // caso o body esteja vazio
            res.status(400).json({ message: "O corpo está vazio "}); // responde o a menssagem
        }
        try { // api é o conjunto de funções que uma classe disponibiliza
            await this.agendaService.criar(req.body) // criar(busca o body[campos que a pessoa inseriu]) req.body busca o corpo da equisição
            res.status(201).json({message: 'Item criado com sucesso'});
        } catch (erro: any) {
            res.status(500).json({message: erro.message});
        }
    }   
}