const { Brackets } = require("typeorm");

const Cohort = require("../entities/cohort.entity");

class ListCohortsUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Cohort);
  }

  async execute(page = 1, limit = 10, filters = {}) {
    const qb = this.repo.createQueryBuilder("cohort");

    if (filters.title) {
      qb.andWhere("cohort.title LIKE :title", {
        title: `%${filters.title}%`,
      });
    }

    if (filters.status) {
      qb.andWhere("cohort.status = :status", {
        status: filters.status,
      });
    }

    if (filters.start_date) {
      qb.andWhere("cohort.start_date <= :start_date", {
        start_date: filters.start_date,
      });
    }

    if (filters.end_date) {
      qb.andWhere("cohort.end_date >= :end_date", {
        end_date: filters.end_date,
      });
    }

    qb.orderBy("cohort.start_date", "ASC");

    qb.skip(page > 1 ? (page - 1) * limit : 0).take(limit);

    return await qb.getManyAndCount();
  }
}

module.exports = ListCohortsUseCase;
