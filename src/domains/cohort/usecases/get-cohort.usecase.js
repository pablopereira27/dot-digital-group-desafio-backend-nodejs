const Cohort = require("../entities/cohort.entity");

class GetCohortUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Cohort);
  }

  async execute(id) {
    return await this.repo.findOneBy({ id });
  }
}

module.exports = GetCohortUseCase;
