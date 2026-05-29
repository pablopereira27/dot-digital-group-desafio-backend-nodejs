const CohortResponseDTO = require("./cohort-response.dto");
const {
  getHATEOSLink,
  getPaginationMeta,
} = require("../../../utils/pagination.util");

class CohortListResponseDTO {
  constructor(cohorts, { page, limit, total, filters }) {
    this.data = cohorts.map((cohort) => new CohortResponseDTO(cohort));
    this.filters = filters;
    this.pagination = getPaginationMeta(total, page, limit);
    this.links = getHATEOSLink("/cohorts", { page, limit, total }, filters);
  }
}

module.exports = CohortListResponseDTO;
