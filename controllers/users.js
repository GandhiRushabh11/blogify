const mongoose = require("mongoose");
const users = require("../model/users");

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const UserData = await users.create({
      firstName,
      lastName,
      email,
      password,
      profilePhotoURL: `/uploads/user/${req.file.filename}`,
    });

    SendTokenToResponse(req, res, UserData);
    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).render("signup", { error: error });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const UserData = await users
      .findOne({ email: req.body.email })
      .select("+password");

    if (!UserData) return res.render("login", { error: "User not Found" });

    const ismatch = await UserData.isPasswordMatched(req.body.password);

    if (!ismatch) return res.render("login", { error: "Password Not Matched" });

    SendTokenToResponse(req, res, UserData);

    res.status(200).redirect("/");
  } catch (error) {
    res.render("login", { error });
  }
};

exports.getUser = async (req, res) => {
  const UserData = await users.findById(req.params.id);

  if (!UserData) return res.json({ Error: "User Not Found" });

  res.json({ UserData });
};
exports.getAllUsers = async (req, res) => {
  const UsersData = await users.find();
  res.render("manageUsers", { UsersData, user: req.user });
};

function SendTokenToResponse(req, res, users) {
  const token = users.getSignedToken();

  res.cookie("token", token);
}
