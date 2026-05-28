const Course = require("../entities/course.entity");

class GetCourseUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Course);
  }

  async execute(id) {
    return await this.repo.findOneBy({ id });
  }
}

module.exports = GetCourseUseCase;
