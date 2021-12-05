// require("../../db/db");
const UserModel = require("../../db/models/UserModel");
// const courseModel = require("../../db/models/courseModel")
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  let { name, email, password } = req.body;

  try {
    const checkEmail = await UserModel.find({ email: email });
    if (checkEmail.length == 0) {
      password = await bcrypt.hash(password, 10);
      const newUserAccount = new UserModel({ name, email, password });
      const saving = await newUserAccount.save();
      res.status(201).json(newUserAccount);
    } else {
      res.status(201).send("You are already have account.");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = { newUser };
