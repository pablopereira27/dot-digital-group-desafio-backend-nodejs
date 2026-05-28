const Cohort = require("../entities/cohort.entity");

class DeleteCohortUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Cohort);
  }

  async execute(id) {
    const cohort = await this.repo.findOneBy({ id });

    if (!cohort) return null;

    await this.repo.remove(cohort);
    return true;
  }
}

module.exports = DeleteCohortUseCase;
