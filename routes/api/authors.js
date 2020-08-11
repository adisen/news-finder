const express = require("express");
const axios = require("axios");
const router = express.Router();

// @route   GET api/author/
// @desc    Get author's profile
// @access  Private
router.get("/", async (req, res) => {
  const query = {
    api_key: process.env.ROCKET_API,
    name: req.query.name,
    company: req.query.company,
  };

  try {
    const resp = await axios.get(
      `https://api.rocketreach.co/v1/api/lookupProfile?api_key=${query.api_key}&name=${query.name}&current_employer=${query.company}`
    );

    if (res.status === "404") {
      return res.json({ author: null });
    }

    console.log(resp.data);
    res.json({ author: resp.data[0] });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
