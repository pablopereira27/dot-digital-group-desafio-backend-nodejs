/**
 * @openapi
 * components:
 *   schemas:
 *     EnrollmentCreateDTO:
 *       type: object
 *       required:
 *         - cohort_id
 *         - user_id
 *       properties:
 *         cohort_id:
 *           type: string
 *           description: Related Cohort identifier
 *         user_id:
 *           type: string
 *           description: Related User identifier
 *         status:
 *           type: string
 *           enum: ["ativo", "trancado", "abandonado", "concluído"]
 *           description: Status
 */
