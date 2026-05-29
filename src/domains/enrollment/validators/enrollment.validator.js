const {
  IsString,
  IsNotEmpty,
  IsIn,
  IsInt,
  IsOptional,
} = require("class-validator");

const StatusEnum = {
  ATIVO: "ativo",
  TRANCADO: "trancado",
  ABANDONADO: "abandonado",
  CONCLUÍDO: "concluído",
};

function applyEnrollmentValidators(target, { optional = false } = {}) {
  if (optional) {
    IsOptional()(target.prototype, "user_id");
    IsOptional()(target.prototype, "cohort_id");
  }

  IsInt()(target.prototype, "user_id");
  IsNotEmpty()(target.prototype, "user_id");

  IsInt()(target.prototype, "cohort_id");
  IsNotEmpty()(target.prototype, "cohort_id");

  IsOptional()(target.prototype, "status");
  IsString()(target.prototype, "status");
  IsNotEmpty()(target.prototype, "status");
  IsIn(Object.values(StatusEnum))(target.prototype, "status");
}

module.exports = { applyEnrollmentValidators };
