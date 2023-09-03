import express from 'express';
import * as UserService from '../services/userService.js'
import * as ItemService from '../services/itemService.js'


const itemRouter = express.Router()

itemRouter.get("/", UserService.validateToken, ItemService.getItem);                   //~
itemRouter.get("/:id", UserService.validateToken, ItemService.getItemById);            //~

//Penamaan Route harus diawali dengan '/'!
itemRouter.get("/n/:nm", UserService.validateToken, ItemService.getItemByNm);          //~
itemRouter.get("/sb/:bTF", UserService.validateToken, ItemService.getStatItemByBol);   //~
itemRouter.get("/sv/:val", UserService.validateToken, ItemService.getStatItemByBol1);  //~

itemRouter.post("/", UserService.validateToken, ItemService.createItem);               //~
itemRouter.put("/:id", UserService.validateToken, ItemService.updateItemById);         //~
itemRouter.delete("/:id", UserService.validateToken, ItemService.delItemById);         //~

//userRouter.post("/auth", )

export default itemRouter;