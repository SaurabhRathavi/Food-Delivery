const sendDevErrors = (req, res, error) => {
  res.status(error.statusCode).json({
    status: error.status,
    requestedAt: req.requestedAt,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";
  console.log(123, "error");

  sendDevErrors(req, res, error);
};
