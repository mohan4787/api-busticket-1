const { AppConfig } = require("../../config/config");
const { Status } = require("../../config/constants");
const userSvc = require("../user/user.service");
const authSvc = require("./auth.service");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


class AuthController {
  registerUser = async (req, res, next) => {
    try {
      const data = await  authSvc.transformUserCreate(req);
      let user = await userSvc.createUser(data);

      await authSvc.sendActivationNotification(user);

        res.json({
        data: userSvc.getUserPublicProfile(user),
        message: "User registration successful. Please check your email to activate your account.",
        status: "Success",
        options: null,
      });
    } catch (exception) {
      next(exception);
    }
  };

  activateUser = async (req, res, next) => {
   try {
    const token = req.params.token
    const userDetail = await userSvc.getSingleUserByFilter({
      activationToken: token
    });

    if(!userDetail) {
      throw {
        code: 404,
        message:"user associated token not found or has been already activated.",
        status: "NOT_FOUND"
      }
    }
    const updatedUser = await userSvc.updateSingleUserByFilter({
      _id: userDetail._id
    }, {
      status: Status.ACTIVE,
      activationToken: null
    });
    await authSvc.newUserWelcomeEmail(updatedUser)
    res.json({
      data: null,
      message: "Account activated successfully. You can now login.",
      status: "ACTIVATED SUCCESSFULLY",
      options: null,
    })
   } catch (exception) {
    next(exception);
   }
  };

  loginUser = async (req, res, next) => {
   try {
    const {email,password} = req.body;
    const userDetail = await userSvc.getSingleUserByFilter({
      email: email
    })
     if(!userDetail) {
        throw {
          code: 422,
          message: "Email is not registered.",
          status: "EMAIL_NOT_rEGISTERED"
        }
      }
      if(!bcrypt.compareSync(password, userDetail.password)) {
         throw {
          code: 422,
          message: "Credentials does not match.",
          status: "CREDENTIAL_DOES_NOT_MATCH"
        }
      }
      if(userDetail.status !== Status.ACTIVE || userDetail.activationToken !== null) {
         throw {
          code: 422,
          message: "User not activated.",
          status: "USER_NOT_ACTIVATED"
        }
      }
      const accessToken = jwt.sign({
        sub: userDetail._id,
        typ: "Bearer"
      }, AppConfig.jwtSecret, {
        expiresIn: "1h"
      })
      const refreshToken = jwt.sign({
        sub: userDetail._id,
        typ: "Refresh"
      }, AppConfig.jwtSecret, {
        expiresIn: "1d"
      })
      res.json({
        data: {
          accessToken,
          refreshToken
        },
        message: "Welcome to "+userDetail.role+"Pannel",
        status: "LOGIN_SUCCESS",
        options: null
      })
   } catch (exception) {
    next(exception)
   }
  };
  forgetPasswordRequest = (req, res, next) => {
    res.json({
      data: null,
      message: "forget password",
      status: "Sucess",
      options: null,
    });
  };
  forgetPasswordTokenVerify = (req, res, next) => {
    res.json({
      data: req.params.token,
      message: "verify token",
      status: "Sucess",
      options: null,
    });
  };
  resetPassword = (req, res, next) => {
    res.json({
      data: null,
      message: "Reset password",
      status: "Sucess",
      options: null,
    });
  };
  loggedInUserProfile = (req, res, next) => {
    res.json({
      data: null,
      message: "me route ",
      status: "Sucess",
      options: null,
    });
  };
  logoutUser = (req, res, next) => {
    res.json({
      data: null,
      message: "logot router ",
      status: "Sucess",
      options: null,
    });
  };
  updateUserById = (req, res, next) => {
    res.json({
      data: req.params.id,
      message: "user update",
      status: "Sucess",
      options: null,
    });
  };
}

module.exports = AuthController;
