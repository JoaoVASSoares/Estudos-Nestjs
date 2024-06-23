import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCoursesTable1716939209885 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "courses",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: `uuid_generate_v4()`, // Usar função para geração automática de UUIDs
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false, // Assegurar que o campo não seja nulo
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true, // Descrição pode ser nula
          },
          {
            name: "created_at",
            type: "timestamp",
            default: `CURRENT_TIMESTAMP`,
            isNullable: false, // Assegurar que o campo não seja nulo
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a tabela "courses"
    await queryRunner.dropTable("courses");
  }
}
