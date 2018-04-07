import mongoose, { Document, Model } from "mongoose";
import { IUrlModel } from "./url.model";

export interface IUrlModel extends Document {
  original_url: string;
  short_url: string;
}

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: [true, "URL must have an original url"],
    unique: true
  },

  short_url: {
    type: String,
    required: [true, "Song must have a url"],
    unique: true
  }
});

export const urlModel: Model<IUrlModel> = mongoose.model<IUrlModel>(
  "url",
  urlSchema
);
