const { string, required, object } = require("joi");
const mongoose = require("mongoose");
const { USER_ROLES, Status, GENDER } = require("../../config/constants");
const { act } = require("react");

const UserSchema = new mongoose.Schema({
  name: {
    type: string,
    min: 2,
    max: 50,
    required: true,
  },
  email: {
    type: string,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
  },
  role: {
    type: string,
    enum: object.values(USER_ROLES),
    default: USER_ROLES.PASSENGER,
  },
  status: {
    type: string,
    enum: object.values(Status),
    default: Status.INACTIVE,
  },
  address: {
    billingAddress: string,
    shippingAddress: string,
  },
  phone: {
    type: string,
  },
  gender: {
    type: string,
    enum: object.values(GENDER),
  },
  dob: Date,
  activationToken: string,
  forgetPasswordToken: string,
  expiryTime: Date,
  image: {
    publicId: string,
    secureUrl: string,
    optimizedUrl: string,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
