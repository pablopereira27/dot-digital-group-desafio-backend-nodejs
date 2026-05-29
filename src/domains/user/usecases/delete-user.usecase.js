const User = require("../entities/user.entity");

class DeleteUserUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(User);
  }

  async execute(id) {
    const user = await this.repo.findOneBy({ id });

    if (!user) return null;

    await this.repo.remove(user);
    return true;
  }
}

module.exports = DeleteUserUseCase;
