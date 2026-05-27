const { AppDataSource } = require("../../../data-source");
const Course = require("../entities/course.entity");

class GetCourseUseCase {
  async execute(id) {
    const repo = AppDataSource.getRepository(Course);
    return await repo.findOneBy({ id });
  }
}

module.exports = GetCourseUseCase;
