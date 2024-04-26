const { objectToQueryParams } = require("../utils/functions");

const RedisKey = Object.freeze({
  LoggedOutTokens: "loggedOutTokens",
  Hotels: "hotel:all",
  HotelId: (id) => `hotel:${id}`,
  HotelSearch: (query) => `hotel:${objectToQueryParams(query)}`,
});
module.exports = RedisKey;
