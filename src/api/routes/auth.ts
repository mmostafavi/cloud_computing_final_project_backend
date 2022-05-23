import express from "express";
import AuthControllers from "../controllers/authController";

const router = express.Router();

router.route("/user/sign-in").post(AuthControllers.userSignIn);
router.route("/user/signup").post(AuthControllers.userSignup);

export default router;
