const EnrollmentResponseDTO = require("./enrollment-response.dto");
const { getPaginationMeta } = require("../../../utils/pagination.util");
const { buildHateoasLinks } = require("../../../utils/hateoas.util");

class UserEnrollmentListResponseDTO {
  constructor(enrollments) {
    this.data = enrollments.map(
      (enrollment) => new EnrollmentResponseDTO(enrollment),
    );
    // this.filters = filters;
    // this.pagination = getPaginationMeta(total, page, limit);
    // this.links = buildHateoasLinks(
    //   "/enrollments",
    //   { pagination: { page, limit, total }, filters },
    //   ["list", "create", "pagination"],
    // );
  }
}

module.exports = UserEnrollmentListResponseDTO;
