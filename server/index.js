const express = require("express");
const bodyParser = require("body-parser");
const adminRouter = require("./routes/Admin");
const userRouter = require("./routes/User");

const app = express();
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
