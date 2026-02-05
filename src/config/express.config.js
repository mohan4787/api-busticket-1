const express = require("express");
const router = require("./router.config");
const { deleteFile } = require("../utilities/helper,js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

// 404 handler
app.use((req, res, next) => {
  next({
    code: 404,
    message: "Router not found",
    status: "NOT_FOUND",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  const code = err.code || 500;
  const detail = err.detail || null;
  const msg = err.message || "Internal Server Error...";
  const status = err.status || "SERVER_ERROR";

  if(req.file) {
    deleteFile(req.file.path)
  }else if(req.files){
    req.files.forEach((file) => {
      deleteFile(file.path)
    })
  }

  res.status(code).json({
    error: detail,
    message: msg,
    status,
    options: null,
  });
});

module.exports = app;
