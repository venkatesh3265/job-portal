import express from 'express';

import {register, login, updateUser} from '../controller/authController.js';
import authenticateUser from '../middleware/auth.js'
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router
