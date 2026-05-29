const request = require("supertest");

const CohortStatus = {
  DISPONÍVEL: "disponível",
  ENCERRADO: "encerrado",
};

describe("Cohort Controller - Integration Tests", () => {
  const cohortData = {
    title: "Turma de Álgebra Linear - 2026 1",
    description:
      "Turma focada em álgebra linear para estudantes de ciência da computação",
    vacancies: 30,
    status: CohortStatus.DISPONÍVEL,
    start_date: "2026-01-01",
    end_date: "2026-06-30",
  };

  const postCohortData = {
    ...cohortData,
    course_id: 7
  };

  it("POST /cohorts deve criar uma turma válida", async () => {
    const res = await request(testApp()).post("/cohorts").send(postCohortData);

    expect(res).toHaveStatus(201);
    expect(res.body).toEqual(expect.objectContaining(cohortData));
  });

  it("GET /cohorts deve listar turmas", async () => {
    await request(testApp()).post("/cohorts").send(postCohortData);

    const res = await request(testApp()).get("/cohorts?page=1&limit=5");

    expect(res).toHaveStatus(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination.total).toBeGreaterThan(0);
  });

  it("GET /cohorts/:id deve retornar turma por id", async () => {
    const createRes = await request(testApp())
      .post("/cohorts")
      .send(postCohortData);

    const id = createRes.body.id;

    const res = await request(testApp()).get(`/cohorts/${id}`);

    expect(res).toHaveStatus(200);
    expect(res.body.id).toBe(id);
  });

  it("PUT /cohorts/:id deve atualizar turma existente", async () => {
    const createRes = await request(testApp())
      .post("/cohorts")
      .send(postCohortData);

    const id = createRes.body.id;

    const res = await request(testApp())
      .put(`/cohorts/${id}`)
      .send({ title: "Turma de SQL Avançado" });

    expect(res).toHaveStatus(200);
    expect(res.body.title).toBe("Turma de SQL Avançado");
  });

  it("DELETE /cohorts/:id deve excluir turma existente", async () => {
    const createRes = await request(testApp())
      .post("/cohorts")
      .send(postCohortData);

    const id = createRes.body.id;

    const res = await request(testApp()).delete(`/cohorts/${id}`);

    expect(res).toHaveStatus(204);
  });
});
