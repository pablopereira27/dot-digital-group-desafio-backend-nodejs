/**
 * @openapi
 * components:
 *   schemas:
 *     CohortResponseDTO:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - vacancies
 *         - status
 *         - start_date
 *         - end_date
 *         - created_at
 *         - updated_at
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the cohort
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
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         course_id:
 *           type: integer
 *           description: ID of the associated course
 */
