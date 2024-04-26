const autoBind = require("auto-bind");
const HotelModel = require("./hotel.model");
const { responseFormatter } = require("../../utils/functions");
const RedisDB = require("../../utils/redis-connection");
const { json } = require("express");
const RedisKey = require("../../constant/redis.key");

class RoomService {
  constructor() {
    autoBind(this);
  }

  async create(dto) {
    const hotel = await HotelModel.create(dto);
    await RedisDB.del(RedisKey.Hotels);
    const keys = await RedisDB.keys(RedisKey.HotelSearch({ name: "*" }));
    await RedisDB.del(keys);

    return hotel;
  }
  async getAllHotels() {
    console.log(RedisKey.HotelSearch({ name: "" }));

    const hotels = await RedisDB.get(RedisKey.Hotels);
    if (hotels) return JSON.parse(hotels);
    const hotel = await HotelModel.find(
      {},
      { _id: 1, name: 1, address: 1, rates: 1, price: 1, rooms: 1 }
    );

    await RedisDB.set(RedisKey.Hotels, JSON.stringify(hotel));
    return hotel;
  }
  async get(id) {
    const redisHotelValue = await RedisDB.get(RedisKey.HotelId(id));
    if (redisHotelValue) return JSON.parse(redisHotelValue);
    const hotel = await HotelModel.findById(id).populate("rooms");
    await RedisDB.set(RedisKey.HotelId(id), JSON.stringify(hotel));
    return hotel;
  }
  async remove(id) {
    await RedisDB.del(RedisKey.HotelId(id));
    return await HotelModel.deleteOne({ _id: id });

    // return await HotelModel.deleteMany({ name: "Hs" });
  }
  async find(name, query) {
    const reg = new RegExp(name, "gi");
    const redisVal = await RedisDB.get(RedisKey.HotelSearch(query));

    if (redisVal) return JSON.parse(redisVal);
    const findedHotels = await HotelModel.find({ name: { $regex: reg } });
    await RedisDB.set(
      RedisKey.HotelSearch(query),
      JSON.stringify(findedHotels)
    );
    return findedHotels;
    // return await HotelModel.deleteMany({});
  }
}
module.exports = new RoomService();
