const express = require('express');
const Crypto = require('../models/Crypto');
const router = express.Router();

router.get('/stats', async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: 'Coin parameter is required.' });

  try {
    const latestRecord = await Crypto.findOne({ coin }).sort({ createdAt: -1 });
    if (!latestRecord) return res.status(404).json({ error: 'No data found for the specified coin.' });

    res.json({
      price: latestRecord.price,
      marketCap: latestRecord.marketCap,
      change24h: latestRecord.change24h,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error occurred.' });
  }
});

router.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  if (!coin) return res.status(400).json({ error: 'Coin parameter is required.' });

  try {
    const last100Prices = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100).select('price');
    if (last100Prices.length < 2) return res.status(400).json({ error: 'Insufficient data for deviation calculation.' });

    const prices = last100Prices.map(record => record.price);
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
    const stdDev = Math.sqrt(variance);

    res.json({ deviation: stdDev.toFixed(2) });
  } catch (error) {
    res.status(500).json({ error: 'Server error occurred.' });
  }
});

module.exports = router;
