const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/proxy', async (req, res) => {
  const encodedUrl = req.query.url;

  if (!encodedUrl) {
    return res.status(400).send('Missing "url" query parameter');
  }

  try {
    // Decode the URL to ensure proper forwarding
    const targetUrl = decodeURIComponent(encodedUrl);

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.swiggy.com/',
      },
    });

    const body = await response.text();
    res.status(response.status).send(body);
  } catch (error) {
    console.error('Error fetching target URL:', error.message);
    res.status(500).send('Error fetching target URL');
  }
});

app.listen(PORT, () => {
  console.log(`CORS Proxy server running on http://localhost:${PORT}`);
});
