/**
 * @swagger
 * /api/user/register:
 *   post:
 *     tags:
 *      - User
 *     summary: Create User
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *
 *
 *     responses:
 *       '200':
 *         description: Register one School
 *       '404':
 *         fail
 * /api/user/auth:
 *   post:
 *     tags:
 *       - User
 *     summary: Logs user into the system
 *     parameters:
 *       - name: userNickname
 *         in: body
 *         description: user Nickname for login
 *         required: true
 *         schema:
 *           type: string
 *       - name: userPassword
 *         in: body
 *         description: user Password for login
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid username/password supplied
 *   delete:
 *     tags:
 *       - User
 *     summary: Logout user into the system
 *     parameters:
 *       - name: userNickname
 *         in: body
 *         description: user Nickname for login
 *         required: true
 *         schema:
 *           type: string
 *       - name: userPassword
 *         in: body
 *         description: user Password for login
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: successful operation
 *       '400':
 *         description: Invalid username/password supplied
 */
