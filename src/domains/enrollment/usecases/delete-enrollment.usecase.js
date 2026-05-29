const Enrollment = require("../entities/enrollment.entity");

class DeleteEnrollmentUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Enrollment);
  }

  async execute(id) {
    const enrollment = await this.repo.findOneBy({ id });

    if (!enrollment) return null;

    await this.repo.remove(enrollment);
    return true;
  }
}

module.exports = DeleteEnrollmentUseCase;
