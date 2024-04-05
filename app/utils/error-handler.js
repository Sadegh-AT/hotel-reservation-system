const createError = require("http-errors");
const { responseFormatter } = require("./functions");
const NotFoundError = (req, res, next) => {
  next(createError.NotFound("صفحه مورد نظر شما پیدا نشد"));
};
function validatorHandler(error) {
  const obj = {
    invalidParams: {},
  };

  error?.errors?.forEach((err) => {
    obj.inValidParams[err.path] = err.msg;
  });

  return error.errors ? obj : error;
}
const ErrorHandler = (err, req, res, next) => {
  console.log(req.url);
  const metadata = {
    url: req.url,
  };
  return res
    .status(err?.status || 500)
    .json(responseFormatter(err?.message, err.status, [], metadata, true));
};

module.exports = {
  NotFoundError,
  ErrorHandler,
  validatorHandler,
};
