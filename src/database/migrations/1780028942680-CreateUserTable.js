const { Table, TableForeignKey } = require("typeorm");

module.exports = class CreateUserTable1780028942680 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "name", type: "varchar", length: "255", isNullable: false },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
            isNullable: false,
          },
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

    await queryRunner.createTable(
      new Table({
        name: "user_cohorts",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "user_id", type: "int", isNullable: false },
          { name: "cohort_id", type: "int", isNullable: false },
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
      "user_cohorts",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    );

    await queryRunner.createForeignKey(
      "user_cohorts",
      new TableForeignKey({
        columnNames: ["cohort_id"],
        referencedTableName: "cohorts",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
      }),
    );
  }

  async down(queryRunner) {
    const table = await queryRunner.getTable("user_cohorts");

    const cohortIdFK = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("cohort_id") !== -1,
    );
    await queryRunner.dropForeignKey("user_cohorts", cohortIdFK);

    const userIdFK = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("user_id") !== -1,
    );
    await queryRunner.dropForeignKey("user_cohorts", userIdFK);

    await queryRunner.dropTable("user_cohorts");
    await queryRunner.dropTable("users");
  }
};
