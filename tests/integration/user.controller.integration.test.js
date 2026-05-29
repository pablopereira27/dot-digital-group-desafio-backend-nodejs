const request = require("supertest");

describe("User Controller - Integration Tests", () => {
  const userData = {
    name: "João",
    email: "joao@example.com"
  };

  it("POST /users deve criar um usuário válido", async () => {
    const res = await request(testApp()).post("/users").send(userData);

    expect(res).toHaveStatus(201);
    expect(res.body).toEqual(expect.objectContaining(userData));
  });

  it("GET /users deve listar usuários", async () => {
    await request(testApp()).post("/users").send(userData);

    const res = await request(testApp()).get("/users?page=1&limit=5");

    expect(res).toHaveStatus(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination.total).toBeGreaterThan(0);
  });

  it("GET /users/:id deve retornar usuário por id", async () => {
    const createRes = await request(testApp())
      .post("/users")
      .send(userData);

    const id = createRes.body.id;

    const res = await request(testApp()).get(`/users/${id}`);

    expect(res).toHaveStatus(200);
    expect(res.body.id).toBe(id);
  });

  it("PUT /users/:id deve atualizar usuário existente", async () => {
    const createRes = await request(testApp())
      .post("/users")
      .send(userData);

    const id = createRes.body.id;

    const res = await request(testApp())
      .put(`/users/${id}`)
      .send({ name: "João Silva", email: "joao.silva@example.com" });

    expect(res).toHaveStatus(200);
    expect(res.body.name).toBe("João Silva");
    expect(res.body.email).toBe("joao.silva@example.com");
  });

  it("DELETE /users/:id deve excluir usuário existente", async () => {
    const createRes = await request(testApp())
      .post("/users")
      .send(userData);

    const id = createRes.body.id;

    const res = await request(testApp()).delete(`/users/${id}`);

    expect(res).toHaveStatus(204);
  });
});
