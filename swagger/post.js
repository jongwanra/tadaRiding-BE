/**
 * @swagger
 * /api/posts:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Post
 *     name: 게시글 등록
 *     summary: 게시글 등록(사용 가능)
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             postTitle:
 *               type: string
 *               description: 게시글 제목
 *             postDesc:
 *               type: String
 *               description: 게시글 내용
 *             limitedUserNum:
 *               type: Nubmer
 *               description: 인원수 제한
 *             origin:
 *               type: String
 *               description: 출발지
 *             destination:
 *               type: String
 *               description: 도착지
 *             postImage:
 *               type: String
 *               description: 게시글 이미지
 *             startTime:
 *               type: String
 *               description: 출발 시간
 *             postDate:
 *               type: String
 *               description: 게시글 등록 시간
 *           example:
 *             postTitle: "오늘 춘천 어때?"
 *             postDesc: "강원도 춘천이 굉장히 공기가 좋고 자전거 도로가..."
 *             limitedUserNum: 4
 *             origin: "경기도 용인시 기흥구 구갈로"
 *             destination: "경원도 춘천시"
 *             postImage: "wdqwd/dqwdqwd/dwqw/image.png"
 *             startTime: "08:00"
 *             postDate: "21.10.12"
 *     responses:
 *       '201':
 *         description: 게시글 등록 완료.
 *       '404':
 *         description: 해당 경로를 찾을 수 없음.
 * /api/posts/{postUid}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Post
 *     name: 게시글 삭제
 *     summary: 게시글 삭제(사용 불가)
 *   put:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Post
 *     name: 게시글 수정
 *     summary: 게시글 수정(사용 가능)
 *     parameters:
 *       - name: postUid
 *         in: path
 *         required: true
 *         default: 771d9fe0-2aff-11ec-b007-338621af5598
 *         schema:
 *           type: string
 *           description: 해당 게시글 고유 아이디
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             postTitle:
 *               type: string
 *               description: 게시글 제목
 *             postDesc:
 *               type: String
 *               description: 게시글 내용
 *             origin:
 *               type: String
 *               description: 출발지
 *             destination:
 *               type: String
 *               description: 도착지
 *             postState:
 *               type: Boolean
 *               description: 게시글 상태
 *             postImage:
 *               type: String
 *               description: 게시글 이미지
 *             limitedUserNum:
 *               type: Number
 *               description: 인원 수 제한
 *             startTime:
 *               type: String
 *               description: 출발 시간
 *             postDate:
 *               type: String
 *               description: 게시글 등록 시간
 *           example:
 *             postTitle: "오늘 춘천 어때?"
 *             postDesc: "강원도 춘천이 굉장히 공기가 좋고 자전거 도로가..."
 *             origin: "경기도 용인시 기흥구 구갈로"
 *             destination: "강원도 춘천시"
 *             postState: true
 *             postImage: "wdqwd/dqwdqwd/dwqw/image.png"
 *             limitedUserNum: 4
 *             startTime: "08:00"
 *     responses:
 *       '200':
 *         description: 게시글 수정 완료.
 *       '404':
 *         description: 해당 경로를 찾을 수 없음.
 *       '500':
 *         description: 예상하지 못한 에러 발생
 * /api/posts/{postUid}/{userUid}:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Post
 *     summary: 참여하기 기능
 *     parameters:
 *       - name: postUid
 *         in: path
 *         default: 3e8fbc20-2e3e-11ec-a95b-69c7ce26350c
 *         required: true
 *         schema:
 *           type: string
 *           description: 해당 게시글 고유 아이디
 *       - name: userUid
 *         in: path
 *         default: 925d4980-2e3e-11ec-a95b-69c7ce26350c
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 해당 포스트에 참가 완료.
 *       '404':
 *         description: 해당 경로를 찾을 수 없음.
 *       '500':
 *         description: 예상하지 못한 에러 발생
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - Post
 *     name: 참여하기 취소
 *     summary: 참여하기 취소
 *     parameters:
 *       - name: postUid
 *         in: path
 *         default: 3e8fbc20-2e3e-11ec-a95b-69c7ce26350c
 *         required: true
 *         schema:
 *           type: string
 *           description: 해당 게시글 고유 아이디
 *       - name: userUid
 *         in: path
 *         required: true
 *         default: c62486c0-2e1b-11ec-a594-b95412bcee5e
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 참여하기 취소 완료.
 *       '404':
 *         description: 해당 경로를 찾을 수 없음.
 *       '500':
 *         description: 예상하지 못한 에러 발생

 */
