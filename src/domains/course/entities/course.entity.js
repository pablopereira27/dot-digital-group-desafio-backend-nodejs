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
      nullable: true,
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
