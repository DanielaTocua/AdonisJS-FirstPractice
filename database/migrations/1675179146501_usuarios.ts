import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('codigo_usuario').primary().unsigned() /* codigo_usuario PK*/
      table.string('nombre_usuario',100).notNullable()
      table.string('contrasena',100).notNullable()
      table.string('email',100).notNullable()
      table.string('telefono',15).notNullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
