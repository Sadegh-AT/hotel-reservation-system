const morgan = require("morgan");
const { NotFoundError, ErrorHandler } = require("./utils/error-handler");
const { connectToMongo } = require("./utils/mongoose-connection");
const express = require("express");
const { AllRoutes } = require("./routers/routes");
const cors = require("cors");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const RedisDB = require("./utils/redis-connection");

class Application {
  constructor(PORT, DB_URL, REDIS_URL) {
    this.configServer();
    this.configDatabase(DB_URL, REDIS_URL);
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }
  configServer() {
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(morgan("dev"));
  }

  configDatabase(DB_URL, REDIS_URL) {
    connectToMongo(DB_URL);
    RedisDB.connect();
  }

  createServer(PORT) {
    app.listen(PORT, () => {
      console.log(`Server Run on Port: ${PORT}`);
    });
  }

  createRoutes() {
    app.use(AllRoutes);
  }

  errorHandler() {
    app.use(NotFoundError);
    app.use(ErrorHandler);
  }
}

module.exports = Application;
