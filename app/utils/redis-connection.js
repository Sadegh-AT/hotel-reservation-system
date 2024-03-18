const { createClient } = require("redis");

class ConnectToRedis {
  constructor(REDIS_URL) {
    this.Url = REDIS_URL;
    this.client = createClient({ url: this.Url });
  }
  connect() {
    this.client
      .connect()
      .then(() => {
        console.log(`Connect to Redis: ${this.Url}`);
      })
      .catch((err) => {
        throw err;
      });
  }
  async set(key, value, callback) {
    return await this.client.set(key, value, callback);
  }

  async get(key, callback) {
    return await this.client.get(key, callback);
  }
}
require("dotenv").config();
module.exports = new ConnectToRedis(process.env.REDIS_URL);
