const { AppDataSource } = require("../../../data-source");
const Course = require("../entities/course.entity");

class CreateCourseUseCase {
  async execute(data) {
    const repo = AppDataSource.getRepository(Course);

    const course = repo.create({
      title: data.title,
      description: data.description,
      duration_minutes: data.duration_minutes,
      level: data.level,
      price: data.price,
    });

    await repo.save(course);
    return course;
  }
}

module.exports = CreateCourseUseCase;
