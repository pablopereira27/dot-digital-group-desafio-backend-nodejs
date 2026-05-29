const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Course",
  tableName: "courses",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    title: {
      type: String,
      length: 255,
      nullable: false,
    },
    description: {
      type: "text",
      nullable: false,
    },
    themes: {
      type: "set",
      enum: ["inovação", "tecnologia", "marketing", "empreendedorismo", "agro"],
      isNullable: false,
    },
    image_url: {
      type: "varchar",
      length: 255,
      isNullable: false,
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
    cohorts: {
      type: "one-to-many",
      target: "Cohort",
      inverseSide: "course",
      cascade: true,
    },
  },
});
