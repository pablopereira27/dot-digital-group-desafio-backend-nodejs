const {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsIn,
  IsOptional,
} = require("class-validator");

const ThemesEnum = {
  INOVAÇÃO: "inovação",
  TECNOLOGIA: "tecnologia",
  MARKETING: "marketing",
  EMPREENDENRISMO: "empreendedorismo",
  AGRO: "agro",
};

function applyCourseValidators(target, { optional = false } = {}) {
  if (optional) {
    IsOptional()(target.prototype, "title");
    IsOptional()(target.prototype, "description");
    IsOptional()(target.prototype, "themes");
    IsOptional()(target.prototype, "image_url");
  }

  IsString()(target.prototype, "title");
  IsNotEmpty()(target.prototype, "title");

  IsString()(target.prototype, "description");
  IsNotEmpty()(target.prototype, "description");

  IsArray()(target.prototype, "themes");
  ArrayNotEmpty()(target.prototype, "themes");
  IsIn(Object.values(ThemesEnum), { each: true })(target.prototype, "themes");

  IsString()(target.prototype, "image_url");
  IsNotEmpty()(target.prototype, "image_url");
}

module.exports = { applyCourseValidators };
