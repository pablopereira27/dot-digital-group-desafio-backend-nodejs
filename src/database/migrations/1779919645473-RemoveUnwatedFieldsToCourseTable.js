const { TableColumn, TableIndex } = require("typeorm");

module.exports = class RemoveUnwatedFieldsToCourseTable1779919645473 {
  async up(queryRunner) {
    await queryRunner.dropIndex("courses", "idx_courses_hash");
    await queryRunner.dropColumn("courses", "hash");
    await queryRunner.dropColumn("courses", "duration_minutes");
    await queryRunner.dropColumn("courses", "price");
    await queryRunner.dropColumn("courses", "level");
  }

  async down(queryRunner) {
    await queryRunner.addColumn(
      "courses",
      new TableColumn({
        name: "duration_minutes",
        type: "int",
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      "courses",
      new TableColumn({
        name: "price",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      "courses",
      new TableColumn({
        name: "level",
        type: "enum",
        enum: ["beginner", "intermediate", "advanced"],
        default: "'beginner'",
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      "courses",
      new TableColumn({
        name: "hash",
        type: "char",
        length: "36",
        isUnique: true,
        isNullable: false,
      }),
    );

    await queryRunner.createIndex(
      "courses",
      new TableIndex({
        name: "idx_courses_hash",
        columnNames: ["hash"],
        isUnique: true,
      }),
    );
  }
};
