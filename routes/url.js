const express = require("express");
const router = express.Router();
const {handleGenerateNewShortUrl,handlegetanalytics} = require("../controllers/url");

router.post("/",handleGenerateNewShortUrl);

router.get('/analytics/:shortId',handlegetanalytics);

module.exports = router;