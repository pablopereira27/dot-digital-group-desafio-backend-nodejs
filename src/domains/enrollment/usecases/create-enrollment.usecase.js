const { BusinessRuleError, NotFoundError } = require("../../../errors");

const Enrollment = require("../entities/enrollment.entity");
const Cohort = require("../../cohort/entities/cohort.entity");

class CreateEnrollmentUseCase {
  constructor(manager) {
    this.repo = manager.getRepository(Enrollment);
    this.cohortRepo = manager.getRepository(Cohort);
  }

  checkCohortAvailability(cohort, now) {
    return (
      cohort.status === "disponível" &&
      now >= cohort.start_date &&
      now <= cohort.end_date &&
      cohort.vacancies > 0
    );
  }

  async checkActiveEnrollment(userId, courseId) {
    return await this.repo.findOne({
      where: {
        user: { id: userId },
        cohort: { course: { id: courseId } },
        status: "ativo",
      },
      relations: { cohort: { course: true } },
    });
  }

  async execute(data) {
    const now = new Date().toISOString().split("T")[0];

    const cohort = await this.cohortRepo.findOne({
      where: { id: data.cohort_id },
      relations: { course: true },
    });

    if (!cohort) {
      throw new NotFoundError("Turma não encontrada");
    }

    // Regra 1: não permitir matrícula em turmas encerradas ou fora da data
    if (!this.checkCohortAvailability(cohort, now)) {
      throw new BusinessRuleError("Turma não disponível para matrícula");
    }

    // Regra 2: impedir múltiplas matrículas ativas para o mesmo curso
    const activeEnrollment = await this.checkActiveEnrollment(
      data.user_id,
      cohort.course.id,
    );

    if (activeEnrollment) {
      throw new BusinessRuleError(
        "Usuário já possui matrícula ativa neste curso",
      );
    }

    // Criar matrícula
    const enrollment = this.repo.create({
      user: { id: data.user_id },
      cohort: { id: data.cohort_id },
      status: data.status || "ativo",
    });

    await this.repo.save(enrollment);
    return enrollment;
  }
}

module.exports = CreateEnrollmentUseCase;
