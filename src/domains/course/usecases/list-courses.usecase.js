const { AppDataSource } = require("../../../data-source");
const Course = require("../entities/course.entity");

class ListCoursesUseCase {
  async execute() {
    const repo = AppDataSource.getRepository(Course);
    return await repo.find();
  }
}

module.exports = ListCoursesUseCase;
