const { buildHateoasLinks } = require("../../../utils/hateoas.util");

class UserResponseDTO {
  constructor(user) {
    Object.assign(this, {
      id: user.id,
      name: user.name,
      email: user.email,
    });

    this.links = buildHateoasLinks("/users", { id: user.id });
  }
}

module.exports = UserResponseDTO;
