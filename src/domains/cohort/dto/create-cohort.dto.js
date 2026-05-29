const { applyCohortValidators } = require("../validators/cohort.validator");

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
