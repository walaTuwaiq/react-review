// require("../../db/db");
const UserModel = require("../../db/models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  let { email, password } = req.body;
    // res.send({email,password})
  try {
    const user = await UserModel.findOne({ email:email });
    if (user) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        const payload = { userId: user._id, userName: user.name };
        const token = jwt.sign(payload, "ABC");
        res.status(201).json({ token,payload });
      } else {
        res.status(403).send("wrong password!");
      }
    } else {
      res.status(403).send("You're don't have an account.");
    }

    // password = await bcrypt.hash(password, 10);
    // const newUserAccount = new signUpModel({ name, email, password });
    // const saving = await newUserAccount.save();
    // res.status(201).json(newUserAccount);
  } catch (error) {
    res.send("error");
  }
};

module.exports = { login };
