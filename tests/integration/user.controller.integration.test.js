const request = require("supertest");

const { createCourse } = require("../helpers/course.helper");
const { createCohort } = require("../helpers/cohort.helper");
const { createUser } = require("../helpers/user.helper");
const { courseData } = require("../fixtures/course.fixture");
const { cohortData } = require("../fixtures/cohort.fixture");
const { userData } = require("../fixtures/user.fixture");

describe("User Controller - Integration Tests", () => {
  it("POST /users deve criar um usuário válido", async () => {
    const res = await createUser(testApp());
    expect(res).toHaveStatus(201);
    expect(res.body).toEqual(expect.objectContaining(userData));
  });

  it("GET /users deve listar usuários", async () => {
    await createUser(testApp());
    const res = await request(testApp()).get("/users?page=1&limit=5");
    expect(res).toHaveStatus(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination.total).toBeGreaterThan(0);
  });

  it("GET /users/:id deve retornar usuário por id", async () => {
    const user = await createUser(testApp());
    const id = user.body.id;

    const res = await request(testApp()).get(`/users/${id}`);
    expect(res).toHaveStatus(200);
    expect(res.body.id).toBe(id);
  });

  it("PUT /users/:id deve atualizar usuário existente", async () => {
    const user = await createUser(testApp());
    const id = user.body.id;

    const res = await request(testApp())
      .patch(`/users/${id}`)
      .send({ name: "João Silva", email: "joao.silva@example.com" });

    expect(res).toHaveStatus(200);
    expect(res.body.name).toBe("João Silva");
    expect(res.body.email).toBe("joao.silva@example.com");
  });

  it("DELETE /users/:id deve excluir usuário existente", async () => {
    const user = await createUser(testApp());
    const id = user.body.id;

    const res = await request(testApp()).delete(`/users/${id}`);

    expect(res).toHaveStatus(204);
  });
});
