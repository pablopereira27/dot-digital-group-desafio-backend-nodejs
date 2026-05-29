const Cohort = require("../entities/cohort.entity");
const { normalizeCohortData } = require("../helpers/normalize-cohort-data.helper");

class CreateCohortUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Cohort);
  }

  async execute(data) {
    const cohortData = normalizeCohortData(data);
    const cohort = this.repo.create(cohortData);
    await this.repo.save(cohort);
    return cohort;
  }
}

module.exports = CreateCohortUseCase;
