const Cohort = require("../entities/cohort.entity");

class CreateCohortUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Cohort);
  }

  async execute(data) {
    const cohort = this.repo.create({
      title: data.title,
      description: data.description,
      vacancies: data.vacancies,
      status: data.status,
      start_date: data.start_date,
      end_date: data.end_date,
      course: { id: data.course_id },
    });

    await this.repo.save(cohort);
    return cohort;
  }
}

module.exports = CreateCohortUseCase;
