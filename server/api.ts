import express from "express";
import nanoid from "nanoid";
import { urlModel } from "./url.model";

export const apiRouter = express.Router();

const INVALID_URL_RESPONSE = { error: "Invalid URL" };

apiRouter.get("/shorturl/:id", async (req, res) => {
  const { id } = req.params;

  const foundUrl = await urlModel.findOne({
    short_url: id
  });

  if (foundUrl) {
    res.redirect(301, foundUrl.original_url);
  } else {
    res.json(INVALID_URL_RESPONSE);
  }
});

apiRouter.post("/shorturl/new", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.json(INVALID_URL_RESPONSE);
    return;
  }

  const foundUrl = await urlModel.findOne({
    original_url: url
  });

  if (foundUrl) {
    res.json({ original_url: url, short_url: foundUrl.short_url });
  } else {
    const newModel = await new urlModel({
      original_url: url,
      short_url: nanoid(10)
    }).save();
    res.json({ original_url: url, short_url: newModel.short_url });
  }
});
