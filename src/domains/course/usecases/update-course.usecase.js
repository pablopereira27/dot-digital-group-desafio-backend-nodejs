const { AppDataSource } = require("../../../data-source");
const Course = require("../entities/course.entity");

class UpdateCourseUseCase {
  async execute(hash, data) {
    const repo = AppDataSource.getRepository(Course);
    const course = await repo.findOneBy({ hash });

    if (!course) return null;

    repo.merge(course, data);
    return await repo.save(course);
  }
}

module.exports = UpdateCourseUseCase;
