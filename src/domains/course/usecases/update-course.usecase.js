const Course = require("../entities/course.entity");

class UpdateCourseUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Course);
  }

  async execute(id, data) {
    const course = await this.repo.findOneBy({ id });

    if (!course) return null;

    this.repo.merge(course, data);
    return await this.repo.save(course);
  }
}

module.exports = UpdateCourseUseCase;
