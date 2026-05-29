const CohortResponseDTO = require("./cohort-response.dto");
const { getPaginationMeta } = require("../../../utils/pagination.util");
const { buildHateoasLinks } = require("../../../utils/hateoas.util");

class CohortListResponseDTO {
  constructor(cohorts, { page, limit, total, filters }) {
    this.data = cohorts.map((cohort) => new CohortResponseDTO(cohort));
    this.filters = filters;
    this.pagination = getPaginationMeta(total, page, limit);
    this.links = buildHateoasLinks("/cohorts", { pagination: { page, limit, total }, filters }, ["list", "create", "pagination"]);
  }
}

module.exports = CohortListResponseDTO;
