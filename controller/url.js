const shortid = require("shortid");
const URL = require("../models/url");

async function handleAnalytic(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytic: result.visitHistory,
  });
}

async function handleGenrateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}
module.exports = {
  handleGenrateShortUrl,
  handleAnalytic,
};
