/**
 * @openapi
 * /cohorts:
 *   get:
 *     summary: List cohorts
 *     tags: [Cohorts]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of cohorts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortListResponseDTO'
 *   post:
 *     summary: Create a new cohort
 *     tags: [Cohorts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CohortCreateDTO'
 *     responses:
 *       201:
 *         description: Cohort created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortResponseDTO'
 *
 * /cohorts/{id}:
 *   get:
 *     summary: Get cohort by ID
 *     tags: [Cohorts]
 *     parameters:  
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cohort found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortResponseDTO'
 *   put:
 *     summary: Update cohort by ID
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CohortUpdateDTO'
 *     responses:
 *       200:
 *         description: Cohort updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CohortResponseDTO'
 *   delete:
 *     summary: Delete cohort by ID
 *     tags: [Cohorts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cohort deleted
 */
