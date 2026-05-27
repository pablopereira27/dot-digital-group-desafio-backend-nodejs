const { AppDataSource } = require("../../../data-source");
const Course = require("../entities/course.entity");

class GetCourseUseCase {
  async execute(hash) {
    const repo = AppDataSource.getRepository(Course);
    return await repo.findOneBy({ hash });
  }
}

module.exports = GetCourseUseCase;
