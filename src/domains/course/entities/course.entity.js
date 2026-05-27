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
    hash: {
      type: "char",
      length: 36,
      unique: true,
      generated:"uuid",
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
    duration_minutes: {
      type: Number,
      nullable: true,
    },
    level: {
      type: "enum",
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
      nullable: false,
    },
    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
      nullable: true,
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
});
