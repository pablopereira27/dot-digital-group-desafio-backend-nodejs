const { TableColumn } = require("typeorm");

module.exports = class RenameUserCohortsToEnrollments1780090187723 {
  async up(queryRunner) {
    await queryRunner.renameTable("user_cohorts", "enrollments");

    await queryRunner.addColumn(
      "enrollments",
      new TableColumn({
        name: "status",
        type: "enum",
        enum: ["ativo", "trancado", "abandonado", "concluído"],
        default: "'ativo'",
        isNullable: false,
      }),
    );
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("enrollments", "status");
    await queryRunner.renameTable("enrollments", "user_cohorts");
  }
};
