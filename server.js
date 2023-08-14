require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(helmet());

const API_KEYS = {
  'ASIN_API_KEY': process.env.ASIN_API_KEY,
  'GOOGLE_API_KEY': process.env.GOOGLE_API_KEY,
  'GOOGLE_ENGINE_ID': process.env.GOOGLE_ENGINE_ID,
  'GPT_API_KEY': process.env.GPT_API_KEY,
  'YAHOO_API_KEY': process.env.YAHOO_API_KEY,
  'RAKUTEN_API_KEY' : process.env.RAKUTEN_API_KEY
};

const APP_TOKEN = process.env.APP_TOKEN;

// const limiter = rateLimit({
//   windowMs: 30 * 1000,
//   max: 5,
//   message: 'Too many requests from this IP'
// });

app.use('/get_api_key/:api_name');

app.get('/get_api_key/:api_name', (req, res) => {
  const token = req.headers['authorization'];

  if (!token || token !== APP_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const key = API_KEYS[req.params.api_name];

  if (key) {
    return res.json({ api_key: key });
  } else {
    return res.status(404).json({ error: 'API not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
