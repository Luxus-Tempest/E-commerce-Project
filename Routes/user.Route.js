import express from 'express';
import {deleteUser, getUser, getUsers } from "../controllers/user.controller.js";
import {verifyToken} from "../middleware/jwt.js";


const router = express.Router();

//creer mon premier point d'acces
//creer mon premier point d'acces
/*router.get("/test",(req, res)=>{
    res.send("Welcome dear client")
    });*/
router.delete("/:id",verifyToken, deleteUser);
router.get("/:id",verifyToken, getUser);
router.get("/", getUsers);



export default router; 