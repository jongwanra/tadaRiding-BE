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
 * /api/post/content/:postID:
 *   delete:
 *     tags:
 *      - Post
 *     name: 게시글 삭제
 *     summary: 게시글 삭제(사용 불가)
 *   put:
 *     tags:
 *      - Post
 *     name: 게시글 수정
 *     summary: 게시글 수정(사용 불가)
 */
