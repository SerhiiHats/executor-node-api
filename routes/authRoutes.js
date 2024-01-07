import express from "express";
import {getUser, login, register} from "../controllers/UserController.js";
import {authValidator} from "../services/validators.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.post('/auth/register', authValidator, register);
router.post('/auth/login', authValidator, login);
router.get('/auth/me', isAuthenticated, getUser);

export default router;