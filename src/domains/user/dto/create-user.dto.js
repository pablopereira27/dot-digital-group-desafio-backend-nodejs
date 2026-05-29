const { applyUserValidators } = require("../validators/user.validator");

class CreateUserDTO {
  name;
  email;
}

applyUserValidators(CreateUserDTO);

module.exports = CreateUserDTO;
