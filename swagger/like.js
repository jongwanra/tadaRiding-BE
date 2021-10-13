/**
 * @swagger
 * /api/likes/{postUid}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Like
 *     name: 좋아요 누름
 *     summary: 좋아요 누름(사용 가능)
 *     parameters:
 *       - name: postUid
 *         in: path
 *         required: true
 *         default: 9d773f60-2b87-11ec-84a6-a5190298305d
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 좋아요 추가 성공
 *       '404':
 *         description: 해당 경로가 맞지 않을 경우
 *       '500':
 *         description: 서버 쪽에서 발생한 예상치 못한 에러
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Like
 *     name: 좋아요 취소
 *     summary: 좋아요 취소(사용 가능)
 *     parameters:
 *       - name: postUid
 *         in: path
 *         required: true
 *         default: 9d773f60-2b87-11ec-84a6-a5190298305d
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 좋아요 취소 성공
 *       '404':
 *         description: 해당 경로가 맞지 않을 경우
 *       '500':
 *         description: 서버 쪽에서 발생한 예상치 못한 에러
 */
