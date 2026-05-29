const CourseResponseDTO = require("./course-response.dto");
const {
  getHATEOSLink,
  getPaginationMeta,
} = require("../../../utils/pagination.util");

class CourseListResponseDTO {
  constructor(courses, { page, limit, total, filters }) {
    this.data = courses.map((course) => new CourseResponseDTO(course));
    this.filters = filters;
    this.pagination = getPaginationMeta(total, page, limit);
    this.links = getHATEOSLink("/courses", { page, limit, total }, filters);
  }
}

module.exports = CourseListResponseDTO;
