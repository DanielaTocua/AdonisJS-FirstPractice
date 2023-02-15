import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
export default class UsuariosController {
    public async getListarUsuarios(): Promise<Usuario[]> {
        const user = await Usuario.all()
        return user;
    }
    public async getListarUsuariosYPerfil(): Promise<Usuario[]>{
        const user = await Usuario.query().preload('perfil')
        return user;
    }
    public async getListarUsuariosYPublicacion(): Promise<Usuario[]>{
        const user = await Usuario.query().preload('publicaciones')
        return user
    }
    public async getListarUsuariosGrupos(): Promise<Usuario[]>{
        const user = await Usuario.query().preload('usuario_grupos')
        return user;
    }
     public async setRegistrarUsuarios({request,response}:HttpContextContract){
        const dataUsuario = request.only([
            'codigo_usuario','nombre_usuario','contrasena','email','telefono'
        ])
        try{
            const codigoUsuario = dataUsuario.codigo_usuario;
            const usuarioExistente: Number = await this.getValidarUsuarioExistente(codigoUsuario)
            if (usuarioExistente === 0){
                await Usuario.create(dataUsuario)
                response.status(200).json({"msg":"Registro completado con exito"})
            }else{
                response.status(400).json({"msg":"Error, el codigo usuario ya se encuentra registrado"})
            }
        } catch (e) {
            console.log(e)
            
            response.status(500).json({"msg":"Error en el servidor"})
        }
     }

     private async getValidarUsuarioExistente(codigo_usuario: Number): Promise<Number> {
        const total = await Usuario.query().where({"codigo_usuario":codigo_usuario}).count('*').from('usuarios')
        return parseInt(total[0].count)
     }


     public async buscarPorId({request}: HttpContextContract){
        const id = request.param('id');
        const user = await Usuario.find(id);
        return user;
     }

     public async actualizarUsuario({request}: HttpContextContract){
        const id = request.param('id');
        const user = await Usuario.findOrFail(id)
        const data = request.all();
        user.nombre_usuario = data.nombre
        user.contrasena = data.contrasena
        user.email = data.email
        user.telefono = data.telefono
        await user.save()
        return {"msg": "Actualizado correctamente", "status": 200}
     }

     public async eliminarUsuario({request}:HttpContextContract){
        const id = request.param('id');
        await (await Usuario.findOrFail(id)).delete()
        return {"msg": "Eliminado correctamente", "status": 200}
     }

}