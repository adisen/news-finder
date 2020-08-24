const express = require("express");
const axios = require("axios");
const router = express.Router();

// @route   GET api/news/trending
// @desc    Get trending articles
// @access  Private
router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&page=${req.query.page}&apiKey=${process.env.NEWS_API}`
    );

    res.json({ articles: response.data });
  } catch (error) {
    console.error(error);
  }
});

// @route   GET api/news/search
// @desc    Get articles by search
// @access  Private
router.get("/search", async (req, res) => {
  // console.log(req.query.page);
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${req.query.text}&page=${req.query.page}&apiKey=${process.env.NEWS_API}`
    );

    res.json({ articles: response.data });
  } catch (error) {
    console.error(error);
  }
});

router.get("/searchBySouce", async (req, res) => {
  // console.log(req.query.source);

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?sources=${req.query.source}&page=${req.query.page}&apiKey=${process.env.NEWS_API}`
    );

    res.json({ articles: response.data });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
