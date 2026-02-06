const authRouter = require("express").Router();
const bodyValidator = require("../../middlewares/request-validate.middleware");
const uploader = require("../../middlewares/uploader.middleware");
const AuthController = require("./auth.controller");
const { RegisterDTO } = require("./auth.validator");

const authCtrl = new AuthController()

authRouter.post("/register",uploader().single('image'),bodyValidator(RegisterDTO),authCtrl.registerUser)
authRouter.get("/activate/:token",authCtrl.activateUser )
authRouter.post("/login", authCtrl.loginUser)
authRouter.post("/forget-password",authCtrl.forgetPasswordRequest)
authRouter.get("/forget-password-verify/:token", authCtrl.forgetPasswordTokenVerify)
authRouter.put("/reset-password",authCtrl.resetPassword)
authRouter.get("/me", authCtrl.loggedInUserProfile)
authRouter.get("/logout",authCtrl.logoutUser)
authRouter.put("/user/:id",authCtrl.updateUserById)
module.exports = authRouter