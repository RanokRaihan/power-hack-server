const jwt = require("jsonwebtoken");

const authController = (req, res, next) => {
  //

  try {
    const token = req.cookies.token;

    if (token) {
      const verified = jwt.verify(token, process.env.JWT_SECRET);

      res.send({
        isLoggedIn: true,
        currentUser: {
          userId: verified.user,
          name: verified.name,
        },
      });
    } else {
      res.send({
        isLoggedIn: false,
        currentUser: null,
      });
    }
  } catch (error) {
    res.send({
      isLoggedIn: false,
      currentUser: null,
    });
  }
};
module.exports = authController;
