import { DateTime } from 'luxon'
import { BaseModel,column , hasOne, HasOne, hasMany, HasMany, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Perfil from 'App/Models/Perfil'
import Publicacione from 'App/Models/Publicacione'
import Grupo from 'App/Models/Grupo'

export default class Usuario extends BaseModel {
  @column({ isPrimary: true })
  public codigo_usuario: number

  @column() 
  public nombre_usuario: string

  @column()
  public contrasena: string

  @column()
  public email: string

  @column()
  public telefono: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /*Relacion 1:1 con Perfil */
  @hasOne(()=> Perfil,{
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario',
  })
  public perfil: HasOne<typeof Perfil>

  /*Relacion 1:n con Perfil */
  @hasMany(()=> Publicacione,{
    localKey: 'codigo_usuario',
    foreignKey: 'codigo_usuario',
  })
  public publicaciones: HasMany<typeof Publicacione>
  /*Relacion 1:n con Perfil */
  @manyToMany(()=> Grupo,{
    localKey: 'codigo_usuario',
    pivotForeignKey: 'codigo_usuario',
    relatedKey: 'codigo_grupo',
    pivotRelatedForeignKey:'codigo_grupo',
    pivotTable:'usuario_grupos',
  })
  public usuario_grupos: ManyToMany<typeof Grupo>


}
