const { applyCourseValidators } = require("../validators/course.validator");

class CreateCourseDTO {
  title;
  description;
  themes;
  image_url;
}

applyCourseValidators(CreateCourseDTO);

module.exports = CreateCourseDTO;
