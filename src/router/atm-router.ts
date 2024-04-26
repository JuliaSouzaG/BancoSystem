import { AtmController } from "../controller/atm-controller";
import express, { Router } from "express";

export class AtmRouter {
    router(arg0: string, router: any) {
        throw new Error("Method not implemented.");
    }
    private _router!: Router;
    private _atmController!: AtmController;

    constructor() {
        this._router = express.Router();
        this._atmController = new AtmController();

        //url: /api/banco/criar
        //body obrigatório
        this._router.post('/criar', (req, res) => {
            this._atmController.criar(req, res);
        })
    }

}
