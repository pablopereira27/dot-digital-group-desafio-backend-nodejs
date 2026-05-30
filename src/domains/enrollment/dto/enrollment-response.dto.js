const e = require("express");
const { buildHateoasLinks } = require("../../../utils/hateoas.util");

class EnrollmentResponseDTO {
  constructor(enrollment) {
    Object.assign(this, {
      id: enrollment.id,
      user_id: enrollment.user_id,
      user: enrollment.user,
      cohort_id: enrollment.cohort_id,
      cohort: enrollment.cohort,
      status: enrollment.status,
      created_at: enrollment.created_at,
      updated_at: enrollment.updated_at,
    });

    this.links = buildHateoasLinks("/enrollments", { id: enrollment.id }, [ "self", "update", "delete" ]);
  }
}
module.exports = EnrollmentResponseDTO;
