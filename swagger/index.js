/**
 * @swagger
 *  /:
 *   get:
 *     tags:
 *       - Index
 *     name: 메인 페이지
 *     summary: 메인 페이지
 *     parameters:
 *       - in: query
 *         name: schoolName
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one School
 *       '404':
 *         fail
 *
 * /users/{userUid}:
 *   get:
 *     tags:
 *       - Index
 *     name: 마이 페이지
 *     summary: 마이 페이지
 *     parameters:
 *       - in: query
 *         name: schoolName
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one School
 *       '404':
 *         fail
 * /posts/{postUid}:
 *   get:
 *     tags:
 *       - Index
 *     name: 게시글 상세 페이지
 *     summary: 게시글 상세 페이지
 *     parameters:
 *       - in: query
 *         name: schoolName
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       '200':
 *         description: Get one School
 *       '404':
 *         fail
 */
