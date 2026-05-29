/**
 * @openapi
 * components:
 *   schemas:
 *     CourseCreateDTO:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - themes
 *         - image_url
 *       properties:
 *         title:
 *           type: string
 *           description: Course title
 *         description:
 *           type: string
 *           description: Course description
 *         themes:
 *           type: array
 *           items:
 *             type: string
 *           description: Course themes
 *         image_url:
 *           type: string
 *           format: uri
 *           description: Optional image URL for the course
 */
