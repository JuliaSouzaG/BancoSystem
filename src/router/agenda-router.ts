import express, { Router } from "express";
import { AgendaController } from "../controller/agenda-controler";

export class AgendaRouter {
    private agendaController!: AgendaController;
    private router: Router;

    constructor() {
        this.agendaController = new AgendaController();
        this.router = express.Router();

        this.router.post('/criar', (req, res) => {
            this.agendaController.criar(req, res);
        })
    }
}