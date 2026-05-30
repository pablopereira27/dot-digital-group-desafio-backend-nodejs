const { CohortStatus } = require("../../src/domains/cohort/enums/status.enum");

let start_date = new Date();
start_date.setDate(start_date.getDate() - 10);

let end_date = new Date();
end_date.setDate(start_date.getDate() + 30);

const cohortData = {
  title: `Turma de JavaScript ${start_date.getFullYear()}-${start_date.getMonth() + 1}`,
  description: "Turma de testes",
  vacancies: 10,
  status: CohortStatus.DISPONÍVEL,
  start_date: start_date.toISOString().split("T")[0],
  end_date: end_date.toISOString().split("T")[0],
};

module.exports = { cohortData };
