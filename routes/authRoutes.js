import express from 'express';
import * as UserService from '../services/userService.js';

const authRouter = express.Router();

authRouter.post('/', UserService.authUser);

export default authRouter;