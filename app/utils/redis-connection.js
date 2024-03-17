const { createClient } = require("redis");

class ConnectToRedis {
  constructor(REDIS_URL) {
    this.Url = REDIS_URL;
    // this.client =
  }
  connect() {
    this.client
      .connect()
      .then(() => {
        console.log(`Connect to Redis: ${this.Url}`);
      })
      .catch((error) => {
        throw error;
      });
  }
  static getClient() {
    return this.client;
  }
}

module.exports = { ConnectToRedis };
