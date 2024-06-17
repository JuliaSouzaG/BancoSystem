import express, { Router } from 'express';
import { ATMController } from '../controller/atm-controller';

export class ATMRouter {
    private _router: Router;
    private _atmController: ATMController;

    constructor() {
        this._router = express.Router();
        this._atmController = new ATMController();

        this._router.post('/criar', (req, res) => {
            this._atmController.criar(req, res);
        });

        this._router.get('/listar', (req, res) => {
            this._atmController.listar(req, res);
        });

        this._router.get('/buscar', (req, res) => {
            this._atmController.buscarPorCodigo(req, res);
        });

        this._router.put('/atualizar', (req, res) => {
            this._atmController.atualizar(req, res);
        });

        this._router.delete('/excluir', (req, res) => {
            this._atmController.excluir(req, res);
        });

    }

    get router(): Router {
        return this._router;
    }
}