const { applyCohortValidators } = require("../validators/cohort.validator");

class UpdateCohortDTO {
  title;
  description;
  vacancies;
  status;
  start_date;
  end_date;
  course_id;
}

applyCohortValidators(UpdateCohortDTO, { optional: true });

module.exports = UpdateCohortDTO;
