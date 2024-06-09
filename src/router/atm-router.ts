import { AtmController } from "../controller/atm-controller";
import express, { Router } from "express";
        // define as rotas
export class AtmRouter {
    private _router!: Router;
    private _atmController!: AtmController;

    constructor() {
        this._router = express.Router();
        this._atmController = new AtmController();

        //url: /api/atm/criar
        //body obrigatório
        this._router.post('/criar', (req, res) => {
            this._atmController.criar(req, res);
        });
        //url: /api/atm/listar
        this._router.get('/listar', (req, res) => {
            this._atmController.listar(req, res);
        });
        //url: /api/atm/buscar
        this._router.get('/buscar/:id', (req, res) => {
            this._atmController.buscar(req, res);
        });
        // url: /api/atm/alterar?id=<valor>
        this._router.put('/alterar', (req, res) => {
            this._atmController.alterar(req, res);
        })
        // url: /api/atm/delete/:id
        this._router.delete('/delete/:id', (req, res) => {
            this._atmController.delete(req, res);
        })
    }
     get router(): Router {
        return this._router;
    }
}
