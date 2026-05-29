const { applyCourseValidators } = require("../validators/course.validator");

class UpdateCourseDTO {
  title;
  description;
  themes;
  image_url;
}

applyCourseValidators(UpdateCourseDTO, { optional: true });

module.exports = UpdateCourseDTO;
