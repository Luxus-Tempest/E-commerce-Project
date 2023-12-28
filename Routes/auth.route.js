import express from 'express';

import {register, login, logout} from '../controllers/auth.controller.js';


const router = express.Router();

//UTILISER LA METHODE POST POUR L'NEVOIE DE DONNES VERS LA BASE DE DONNEE
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);



export default router; 
