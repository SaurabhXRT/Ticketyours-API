import express from "express";
import {register} from "../../controllers/user/auth.js"; 
import { login } from "../../controllers/user/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
