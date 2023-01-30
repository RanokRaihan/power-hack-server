// extarnal imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//internal imports
const signupRouter = require("./router/signUpRouter");
const loginRouter = require("./router/loginRouter");
const logoutRouter = require("./router/logoutRouter");
const billingRouter = require("./router/billingRouter");
const authRouter = require("./router/authRouter");
const errorHandler = require("./middleware/errorHandler");
//init app
const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
//config environment variable
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6pukr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// connect database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err));

//request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// use routers
app.use("/registration", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/", billingRouter);
app.use("/getAuth", authRouter);

//error handler
app.use(errorHandler);
// run server
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
