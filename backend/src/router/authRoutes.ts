import { Router } from "express";
import { registerUser, loginUser, getUser } from "../controller/authController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', authenticate, getUser);

export default router