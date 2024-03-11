const RuleGuard = (rule) => {
  return (req, res, next) => {
    try {
      req.user;
    } catch (error) {
      next(error);
    }
  };
};

module.exports = { RuleGuard };
