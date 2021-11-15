const tokenProvider = require("../tokenProvider");
const UserModel = require("../../modules/auth/user");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      throw new Error("Not have token");
    }
    const identityData = tokenProvider.verify(token);
    console.log(identityData);

    if (!identityData.userId) {
      throw new Error("Invalid token");
    }

    const existedUser = await UserModel.findById(identityData.userId);

    console.log(String(existedUser._id));
    if (!existedUser) {
      throw new Error("Not found user");
    }
    req.user = existedUser;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ success: 0, message: error.message || "UnAuthorized" });
  }
};

module.exports = isAuth;
