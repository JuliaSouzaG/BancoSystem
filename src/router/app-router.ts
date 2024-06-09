import { AgenciaRouter } from "./agencia-router";
import { BancoRouter } from "./banco-router";
import { ContaRouter } from "./conta-router";
import { AtmRouter } from "./atm-router";

export class AppRouter {
    private app_express: any;

    private bancoRouter: BancoRouter;
    private agenciaRouter: AgenciaRouter;
    private contaRouter: ContaRouter;
    private atmRouter: AtmRouter;

    constructor(app_server: any) {
        this.app_express = app_server;

        //criar as rotas, instancio o banco
        this.bancoRouter = new BancoRouter();
        this.agenciaRouter = new AgenciaRouter();
        this.contaRouter = new ContaRouter();
        this.atmRouter = new AtmRouter();
    }

    public carregarRotas() {
        // pegar a aplicação do servidor, e dizer pra ela "Acrescenta essa rota no servidor web"
        this.app_express.use('/api/banco', this.bancoRouter.router);
        this.app_express.use('/api/agencia', this.agenciaRouter.router);
        this.app_express.use('/api/atm', this.atmRouter.router);
    }
} // serve para instanciar (criar) o rotedor de cada classe
// só é mexido quando se cria outra classe: atm, conta etc.
// banco-service/controller/router: serão modificados quando criar crud de cada classe
