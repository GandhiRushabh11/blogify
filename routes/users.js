const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createUser,
  loginUser,
  getUser,
  getAllUsers,
} = require("../controllers/users");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/user");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .get("/login", (req, res) => {
    res.render("login");
  })
  .post("/login", loginUser);

router
  .get("/signup", (req, res) => {
    res.render("signup");
  })
  .post("/signup", upload.single("uploaded_file"), createUser);

router
  .get("/", getAllUsers)
  .get("/manageUsers", getAllUsers)
  .get("/:id", getUser);
module.exports = router;
