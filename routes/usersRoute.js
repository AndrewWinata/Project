import express from 'express';

import * as UserService from '../services/userService.js'


const userRouter = express.Router()

userRouter.get("/", UserService.validateToken, UserService.getUser);
//userRouter.get("/:id", UserService.getUerById);
userRouter.get("/:email", UserService.validateToken, UserService.getUerByEm);

userRouter.post("/", UserService.createUser);
userRouter.put("/:id", UserService.validateToken, UserService.updateById);
userRouter.delete("/:id", UserService.validateToken, UserService.delById);

//userRouter.post("/auth", )

export default userRouter;