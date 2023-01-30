const logoutController = (req, res) => {
  //
  try {
    res
      .cookie("token", "", {
        httpOnly: false,
        expires: new Date(0),
      })
      .json({
        message: "logout successful",
      });
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
};

module.exports = logoutController;
