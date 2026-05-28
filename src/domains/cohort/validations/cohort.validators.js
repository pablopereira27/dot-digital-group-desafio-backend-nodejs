const {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayNotEmpty,
  IsIn,
  IsInt,
  IsOptional,
  IsEnum,
  IsPositive,
  IsDateString,
} = require("class-validator");

const CohortStatus = {
  DISPONÍVEL: "disponível",
  ENCERRADO: "encerrado",
};

function applyCohortValidators(target, { optional = false } = {}) {
  if (optional) {
    IsOptional()(target.prototype, "title");
    IsOptional()(target.prototype, "description");
    IsOptional()(target.prototype, "vacancies");
    IsOptional()(target.prototype, "status");
    IsOptional()(target.prototype, "start_date");
    IsOptional()(target.prototype, "end_date");
    IsOptional()(target.prototype, "course_id");
  }

  IsString()(target.prototype, "title");
  IsNotEmpty()(target.prototype, "title");

  IsString()(target.prototype, "description");
  IsNotEmpty()(target.prototype, "description");

  IsInt()(target.prototype, "vacancies");
  IsNotEmpty()(target.prototype, "vacancies");
  IsPositive()(target.prototype, "vacancies");

  IsEnum(CohortStatus)(target.prototype, "status");

  IsDateString()(target.prototype, "start_date");
  IsNotEmpty()(target.prototype, "start_date");

  IsDateString()(target.prototype, "end_date");
  IsNotEmpty()(target.prototype, "end_date");

  IsInt()(target.prototype, "course_id");
  IsNotEmpty()(target.prototype, "course_id");
}

module.exports = { applyCohortValidators };
