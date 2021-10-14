/**
 * @swagger
 *  /:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Index
 *     name: 메인 페이지
 *     summary: 메인 페이지(사용 가능)
 *     responses:
 *       '200':
 *         description: 게시글 불러오기 성공
 *       '404':
 *         description: 게시글 불러오는 경로 에러
 *       '500':
 *         description: 에상치 못한 서버 쪽 에러
 *
 * /users/{userUid}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Index
 *     name: 마이 페이지
 *     summary: 마이 페이지(사용 가능)
 *     parameters:
 *       - name: postUid
 *         in: path
 *         required: true
 *         default: 9d773f60-2b87-11ec-84a6-a5190298305d
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 마이페이지 접근 성공
 *       '404':
 *         description: 잘못된 경로로 접근
 *       '401':
 *         description: 로그인이 안된 유저인 경우
 * /posts/{postUid}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *       - Index
 *     name: 게시글 상세 페이지
 *     summary: 게시글 상세 페이지(사용 가능)
 *     parameters:
 *       - name: postUid
 *         in: path
 *         required: true
 *         default: 48ea4830-2cbc-11ec-b031-0bdc728474da
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 상세 페이지 불러오기 성공
 *       '404':
 *         description: 경로를 찾을 수 없다.
 *       '500':
 *         description: 서버쪽에서 발생한 에러
 */
