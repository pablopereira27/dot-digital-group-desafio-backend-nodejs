const { applyCourseValidators } = require("../validations/course.validators");

class UpdateCourseDTO {
  title;
  description;
  themes;
  image_url;
}

applyCourseValidators(UpdateCourseDTO, { optional: true });

module.exports = UpdateCourseDTO;
