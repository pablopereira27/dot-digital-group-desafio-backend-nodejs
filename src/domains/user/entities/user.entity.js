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
    cohorts: {
      target: "Cohort",
      type: "many-to-many",
      joinTable: {
        name: "user_cohorts",
        joinColumn: {
          name: "user_id",
          referencedColumnName: "id",
        },
        inverseJoinColumn: {
          name: "cohort_id",
          referencedColumnName: "id",
        },
      },
    },
  },
});
