const { TableColumn, TableIndex } = require("typeorm");

module.exports = class AddHashToCourseTable1779911004019 {
  async up(queryRunner) {
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

  async down(queryRunner) {
    await queryRunner.dropIndex("courses", "idx_courses_hash");
    await queryRunner.dropColumn("courses", "hash");
  }
};
