const { AppDataSource } = require("../../../data-source");
const Course = require("../entities/course.entity");

class DeleteCourseUseCase {
  async execute(id) {
    const repo = AppDataSource.getRepository(Course);
    const course = await repo.findOneBy({ id });

    if (!course) return null;

    await repo.remove(course);
    return true;
  }
}

module.exports = DeleteCourseUseCase;
