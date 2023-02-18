const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

const userRouter = require("./src/routes/userRoute");
const userCourseRoute = require("./src/routes/userCourseRoute");
const courseRouter = require("./src/routes/courseRoute");
const courseCategoryRouter = require("./src/routes/courseCategoryRoute");
const authRouter = require("./src/routes/authRoute");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userRouter);
app.use("/api/kelas/user", userCourseRoute);
app.use("/api/kelas/kategori", courseCategoryRouter);
app.use("/api/kelas", courseRouter);

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server Berjalan di Port : ${PORT}`);
});
