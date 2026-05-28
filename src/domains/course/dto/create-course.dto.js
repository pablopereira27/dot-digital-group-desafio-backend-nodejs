const { applyCourseValidators } = require("../validations/course.validators");

class CreateCourseDTO {
  title;
  description;
  themes;
  image_url;
}

applyCourseValidators(CreateCourseDTO);

module.exports = CreateCourseDTO;
