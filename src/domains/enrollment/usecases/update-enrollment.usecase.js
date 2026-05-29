const Enrollment = require("../entities/enrollment.entity");

class UpdateEnrollmentUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Enrollment);
  }

  async execute(id, data) {
    const enrollment = await this.repo.findOneBy({ id });

    if (!enrollment) return null;

    this.repo.merge(enrollment, data);
    return await this.repo.save(enrollment);
  }
}

module.exports = UpdateEnrollmentUseCase;
