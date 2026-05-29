const User = require("../entities/user.entity");

class CreateUserUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(User);
  }

  async execute(data) {
    const user = this.repo.create({
      name: data.name,
      email: data.email,
    });

    await this.repo.save(user);
    return user;
  }
}

module.exports = CreateUserUseCase;
