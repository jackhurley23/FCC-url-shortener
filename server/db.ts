import mongoose from "mongoose";
import appConfig from "./config/index";
mongoose.Promise = global.Promise;

export const connect = (config = appConfig) => {
  return mongoose.connect(config.db.url);
};
