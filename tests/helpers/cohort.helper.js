const request = require("supertest");
const { cohortData } = require("../fixtures/cohort.fixture");
const { createCourse } = require("./course.helper");
const { mergeData } = require("../test-utils/merge-data");

/**
 * Cria uma turma (cohort) para uso em testes de integração.
 *
 * - Usa os dados padrão de `cohortData` como base.
 * - Faz merge com os dados passados em `data`:
 *   - Se o atributo estiver ausente, mantém o valor padrão.
 *   - Se o atributo estiver presente com valor válido, sobrescreve o padrão.
 *   - Se o atributo estiver presente com valor nulo, vazio ou undefined,
 *     remove o valor padrão para simular erro de validação.
 * - Se não houver `course_id`, cria um curso automaticamente e associa.
 *
 * @param {import("express").Application} app - Instância da aplicação de teste
 * com DataSource.EntityManager do Typeorm passado como parâmetro para controlar
 * transações do Banco da Dados e fazer Rollbacks após os Testes.
 * @param {Object} [data] - Dados opcionais para sobrescrever ou remover do fixture.
 * @returns {Promise<import("supertest").Response>} Resposta da requisição POST /cohorts.
 *
 * @example
 * // Criar turma com título customizado
 * await createCohort(app, { title: "Turma de Python" });
 *
 * @example
 * // Criar turma sem título (simula erro)
 * await createCohort(app, { title: "" });
 */
async function createCohort(app, data = {}) {
  const merged = mergeData(cohortData, data);

  if (!merged.course_id) {
    const courseRes = await createCourse(app);
    merged.course_id = courseRes.body.id;
  }

  return request(app).post("/cohorts").send(merged);
}

module.exports = { createCohort };
