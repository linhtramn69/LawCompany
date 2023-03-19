const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// define Route
const ApiError = require("./app/api-error");
const fieldRoute = require("./app/routes/field.route");
const serviceRoute = require("./app/routes/service.route");
const userRoute = require("./app/routes/user.route");
// const customerRoute = require("./app/routes/customer.route");
const degreeRoute = require("./app/routes/degree.route");
const typeDegreeRoute = require("./app/routes/typeDegree.route");
const chucVuRoute = require("./app/routes/chucVu.route");
const boPhanRoute = require("./app/routes/boPhan.route");
const phuCapRoute = require("./app/routes/phuCap.route");
const salaryRoute = require("./app/routes/salary.route");
const registerFormRoute = require("./app/routes/registerForm.route");
const contractRoute = require("./app/routes/contract.route");
const fileRoute = require("./app/routes/file.route");
const periodRoute = require("./app/routes/period.route");
const documentRoute = require("./app/routes/document.route");
const imageRoute = require("./app/routes/image.route");
const billRoute = require("./app/routes/bill.route");
const thanhToanRoute = require("./app/routes/thanhToan.route");
const timeAppointmentRoute = require("./app/routes/timeAppointment.route");

// use Route
app.use("/api/field", fieldRoute);
app.use("/api/service", serviceRoute);
app.use("/api/user", userRoute);
// app.use("/api/customer", customerRoute);
app.use("/api/degree", degreeRoute);
app.use("/api/type-degree", typeDegreeRoute);
app.use("/api/bo-phan", boPhanRoute);
app.use("/api/chuc-vu", chucVuRoute);
app.use("/api/phu-cap", phuCapRoute);
app.use("/api/salary", salaryRoute);
app.use("/api/register-form", registerFormRoute);
app.use("/api/contract", contractRoute);
app.use("/api/file", fileRoute);
app.use("/api/period", periodRoute);
app.use("/api/document", documentRoute);
app.use("/api/image", imageRoute);
app.use("/api/bill", billRoute);
app.use("/api/hinh-thuc-thanh-toan", thanhToanRoute);
app.use("/api/time-appointment", timeAppointmentRoute);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

// define error 
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal server Error",
    });
});

module.exports = app;