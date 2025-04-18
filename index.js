const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS for external requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/:prompt', async (req, res) => {
  try {
    const prompt = req.params.prompt; // use as-is, like "cute_cat"
    const pollinationsUrl = `https://text.pollinations.ai/${prompt}`;

    const response = await axios.get(pollinationsUrl, {
      responseType: 'arraybuffer' // works for all content types
    });

    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error fetching from server');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
