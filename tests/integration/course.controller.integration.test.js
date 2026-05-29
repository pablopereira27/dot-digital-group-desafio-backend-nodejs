const request = require("supertest");

const ThemesEnum = {
  INOVAÇÃO: "inovação",
  TECNOLOGIA: "tecnologia",
  MARKETING: "marketing",
  EMPREENDENRISMO: "empreendedorismo",
  AGRO: "agro",
};

describe("Course Controller - Integration Tests", () => {
  const courseData = {
    title: "Curso de JavaScript",
    description: "Aprenda JavaScript do básico ao avançado",
    themes: Object.values(ThemesEnum).slice(0, 2),
    image_url: "https://example.com/course-image.jpg",
  };

  it("POST /courses deve criar um curso válido", async () => {
    const res = await request(testApp()).post("/courses").send(courseData);

    expect(res).toHaveStatus(201);
    expect(res.body).toEqual(expect.objectContaining(courseData));
  });

  it("GET /courses deve listar cursos", async () => {
    await request(testApp()).post("/courses").send(courseData);

    const res = await request(testApp()).get("/courses?page=1&limit=5");

    expect(res).toHaveStatus(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination.total).toBeGreaterThan(0);
  });

  it("GET /courses/:id deve retornar curso por id", async () => {
    const createRes = await request(testApp())
      .post("/courses")
      .send(courseData);

    const id = createRes.body.id;

    const res = await request(testApp()).get(`/courses/${id}`);

    expect(res).toHaveStatus(200);
    expect(res.body.id).toBe(id);
  });

  it("PUT /courses/:id deve atualizar curso existente", async () => {
    const createRes = await request(testApp())
      .post("/courses")
      .send(courseData);

    const id = createRes.body.id;

    const res = await request(testApp())
      .put(`/courses/${id}`)
      .send({ title: "Curso de SQL Avançado" });

    expect(res).toHaveStatus(200);
    expect(res.body.title).toBe("Curso de SQL Avançado");
  });

  it("DELETE /courses/:id deve excluir curso existente", async () => {
    const createRes = await request(testApp())
      .post("/courses")
      .send(courseData);

    const id = createRes.body.id;

    const res = await request(testApp()).delete(`/courses/${id}`);

    expect(res).toHaveStatus(204);
  });
});
