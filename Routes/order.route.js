import express from 'express';
import { verifyToken } from '../middleware/jwt.js';
import {
    createOrder,
    getOrders
} from "../controllers/order.controller.js"


const router = express.Router();

//creer mon premier point d'acces
router.post("/:gigId", verifyToken,  createOrder);
router.get("/", verifyToken,  getOrders);


export default router; 
