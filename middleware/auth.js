const jwt = require("jsonwebtoken");
const users = require("../model/users");
exports.protect = function () {
  return async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Set token from Bearer token in header
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      // Set token from cookie
      token = req.cookies?.token;
    }

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SCRECT_KEY);
      req.user = await users.findById(decoded.id);
      console.log(req.user);
      next();
    } catch (error) {
      return next();
    }
  };
};
