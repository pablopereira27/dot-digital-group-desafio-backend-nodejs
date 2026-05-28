const { Brackets } = require("typeorm");

const { AppDataSource } = require("../../../data-source");
const Course = require("../entities/course.entity");

class ListCoursesUseCase {
  async execute(page = 1, limit = 10, filters = {}) {
    const repo = AppDataSource.getRepository(Course);
    const qb = repo.createQueryBuilder("course");

    if (filters.title) {
      qb.andWhere("course.title LIKE :title", {
        title: `%${filters.title}%`,
      });
    }

    if (filters.themes && Object.entries(filters.themes).length > 0) {
      const themes = Array.isArray(filters.themes)
        ? filters.themes
        : [filters.themes];

      qb.andWhere(
        new Brackets((qb) => {
          themes.map((_, i) => {
            const query = `FIND_IN_SET(:theme${i}, course.themes)`;
            const value = Object.fromEntries(
              themes.map((t, i) => [`theme${i}`, t]),
            );
            return i == 0 ? qb.where(query, value) : qb.orWhere(query, value);
          });
        }),
      );
    }

    qb.skip(page > 1 ? (page - 1) * limit : 0).take(limit);

    return await qb.getManyAndCount();
  }
}

module.exports = ListCoursesUseCase;
