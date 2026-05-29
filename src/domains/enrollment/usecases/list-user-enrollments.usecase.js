const { Brackets } = require("typeorm");

const Enrollment = require("../entities/enrollment.entity");

class ListUserEnrollmentsUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Enrollment);
  }

  async execute(userId, page = 1, limit = 10, filters = {}) {
    const qb = this.repo
      .createQueryBuilder("enrollment")
      .innerJoin("enrollment.cohort", "cohort")
      .innerJoin("cohort.course", "course")
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
    }

    qb.andWhere("enrollment.user.id = :userId", { userId });

    qb.skip(page > 1 ? (page - 1) * limit : 0).take(limit);

    return await qb.getManyAndCount();
  }
}

module.exports = ListUserEnrollmentsUseCase;
