const createHttpError = require("http-errors");

const RuleGuard = (rule) => {
  return (req, res, next) => {
    try {
      if (!req.user.rules.includes(rule))
        throw createHttpError.Forbidden("شما دسترسی مورد نیاز را ندارید");
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { RuleGuard };
