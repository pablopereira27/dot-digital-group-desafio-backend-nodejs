const User = require("../entities/user.entity");

class UpdateUserUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(User);
  }

  async execute(id, data) {
    const user = await this.repo.findOneBy({ id });

    if (!user) return null;

    this.repo.merge(user, data);
    return await this.repo.save(user);
  }
}

module.exports = UpdateUserUseCase;
