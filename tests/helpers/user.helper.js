const request = require("supertest");
const { userData } = require("../fixtures/user.fixture");
const { mergeData } = require("../test-utils/merge-data");

/**
 * Cria um usuário (user) para uso em testes de integração.
 *
 * - Usa os dados padrão de `userData` como base.
 * - Faz merge com os dados passados em `data`:
 *   - Se o atributo estiver ausente, mantém o valor padrão.
 *   - Se o atributo estiver presente com valor válido, sobrescreve o padrão.
 *   - Se o atributo estiver presente com valor nulo, vazio ou undefined,
 *     remove o valor padrão para simular erro de validação.
 *
 * @param {import("express").Application} app - Instância da aplicação de teste
 * com DataSource.EntityManager do Typeorm passado como parâmetro para controlar
 * transações do Banco da Dados e fazer Rollbacks após os Testes.
 * @param {Object} [data] - Dados opcionais para sobrescrever ou remover do fixture.
 * @returns {Promise<import("supertest").Response>} Resposta da requisição POST /users.
 *
 * @example
 * // Criar curso com título customizado
 * await createUser(app, { name: "Pablo Pereira" });
 *
 * @example
 * // Criar curso sem título (simula erro)
 * await createUser(app, { title: "" });
 */

async function createUser(app, data = {}) {
  const merged = mergeData(userData, data);
  return request(app).post("/users").send(merged);
}

module.exports = { createUser };
