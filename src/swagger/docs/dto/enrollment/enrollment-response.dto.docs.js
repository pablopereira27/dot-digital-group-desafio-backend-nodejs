/**
 * @openapi
 * components:
 *   schemas:
 *     EnrollmentResponseDTO:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the user
 *         cohort_id:
 *           type: string
 *           description: Related Cohort identifier
 *         user_id:
 *           type: string
 *           description: Related User identifier
 *         status:
 *           type: string
 *           enum: ["ativo", "trancado", "abandonado", "concluído"]
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
 *             create:
 *               type: string
 *             update:
 *               type: string
 *             delete:
 *               type: string
 *
 */
