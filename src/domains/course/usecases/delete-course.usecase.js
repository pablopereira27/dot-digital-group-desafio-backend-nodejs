const Course = require("../entities/course.entity");

class DeleteCourseUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Course);
  }

  async execute(id) {
    const course = await this.repo.findOneBy({ id });

    if (!course) return null;

    await this.repo.remove(course);
    return true;
  }
}

module.exports = DeleteCourseUseCase;
