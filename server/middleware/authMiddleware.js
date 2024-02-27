const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Checking if JWT exists and is verified
  if (token) {
    jwt.verify(token, "blerand secret", async (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.redirect("/login");
      } else {
        // console.log(decodedToken);
        const user = await User.findById(decodedToken.id);
        if (!user) {
          return res.redirect("/login");
        }
        if (user) {
          req.user = user;
          res.locals.user = user;
        }
        next();
      }
    });
  } else {
    req.user = null;
    res.redirect("/login");
  }
};

module.exports = requireAuth;
