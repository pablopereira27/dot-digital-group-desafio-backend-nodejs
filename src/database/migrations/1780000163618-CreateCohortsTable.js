const {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} = require("typeorm");

module.exports = class CreateCohortsTable1780000163618 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "cohorts",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "title", type: "varchar", length: "255", isNullable: false },
          { name: "description", type: "text", isNullable: false },
          { name: "vacancies", type: "int", isNullable: false },
          {
            name: "status",
            type: "enum",
            enum: ["disponível", "encerrado"],
            default: "'disponível'",
          },
          { name: "start_date", type: "date", isNullable: false },
          { name: "end_date", type: "date", isNullable: false },
          { name: "course_id", type: "int", isNullable: false },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "cohorts",
      new TableForeignKey({
        columnNames: ["course_id"],
        referencedTableName: "courses",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    );
  }

  async down(queryRunner) {
    const table = await queryRunner.getTable("cohorts");
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("course_id") !== -1,
    );
    await queryRunner.dropForeignKey("cohorts", foreignKey);

    await queryRunner.dropTable("cohorts");
  }
};
