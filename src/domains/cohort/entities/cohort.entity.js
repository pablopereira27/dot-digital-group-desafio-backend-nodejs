const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Cohort",
  tableName: "cohorts",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    title: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: false,
    },
    vacancies: {
      type: "int",
      nullable: false,
    },
    status: {
      type: "enum",
      enum: ["disponível", "encerrado"],
      default: "disponível",
    },
    start_date: {
      type: "date",
      nullable: false,
    },
    end_date: {
      type: "date",
      nullable: false,
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
    course: {
      type: "many-to-one",
      target: "Course",
      joinColumn: { name: "course_id" },
      onDelete: "CASCADE",
    },
    enrollments: {
      target: "Enrollment",
      type: "one-to-many",
      inverseSide: "cohort",
    },
  },
});
