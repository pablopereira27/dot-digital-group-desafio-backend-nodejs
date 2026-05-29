/**
 * @openapi
 * components:
 *   schemas:
 *     CohortCreateDTO:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - vacancies
 *         - status
 *         - start_date
 *         - end_date
 *         - course_id
 *       properties:
 *         title:
 *           type: string
 *           description: Cohort title
 *         description:
 *           type: string
 *           description: Cohort description
 *         vacancies:
 *           type: integer
 *           description: Number of available spots in the cohort
 *         status:
 *           type: string
 *           enum: ["disponível", "encerrado"]
 *           default: "disponível"
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         course_id:
 *           type: integer
 *           description: ID of the associated course
 */
