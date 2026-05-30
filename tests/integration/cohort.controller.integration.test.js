const request = require("supertest");

const { createCohort } = require("../helpers/cohort.helper");
const { cohortData } = require("../fixtures/cohort.fixture");

describe("Cohort Controller - Integration Tests", () => {
  it("POST /cohorts deve retonar erro 400 ao passar um título inválido ao criar uma turma", async () => {
    const res = await createCohort(testApp(), { title: "" });
    expect(res.status).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({ message: "Invalid cohort data" }),
    );
  });

  it("POST /cohorts deve criar uma turma válida", async () => {
    const res = await createCohort(testApp());
    expect(res).toHaveStatus(201);
    expect(res.body).toEqual(expect.objectContaining(cohortData));
  });

  it("GET /cohorts deve listar turmas", async () => {
    await createCohort(testApp());
    const res = await request(testApp()).get("/cohorts?page=1&limit=5");
    expect(res).toHaveStatus(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination.total).toBeGreaterThan(0);
  });

  it("GET /cohorts/:id deve retornar turma por id", async () => {
    const cohort = await createCohort(testApp());
    const id = cohort.body.id;
    const res = await request(testApp()).get(`/cohorts/${id}`);
    expect(res).toHaveStatus(200);
    expect(res.body.id).toBe(id);
  });

  it("PUT /cohorts/:id deve atualizar turma existente", async () => {
    const cohort = await createCohort(testApp());
    const id = cohort.body.id;

    const res = await request(testApp())
      .patch(`/cohorts/${id}`)
      .send({ title: "Turma de SQL Avançado" });

    expect(res).toHaveStatus(200);
    expect(res.body.title).toBe("Turma de SQL Avançado");
  });

  it("DELETE /cohorts/:id deve excluir turma existente", async () => {
    const cohort = await createCohort(testApp());
    const id = cohort.body.id;
    const res = await request(testApp()).delete(`/cohorts/${id}`);
    expect(res).toHaveStatus(204);
  });
});
