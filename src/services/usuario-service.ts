import { IUsuario } from './../interface/usuario-interface';
import { UsuarioModel } from "../model/usuario-model";

export class UsuarioService {
    constructor(){}


    public async criar(novo_item: IUsuario) {
        try {
            await UsuarioModel.create({
                nome: novo_item.nome,
                login: novo_item.login,
                password: novo_item.password
            });
        } catch (erro: any) {
            throw new Error("Erro ao tentar incluir um novo usuario [" + erro.message + "]")
        }
    }

    public async listar() {
        try {
            const usuarios: UsuarioModel[]  =   await UsuarioModel.findAll();
            return usuarios;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    public async buscar(id: number): Promise<UsuarioModel> {
        try {
            const usuario = <UsuarioModel> await UsuarioModel.findByPk(id);
            return usuario;
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    public async alterar(id: number, item: IUsuario ) {
        try {
            const usuario : UsuarioModel = await this.buscar(id);
            if (usuario) {
                usuario.nome = item.nome;
                usuario.login = item.login;
                usuario.password = item.password;
                usuario.save();
            } else {
                throw new Error('Usuário não encontrado');
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }

    public async delete(id: number) {
        try {
            const usuario : UsuarioModel = await this.buscar(id);
            if (usuario) {
                usuario.destroy();
            } else {
                throw new Error('Usuário não encontrado');
            }
        } catch (erro: any) {
            throw new Error(erro.message);
        }
    }


}