const { applyUserValidators } = require("../validators/user.validator");

class UpdateUserDTO {
  name;
  email;
}

applyUserValidators(UpdateUserDTO, { optional: true });

module.exports = UpdateUserDTO;
