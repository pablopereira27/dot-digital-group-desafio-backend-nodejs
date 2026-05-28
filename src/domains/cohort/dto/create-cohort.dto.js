const { applyCohortValidators } = require("../validations/cohort.validators");

class CreateCohortDTO {
  title;
  description;
  vacancies;
  status;
  start_date;
  end_date;
  course_id;
}

applyCohortValidators(CreateCohortDTO);

module.exports = CreateCohortDTO;
