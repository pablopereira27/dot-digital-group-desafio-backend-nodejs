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

  it("GET /courses com filtros deve retornar curso com turma válida", async () => {
    const createCourseRes = await request(testApp())
      .post("/courses")
      .send(courseData);
    expect(createCourseRes).toHaveStatus(201);
    const courseId = createCourseRes.body.id;

    // cria turma válida para o curso
    let start_date = new Date();
    start_date.setDate(start_date.getDate() - 10);

    let end_date = new Date();
    end_date.setDate(start_date.getDate() + 30);

    const cohortData = {
      title: `Turma de JavaScript ${start_date.getFullYear()}-${start_date.getMonth() + 1}`,
      description: "Turma de testes",
      vacancies: 10,
      status: "disponível",
      start_date: start_date.toISOString().split("T")[0],
      end_date: end_date.toISOString().split("T")[0],
      course_id: courseId,
    };

    const createCohortRes = await request(testApp())
      .post("/cohorts")
      .send(cohortData);
    expect(createCohortRes).toHaveStatus(201);

    // lista cursos com filtros que devem encontrar o curso
    const res = await request(testApp()).get(
      `/courses?page=1&limit=5&status=disponível&title=${encodeURIComponent(
        courseData.title,
      )}&themes=${courseData.themes[0]}&themes=${courseData.themes[1]}`,
    );

    expect(res).toHaveStatus(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination.total).toBeGreaterThan(0);

    const course = res.body.data.find((c) => c.id === courseId);
    expect(course).toBeDefined();
    expect(course.title).toBe(courseData.title);
    expect(course.description).toBe(courseData.description);
    expect(course.themes).toEqual(expect.arrayContaining(courseData.themes));

    // check se existe ao menos 1 turma válida dentro do curso
    expect(Array.isArray(course.cohorts)).toBe(true);
    expect(course.cohorts.length).toBeGreaterThan(0);

    const cohort = course.cohorts[0];
    expect(cohort.title).toBe(cohortData.title);
    expect(cohort.status).toBe("disponível");
    expect(cohort.vacancies).toBeGreaterThan(0);
  });
});
