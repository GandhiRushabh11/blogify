const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = new express();
const ejs = require("ejs");
const path = require("path");
const { connectDb } = require("./config/connectDb");
const blog = require("./model/blog");
const userRouter = require("./routes/users");
const blogRouter = require("./routes/blog");
const commentRouter = require("./routes/comment");
const { protect } = require("./middleware/auth");
//Load env Data
dotenv.config({ path: "./config/config.env" });

//ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Coonect DB
connectDb();

app.use(express.json());
app.use("/public/", express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(protect());
app.use("/users", userRouter);
app.use("/blog", blogRouter);
app.use("/blog/comment", commentRouter);
app.get("/", async (req, res) => {
  const blogData = await blog.find();
  res.render("index", {
    user: req.user,
    blogs: blogData,
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/");
});
app.listen(process.env.PORT, () =>
  console.log(`Server Listening on ${process.env.PORT}`)
);
