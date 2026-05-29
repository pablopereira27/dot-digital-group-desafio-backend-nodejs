const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Enrollment",
  tableName: "enrollments",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    status: {
      type: "enum",
      enum: ["ativo", "trancado", "abandonado", "concluído"],
      default: "ativo",
    },
    created_at: {
      type: "timestamp",
      createDate: true,
    },
    updated_at: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      inverseSide: "enrollments",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
    },
    cohort: {
      target: "Cohort",
      type: "many-to-one",
      inverseSide: "enrollments",
      joinColumn: { name: "cohort_id" },
      onDelete: "CASCADE",
    },
  },
});
