const { AuthRoutes } = require("../modules/auth/auth.routes");

const router = require("express").Router();

router.use("/auth", AuthRoutes);

router.get("/", (req, res) => {
  res.json("Hello");
});
module.exports = {
  AllRoutes: router,
};
