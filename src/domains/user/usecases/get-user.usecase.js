const User = require("../entities/user.entity");

class GetUserUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(User);
  }

  async execute(id) {
    return await this.repo.findOneBy({ id });
  }
}

module.exports = GetUserUseCase;
