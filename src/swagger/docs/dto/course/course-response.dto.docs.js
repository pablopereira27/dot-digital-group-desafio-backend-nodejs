/**
 * @openapi
 * components:
 *   schemas:
 *     CourseResponseDTO:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - themes
 *         - image_url
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the course
 *         title:
 *           type: string
 *           description: Course title
 *         description:
 *           type: string
 *           description: Course description
 *         themes:
 *           type: array
 *           enum: ["inovação", "tecnologia", "marketing", "empreendedorismo", "agro"]
 *           description: Course themes
 *         image_url:
 *           type: string
 *           description: URL of the course image
 *         cohorts: 
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: Unique identifier of the cohort
 *               title:
 *                 type: string
 *                 description: Cohort title
 *               vacancies:
 *                 type: integer
 *                 description: Number of available spots in the cohort
 *               status:
 *                 type: string
 *                 enum: ["disponível", "encerrado"]
 *                 default: "disponível"
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         links:
 *           type: object
 *           properties:
 *             self:
 *               type: string
 *             list:
 *               type: string
 *             create:
 *               type: string
 *             update:
 *               type: string
 *             delete:
 *               type: string
 */
