/**
 * @swagger
 * /api/posts/{postUid}/comments:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Comment
 *     name: 댓글 추가 기능
 *     summary: 댓글 추가 기능
 *     parameters:
 *       - name: postUid
 *         in: path
 *         required: true
 *         default: 771d9fe0-2aff-11ec-b007-338621af5598
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             commentDesc:
 *               type: string
 *               description: 댓글 내용
 *             commentDate:
 *               type: string
 *               description: 댓글 최신 날짜(편집 되었을 경우에도 반영)
 *           example:
 *             commentDesc: "오늘 하루는 좋은 일들로만 가득했으면 좋겠네여 ㅎㅎ"
 *             commentDate: "21.10.11"
 *
 *     responses:
 *       '201':
 *         description: 댓글 작성이 완료되었습니다.
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *          description: DB 접속 에러
 * /api/posts/{postUid}/comments/{commentUid}:
 *   put:
 *     tags:
 *      - Comment
 *     name: 댓글 수정 기능
 *     summary: 댓글 수정 기능
 *     parameters:
 *       - name: postUid
 *         in: path
 *         required: true
 *         default: 771d9fe0-2aff-11ec-b007-338621af5598
 *         schema:
 *           type: string
 *           description: 해당 게시글 고유 아이디
 *       - name: commentUid
 *         in: path
 *         required: true
 *         default: 18a73520-2b1d-11ec-ba8f-a3f8563932ea
 *         schema:
 *           type: string
 *           description: 해당 댓글 고유 아이디
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             commentDesc:
 *               type: string
 *               description: 댓글 내용
 *             commentDate:
 *               type: string
 *               description: 댓글 최신 날짜(편집 되었을 경우에도 반영)
 *           example:
 *             commentDesc: "댓글 수정 되지나 확인해 보자~"
 *             commentDate: "21.10.11"
 *     responses:
 *       '201':
 *         description: 댓글 수정이 완료되었습니다.
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *          description: DB 접속 에러
 *   delete:
 *     tags:
 *      - Comment
 *     name: 댓글 삭제 기능
 *     summary: 댓글 삭제 기능
 *     parameters:
 *       - name: postUid
 *         in: path
 *         required: true
 *         default: 771d9fe0-2aff-11ec-b007-338621af5598
 *         schema:
 *           type: string
 *           description: 해당 게시글 고유 아이디
 *       - name: commentUid
 *         in: path
 *         required: true
 *         default: 11299720-2b27-11ec-81b5-53bc63547f55
 *         schema:
 *           type: string
 *           description: 해당 댓글 고유 아이디
 *     responses:
 *       '200':
 *         description: 댓글 삭제가 완료되었습니다.
 *       '404':
 *         description: 해당 URL을 찾을 수 없습니다.
 *       '500':
 *          description: DB 접속 에러
 */
