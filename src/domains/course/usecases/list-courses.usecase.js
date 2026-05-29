const { Brackets } = require("typeorm");

const Course = require("../entities/course.entity");

class ListCoursesUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Course);
  }

  async execute(page = 1, limit = 10, filters = {}) {
    const qb = this.repo
      .createQueryBuilder("course")
      .leftJoin("course.cohorts", "cohort")
      .addSelect([
        "cohort.id",
        "cohort.title",
        "cohort.status",
        "cohort.vacancies",
        "cohort.start_date",
        "cohort.end_date",
      ]);

    if (filters.status) {
      qb.andWhere("cohort.status = :status", {
        status: filters.status,
      });

      if (filters.status === "disponível") {
        qb.andWhere("cohort.vacancies > 0");
      }
    }

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
