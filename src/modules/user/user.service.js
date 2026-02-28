const UserModel = require("./user.model");

class UserService {
  getUserPublicProfile(user) {
    return {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      address: user.address,
      phone: user.phone,
      gender: user.gender,
      dob: user.dob,
      image: user.image,
      _id: user._id,
      createdBy: user.createdBy,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      updatedBy: user.updatedBy,
    };
  }

  getSingleUserByFilter = async (filter) => {
    try {
      const userData = await UserModel.findOne(filter);
      return userData;
    } catch (exception) {
      throw exception;
    }
  };
}

const userSvc = new UserService();
module.exports = userSvc;
