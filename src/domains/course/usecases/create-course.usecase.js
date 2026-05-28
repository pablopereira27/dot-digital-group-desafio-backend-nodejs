const Course = require("../entities/course.entity");

class CreateCourseUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Course);
  }

  async execute(data) {
    const course = this.repo.create({
      title: data.title,
      description: data.description,
      themes: data.themes,
      image_url: data.image_url,
    });

    await this.repo.save(course);
    return course;
  }
}

module.exports = CreateCourseUseCase;
