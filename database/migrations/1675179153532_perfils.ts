import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'perfils'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
    table.integer('codigo_perfil').primary().unsigned()
    table.string('nombre_perfil',100).notNullable()
    table.date('fecha_creacion').notNullable()
    table.integer('codigo_usuario').unsigned().unique().index('codigo_usuario')
    table.foreign('codigo_usuario').references('usuarios.codigo_usuario').onDelete('cascade')
    table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
