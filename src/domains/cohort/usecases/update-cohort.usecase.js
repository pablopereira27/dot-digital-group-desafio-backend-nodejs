const Cohort = require("../entities/cohort.entity");
const { normalizeCohortData } = require("../helpers/normalize-cohort-data.helper");

class UpdateCohortUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Cohort);
  }

  async execute(id, data) {
    const cohort = await this.repo.findOneBy({ id });
    if (!cohort) return null;

    const cohortData = normalizeCohortData(data);
    this.repo.merge(cohort, cohortData);
    return await this.repo.save(cohort);
  }
}

module.exports = UpdateCohortUseCase;
