const Enrollment = require("../entities/enrollment.entity");

class CreateEnrollmentUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Enrollment);
  }

  async execute(data) {
    const enrollment = this.repo.create({
      user: { id: data.user_id },
      cohort: { id: data.cohort_id },
      status: data.status || 'ativo',
    });

    await this.repo.save(enrollment);
    return enrollment;
  }
}

module.exports = CreateEnrollmentUseCase;
