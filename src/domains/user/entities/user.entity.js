const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 255,
      unique: true,
      nullable: false,
    },
  },
  relations: {
    enrollments: {
      target: "Enrollment",
      type: "one-to-many",
      inverseSide: "user",
    },
  },
});
