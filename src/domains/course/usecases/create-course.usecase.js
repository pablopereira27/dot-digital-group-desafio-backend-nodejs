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
      themes: data.themes,
      image_url: data.image_url,
    });

    await repo.save(course);
    return course;
  }
}

module.exports = CreateCourseUseCase;
