const axios = require('axios');
const Crypto = require('../models/Crypto');
const cron = require('node-cron');

const COIN_GECKO_API = 'https://api.coingecko.com/api/v3/simple/price';
const COINS = ['bitcoin', 'matic-network', 'ethereum'];

async function fetchCryptoData() {
  try {
    const response = await axios.get(COIN_GECKO_API, {
      params: {
        ids: COINS.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
    });

    for (const coin of COINS) {
      const { usd: price, usd_market_cap: marketCap, usd_24h_change: change24h } = response.data[coin];
      const newRecord = new Crypto({ coin, price, marketCap, change24h });
      await newRecord.save();
    }

    console.log('Crypto prices fetched and stored successfully!');
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
}

cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = { fetchCryptoData };
