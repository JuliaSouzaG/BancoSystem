import express, { Router } from 'express';
import { ContaController } from '../controller/conta-controller';

export class ContaRouter {
    private _router: Router;
    private _contaController: ContaController;

    constructor() {
        this._router = express.Router();
        this._contaController = new ContaController();

        this._router.post('/criar/', (req, res) => {
            this._contaController.criar(req, res);
        });

        this._router.get('/listar', (req, res) => {
            this._contaController.listar(req, res);
        });

        this._router.get('/buscar', (req, res) => {
            this._contaController.buscarPorNumero(req, res);
        });

        this._router.put('/atualizar', (req, res) => {
            this._contaController.atualizar(req, res);
        });

        this._router.put('/excluir', (req, res) => {
            this._contaController.excluir(req, res);
        });
    }

    get router() {
        return this._router;
    }
}