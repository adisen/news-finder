const express = require("express");
const axios = require("axios");
const router = express.Router();

// @route   GET api/news/trending
// @desc    Get trending articles
// @access  Private
router.get("/trending", async (req, res) => {
  const params = {
    api_key: process.env.BREAKING_API,
    type: "headlines",
    locale: "en-US",
    q: "trending",
  };
  try {
    const response = await axios.get("https://api.breakingapi.com/news", {
      params,
    });

    res.json({ articles: response.data.articles });
  } catch (error) {
    console.error(error);
  }
});

// @route   GET api/news/search
// @desc    Get articles by search
// @access  Private
router.get("/search", async (req, res) => {
  const params = {
    api_key: process.env.BREAKING_API,
    type: "headlines",
    locale: "en-US",
    q: req.query.text,
  };

  // console.log(req.query.text);

  console.log("Running");
  try {
    const response = await axios.get("https://api.breakingapi.com/news", {
      params,
    });
    // console.log(response);

    res.json({ articles: response.data.articles });
  } catch (error) {
    console.error(error);
  }
});

// @route   GET api/news/article
// @desc    Get single article
// @access  Private
router.get("/article", async (req, res) => {
  const params = {
    api_key: process.env.BREAKING_API,
    link: req.query.link,
  };

  console.log("Running");
  try {
    const response = await axios.get("https://api.breakingapi.com/articles", {
      params,
    });

    res.json({ article: response.data.article });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
