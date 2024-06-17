import express, { Router } from 'express';
import { UsuarioController } from '../controller/usuario-controller';


export class UsuarioRouter {
    public readonly router!: Router;
    private usuarioController: UsuarioController;

    constructor() {

        this.router = express.Router();
        this.usuarioController = new UsuarioController();

        this.router.post('/criar', (req, res) => {
            this.usuarioController.criar(req, res);
        });

        this.router.get('/buscar', (req, res) => {
            this.usuarioController.buscar(req, res);
        });

        this.router.get('/listar', (req, res) => {
            this.usuarioController.listar(req, res);
        });


        this.router.put('/alterar/:id', (req, res) => {
            this.usuarioController.alterar(req, res);
        });

        this.router.delete('/excluir/:id', (req, res) => {
            this.usuarioController.excluir(req, res);
        });
    }
}