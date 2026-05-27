const { TableColumn } = require("typeorm");

module.exports = class AddMissingFieldsToCourseTable1779919390221 {
  async up(queryRunner) {
    await queryRunner.addColumn(
      "courses",
      new TableColumn({
        name: "image_url",
        type: "varchar",
        length: "255",
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      "courses",
      new TableColumn({
        name: "themes",
        type: "set ('inovação', 'tecnologia', 'marketing', 'empreendedorismo', 'agro')",
        isNullable: false,
      }),
    );

    await queryRunner.changeColumn(
      "courses",
      "description",
      new TableColumn({
        name: "description",
        type: "text",
        isNullable: false,
      }),
    );
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("courses", "image_url");
    await queryRunner.dropColumn("courses", "themes");

     await queryRunner.changeColumn(
      "courses",
      "description",
      new TableColumn({
        name: "description",
        type: "text",
        isNullable: true,
      }),
    );
  }
};
