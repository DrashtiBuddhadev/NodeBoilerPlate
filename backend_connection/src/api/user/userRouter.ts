import express from "express";
import userController from "./userController";

const router = express.Router();

router.post("/signup", userController.signUp);
router.post("/login", userController.login);

export default router;
