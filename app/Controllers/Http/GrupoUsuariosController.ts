import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Grupo from 'App/Models/Grupo'
import Usuario from 'App/Models/Usuario'
import UsuarioGrupo from 'App/Models/UsuarioGrupo'
export default class GrupoUsuariosController {
    public async setRegistrarUsuarioGrupo({request,response}:HttpContextContract){
        try{
            const dataGrupoUsuario = request.only(['codigo_usuario','codigo_grupo','fecha_inicio'])
            const codigoUsuario = dataGrupoUsuario.codigo_usuario
            const codigoGrupo = dataGrupoUsuario.codigo_grupo
            const datosExistentes: Number = await this.getValidarDatosGrupoYUsuario(codigoGrupo,codigoUsuario)
            switch (datosExistentes){
                case 0:
                    await UsuarioGrupo.create(dataGrupoUsuario)
                    response.status(200).json({"msg": "Registro del usuario en grupo completo"})
                    break;
                case 1:
                    response.status(400).json({"msg":"El codigo del usuario no se encuentra registrado"})
                    break;
                case 2:
                    response.status(400).json({"msg":"El codigo del grupo no se encuentra registrado"})
            }
        } catch (error) {
            console.log(error)
            response.status(500).json({"msg":"Error en el servidor!!"})
        }

    }

    private async getValidarDatosGrupoYUsuario(codigo_grupo:Number, codigo_usuario:Number): Promise<Number>{
        let total = await Grupo.query().where({"codigo_grupo":codigo_grupo}).count('*').from('grupos')
        let cantidadDatos = parseInt(total[0]["$extras"]["count[(*)]"])
        if (cantidadDatos !== 0){
            let total = await Usuario.query().where({"codigo_usuario":codigo_usuario}).count('*').from('usuarios')
            cantidadDatos = parseInt(total[0]["$extras"]["count[(*)]"])
            if (cantidadDatos !== 0){
                return 0;
            } else {
                return 2; /* si el metodo retorna un 2, significa que el codigo de usuario no existe*/ 
            }
        }   else {
            return 1; 
        }


    }
}
