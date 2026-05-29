const {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
} = require("class-validator");

function applyUserValidators(target, { optional = false } = {}) {
  if (optional) {
    IsOptional()(target.prototype, "name");
    IsOptional()(target.prototype, "email");
  }

  IsString()(target.prototype, "name");
  IsNotEmpty()(target.prototype, "name");

  IsEmail()(target.prototype, "email");
  IsNotEmpty()(target.prototype, "email");
}

module.exports = { applyUserValidators };
