const Cohort = require("../entities/cohort.entity");

class UpdateCohortUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Cohort);
  }

  async execute(id, data) {
    const cohort = await this.repo.findOneBy({ id });

    if (!cohort) return null;

    this.repo.merge(cohort, data);
    return await this.repo.save(cohort);
  }
}

module.exports = UpdateCohortUseCase;
