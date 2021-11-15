const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//// Xác định các kiểu dữ liệu cho user

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);
const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
