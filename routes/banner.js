const express = require('express');
const Banner = require('../models/banner');
const bannerRouter = express.Router();

// POST: Add new banner
bannerRouter.post('/banner', async (req, res) => {
  try {
    const { image } = req.body;
    const banner = new Banner({ image });
    await banner.save();
    return res.status(201).send(banner);
  } catch (e) {
    res.status(500).json({ error: e.message }); 
  }
});

// GET: Get all banners
bannerRouter.get('/banner', async (req, res) => {
  try {
    const banners = await Banner.find();
    return res.status(200).send(banners);
  } catch (e) {
    res.status(500).json({ error: e.message }); 
  }
});

module.exports = bannerRouter;
