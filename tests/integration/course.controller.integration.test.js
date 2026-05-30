const request = require("supertest");

const { createCourse } = require("../helpers/course.helper");
const { createCohort } = require("../helpers/cohort.helper");
const { courseData } = require("../fixtures/course.fixture");
const { cohortData } = require("../fixtures/cohort.fixture");

describe("Course Controller - Integration Tests", () => {
  it("POST /courses deve criar um curso válido", async () => {
    const res = await createCourse(testApp());
    expect(res).toHaveStatus(201);
    expect(res.body).toEqual(expect.objectContaining(courseData));
  });

  it("GET /courses deve listar cursos", async () => {
    await createCourse(testApp());
    const res = await request(testApp()).get("/courses?page=1&limit=5");

    expect(res).toHaveStatus(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.pagination.total).toBeGreaterThan(0);
  });

  it("GET /courses/:id deve retornar curso por id", async () => {
    const course = await createCourse(testApp());
    const id = course.body.id;

    const res = await request(testApp()).get(`/courses/${id}`);
    expect(res).toHaveStatus(200);
    expect(res.body.id).toBe(id);
  });

  it("PUT /courses/:id deve atualizar curso existente", async () => {
    const course = await createCourse(testApp());
    const id = course.body.id;

    const res = await request(testApp())
      .patch(`/courses/${id}`)
      .send({ title: "Curso de SQL Avançado" });

    expect(res).toHaveStatus(200);
    expect(res.body.title).toBe("Curso de SQL Avançado");
  });

  it("DELETE /courses/:id deve excluir curso existente", async () => {
    const course = await createCourse(testApp());
    const id = course.body.id;
    const res = await request(testApp()).delete(`/courses/${id}`);
    expect(res).toHaveStatus(204);
  });

  it("GET /courses com filtros deve retornar curso com turma válida", async () => {
    const course = await createCourse(testApp());
    expect(course).toHaveStatus(201);

    const cohort = await createCohort(testApp(), {
      ...cohortData,
      course_id: course.body.id,
    });
    expect(cohort).toHaveStatus(201);

    // lista cursos com filtros que devem encontrar o curso
    const availableCourses = await request(testApp()).get(
      `/courses?page=1&limit=5&status=disponível&title=${encodeURIComponent(
        courseData.title,
      )}&themes=${courseData.themes[0]}&themes=${courseData.themes[1]}`,
    );

    expect(availableCourses).toHaveStatus(200);
    expect(Array.isArray(availableCourses.body.data)).toBe(true);
    expect(availableCourses.body.pagination.total).toBeGreaterThan(0);

    const availableCourse = availableCourses.body.data.find(
      (c) => c.id === course.body.id,
    );

    expect(availableCourse).toBeDefined();
    expect(availableCourse.title).toBe(courseData.title);
    expect(availableCourse.description).toBe(courseData.description);
    expect(availableCourse.themes).toEqual(
      expect.arrayContaining(courseData.themes),
    );

    // check se existe ao menos 1 turma válida dentro do curso
    expect(Array.isArray(availableCourse.cohorts)).toBe(true);
    expect(availableCourse.cohorts.length).toBeGreaterThan(0);

    const availableCohort = availableCourse.cohorts[0];
    expect(availableCohort.status).toBe("disponível");
    expect(availableCohort.vacancies).toBeGreaterThan(0);
  });
});
