const signupValidator = (req, res, next) => {
    const { name, email, mobile, password, confirmPassword } = req.body;
    if (!name || !email || !mobile) {
        next("Fillup the form first");
    }
    if (password.length < 6) {
        next("password must be at least 6 charecter");
    }
    if (!email.includes("@")) {
        next("Enter correct email");
    }
    if (mobile.length < 11) {
        next("enter 11 digit mobile number");
    }
    if (password !== confirmPassword) {
        next("please retype the password correctly");
    }
    next();
};
const loginValidator = (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
        next("Fillup the form first");
    }
    next();
};

module.exports = { signupValidator, loginValidator };
