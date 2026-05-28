const { applyCohortValidators } = require("../validations/cohort.validators");

class UpdateCohortDTO {
  title;
  description;
  themes;
  image_url;
}

applyCohortValidators(UpdateCohortDTO, { optional: true });

module.exports = UpdateCohortDTO;
