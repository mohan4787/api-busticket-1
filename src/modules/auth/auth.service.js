const bcrypt = require("bcryptjs");
const cloudinarySvc = require("../../services/cloudinary.service");
const { Status } = require("../../config/constants");
const { randomStringGenerator } = require("../../utilities/helper");
const { AppConfig } = require("../../config/config");
const emailSvc = require("../../services/email.service");
const UserModel = require("../user/user.model");

class AuthService {
  async transformUserCreate(req) {
    try {
      const data = req.body;
      if (req.file) {
        data.image = await cloudinarySvc.fileUpload(req.file.path, "/user/");
      }
      data.password = bcrypt.hashSync(data.password, 12);
      data.status = Status.INACTIVE;
      data.activationToken = randomStringGenerator(100);
      const {confirmPassword, ...mappedData} = data;
      return mappedData;
    } catch (exception) {
      throw exception;
    }
  }

  async createUser(data) {
    try {
      const user = new UserModel(data)
      return await user.save()
    } catch (exception) {
      throw exception
    }
  }

  async sendActivationNotification(user) {
    try {
      await emailSvc.sendEmail({
        to: user.email,
        sub: "Account activation",
        msg: `Dear ${user.name},thank for registering with us.
         <br> Please click the link below to activate your account <br> 
         <a href="${AppConfig.frontendUrl}/activate/${user.activationToken}">Activate Account</a>
         regards,
         System Administration,
         Please do not reply to this email. Contact support if you have any questions.
         Note: Please copy the link incase the button is not working: ${AppConfig.frontendUrl}/activate/${user.activationToken}`,
      });
    } catch (exception) {
      throw exception;
    }
  }
}

const authSvc = new AuthService()
module.exports = authSvc;
