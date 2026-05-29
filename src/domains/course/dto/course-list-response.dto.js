const CourseResponseDTO = require("./course-response.dto");
const { getPaginationMeta } = require("../../../utils/pagination.util");
const { buildHateoasLinks } = require("../../../utils/hateoas.util");

class CourseListResponseDTO {
  constructor(courses, { page, limit, total, filters }) {
    this.data = courses.map((course) => new CourseResponseDTO(course));
    this.filters = filters;
    this.pagination = getPaginationMeta(total, page, limit);
    this.links = buildHateoasLinks(
      "/courses",
      { pagination: { page, limit, total }, filters },
      ["list", "create", "pagination"],
    );
  }
}

module.exports = CourseListResponseDTO;
