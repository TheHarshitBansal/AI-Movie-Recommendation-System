import { Router } from "express";
import upload from '../middlewares/upload.middleware.js';
import { changePassword, deleteProfile, forgetPassword, login, register, resetPassword, updateProfile } from "../controllers/user.controller.js";

const router = Router();

router.post('/signup', upload.single('avatar'), register);
router.post('/login', login)
router.put('/profile', upload.single('avatar'), updateProfile)
router.delete('/profile', deleteProfile)
router.post('/reset', forgetPassword)
router.post('/reset/:resetId', resetPassword)
router.post('/change-password', changePassword)

export default router;


