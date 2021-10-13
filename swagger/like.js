/**
 * @swagger
 * /api/like/{postUid}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Like
 *     name: 좋아요 누름
 *     summary: 좋아요 누름
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             type:
 *               type: string
 *             address:
 *               type: string
 *           example:
 *             name: schoolOne
 *             type: High
 *             address : gangnam
 *
 *     responses:
 *       '200':
 *         description: Register one School
 *       '404':
 *         fail
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Like
 *     name: 좋아요 취소
 *     summary: 좋아요 취소
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
 */
