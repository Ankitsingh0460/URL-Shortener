
const { handleGenrateShortUrl, handleAnalytic } = require("../controller/url")
const express = require("express");
const router = express.Router();



router.post("/", handleGenrateShortUrl);

router.get("/analytics/:shortId", handleAnalytic)

module.exports = router;