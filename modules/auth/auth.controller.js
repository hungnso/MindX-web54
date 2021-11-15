const bcrypt = require("bcryptjs");
const { sign, verify } = require("../../common/tokenProvider");
const UserModel = require("./user");

const singUp = async (req, res) => {
  try {
    console.log(req.body);
    const { fullname, username, password } = req.body;

    if (!fullname) {
      throw new Error("fullname không được để trống");
    }
    if (!username) {
      throw new Error("username không được để trống");
    }
    if (password && password.length < 6) {
      throw new Error("password cần ít nhất 6 kí tự");
    }
    //// Kiểm tra xem username có bị trùng hay không?
    const exitsedUser = await UserModel.findOne({ username });
    if (exitsedUser) {
      throw new Error("Đăng kí thất bại");
    }
    //// Mã hóa password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      fullname,
      username,
      password: hashPassword,
    });

    const token = sign(newUser._id);

    res.send({
      success: 1,
      data: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        token,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);

    const exitstedUser = await UserModel.findOne({ username });
    console.log(exitstedUser);
    if (!exitstedUser) {
      throw new Error("Đăng nhập thất bại(_ không tồn tại user này)");
    }
    const hashPassword = exitstedUser.password;
    const matchedPassword = await bcrypt.compare(password, hashPassword);

    if (!matchedPassword) {
      throw new Error("Đăng nhập thất bại(_Mật khẩu không chính xác)");
    }

    const token = sign(exitstedUser._id);
    // const test = verify(token);
    res.send({
      success: "Đăng nhập thành công",
      data: {
        _id: exitstedUser._id,
        fullname: exitstedUser.fullname,
        username: exitstedUser.username,
        token,
      },
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = {
  singUp,
  login,
};
