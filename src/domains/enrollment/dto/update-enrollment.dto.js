const {
  applyEnrollmentValidators,
} = require("../validators/enrollment.validator");

class UpdateEnrollmentDTO {
  user_id;
  cohort_id;
  status;
}

applyEnrollmentValidators(UpdateEnrollmentDTO, { optional: true });

module.exports = UpdateEnrollmentDTO;
