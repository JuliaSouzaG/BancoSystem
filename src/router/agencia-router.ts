import express, { Router } from 'express';
import { AgenciaController } from '../controller/agencia-controller';

const agenciaRouter: Router = express.Router();

export class AgenciaRouter {
    private _router: Router;
    private _agenciaController: AgenciaController;

    constructor() {
        this._router = express.Router();
        this._agenciaController = new AgenciaController();

        this._router.post('/criar', (req, res) => {
            this._agenciaController.criar(req, res);
        });

        this._router.get('/listar', (req, res) => {
            this._agenciaController.listar(req, res);
        });

        this._router.get('/buscar', (req, res) => {
            this._agenciaController.buscarPorId(req, res);
        });

        this._router.put('/atualizar', (req, res) => {
            this._agenciaController.atualizar(req, res);
        });

        this._router.delete('/excluir', (req, res) => {
            this._agenciaController.excluir(req, res);
        });
    }

    get router(): Router {
        return this._router;
    }
}