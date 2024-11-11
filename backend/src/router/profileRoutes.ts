import { Router } from "express";
import { getProfileController, updateProfileController}  from "../controller/profileController";
import { authenticate } from "../middleware/authenticate";
import upload from "../middleware/multer";
const router = Router();

router.put('/profile/:userId', authenticate,upload.single('image'), updateProfileController);
router.get('/profile/:userId',authenticate,getProfileController);

export default router