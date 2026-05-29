const {
  applyEnrollmentValidators,
} = require("../validators/enrollment.validator");

class CreateEnrollmentDTO {
  user_id;
  cohort_id;
  status;
}

applyEnrollmentValidators(CreateEnrollmentDTO);

module.exports = CreateEnrollmentDTO;
