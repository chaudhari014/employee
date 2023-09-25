const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const { employeeRoute } = require("./routes/employee.routes");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/", userRoute);
app.use("/", employeeRoute);

app.listen(7050, async () => {
  try {
    await connection;
    console.log("start database");
  } catch (error) {
    console.log(error);
  }
  console.log("server started");
});
