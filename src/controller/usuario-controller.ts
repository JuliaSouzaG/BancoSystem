import { Request, Response } from 'express'
import { UsuarioService } from "../services/usuario-service";


export class UsuarioController {
    private usuarioService: UsuarioService;

    constructor() {
        this.usuarioService = new UsuarioService();
    }
    
    public async criar(req: Request, res: Response) {
    
        if (Object.keys(req.body).length===0) {
            res.status(400).json({ message: 'O corpo da requisição está vazio'});
            return;
        }
    
        try {
            await this.usuarioService.criar(req.body);
            res.status(201).json( { message: 'Item criado com sucesso'});
        } catch (erro: any) {
            res.status(500).json({ message: 'Item criado com sucesso'});
        }
    }
    
    
    public async buscar(req: Request, res: Response) {
    
        if (!req.params.id) {
            res.status(400).json({ message: 'Parâmetro de busca não informado'});
            return;
        }
    
        const id = parseInt(req.params.id);
    
        try {
            const usuario = await this.usuarioService.buscar(id);
            res.status(200).json(usuario);
        } catch (erro: any) {
            res.status(500).json(erro.message);
        }
    }
    
    
    public async listar(req: Request, res: Response) {
        try {
            const usuarios = await this.usuarioService.listar();
            res.status(200).json({usuarios});
        } catch (erro: any) {
            res.status(500).json(erro.message);
        }
    }
    
    
    public async alterar(req: Request, res: Response) {
    
        if (!req.params.id) {
            res.status(400).json({message: 'Parâmetro de busca não encontrado'});
            return;
        }
    
        if (Object.keys(req.body).length===0) {
            res.status(400).json({ message: 'O corpo da requisição não foi informado'});
            return;
        }
    
        const id = parseInt(req.params.id);
    
        try {
            await this.usuarioService.alterar(id, req.body);
            res.status(200).json({ message: 'Item alterado com sucesso'});
        } catch (erro: any) {
            res.status(500).json({message: erro.message});
        }
    }
    
    
    public async excluir(req: Request, res: Response) {
    
        if (!req.params.id) {
            res.status(400).json({ message: 'Parametro de busca não informado'});
            return;
        }
    
        const id = parseInt(req.params.id);
    
        try {
            await this.usuarioService.delete(id);
            res.status(200).json({ message: 'Item excluído com sucesso'});
        } catch (erro: any) {
            res.status(500).json({message: erro.message});
        }
    }
    
    
}