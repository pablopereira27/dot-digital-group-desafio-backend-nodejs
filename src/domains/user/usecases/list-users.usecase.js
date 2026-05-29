const User = require("../entities/user.entity");

class ListUsersUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(User);
  }

  async execute(page = 1, limit = 10, filters = {}) {
    const qb = this.repo.createQueryBuilder("user");

    if (filters.name) {
      qb.andWhere("user.name LIKE :name", {
        name: `%${filters.name}%`,
      });
    }

    if (filters.email) {
      qb.andWhere("user.email LIKE :email", {
        email: `%${filters.email}%`,
      });
    }

    qb.skip(page > 1 ? (page - 1) * limit : 0).take(limit);

    return await qb.getManyAndCount();
  }
}

module.exports = ListUsersUseCase;
