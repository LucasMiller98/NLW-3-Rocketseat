import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1603937044995 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment', // Aumenta o id autometicamente
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10, // numeros depois da ','
          precision: 2, // num antes da virgula 
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10, // numeros depois da ','
          precision: 2, // num antes da virgula 
        },
        {
          name: 'about', 
          type: 'text',
        },
        {
          name: 'instructions', 
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends', 
          type: 'boolean',
          default: false,
        },
      ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages')
  }
}
