import express from "express";
import userController from "./userController";

const userRouter = express.Router();

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);

export { userRouter };
