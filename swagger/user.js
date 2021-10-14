/**
 * @swagger
 * /api/users/register:
 *   post:
 *     tags:
 *      - User
 *     summary: 회원 등록(사용 가능)
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *            userId:
 *              type: string
 *              description: 유저 아이디
 *            userNickname:
 *              type: string
 *              description: 유저 닉네임
 *            userPassword:
 *              type: string
 *              description: 유저 비밀번호
 *            userPhoneNumber:
 *              type: string
 *              description: 유저 핸드폰 번호
 *           example:
 *             userId: "jongwan"
 *             userNickname: "jw123"
 *             userPassword: "asdasd"
 *             userPhoneNumber: "010-2514-0552"
 *     responses:
 *       '201':
 *         description: 회원 등록 성공!
 *       '404':
 *         description: 경로를 찾지 못했습니다.
 *       '408':
 *         description: 아이디 혹은 닉네임 중복이 있을 경우 발생하는 에러
 * /api/users/auth:
 *   post:
 *     tags:
 *       - User
 *     summary: 로그인 기능(사용 가능)
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: 유저 아이디
 *             userPassword:
 *               type: string
 *               description: 유저 비밀번호
 *           example:
 *             userId: "jongwan"
 *             userPassword: "asdasd"
 *     responses:
 *       '201':
 *         description: 로그인 성공!
 *       '401':
 *         description: 아이디 또는 패스워드 불일치
 *       '500':
 *         description: 로그인 기능 중, 서버 측에서 예상치 못한 에러 발생
 * /api/users/{userUid}/validation:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - User
 *     name: 로그인 체크 기능(사용 가능)
 *     summary: 로그인 체크 기능(사용 가능)
 *     parameters:
 *       - name: userUid
 *         in: path
 *         required: true
 *         default: c7592940-2b75-11ec-a5f6-d11c3508bb61
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: 로그인 되어 있는 유저
 *       '401':
 *         description: 로그인 되어 있지 않은 유저
 *       '500':
 *         description: 예상하지 못한 에러
 */
