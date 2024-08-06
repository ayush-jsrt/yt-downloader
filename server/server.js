const express = require('express');
const cors = require('cors');
const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap();

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('working');
});

app.get('/download', async (req, res) => {
  console.log('Download request received');
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).send('URL parameter is required');
  }

  try {
    const output = await ytDlpWrap.execPromise([
      url,
      '--no-check-certificates',
      '-f', 'bestaudio+bestvideo',
      '--print-json',
      '--no-playlist'
    ]);
    const info = JSON.parse(output);
    console.log(info.formats);

    const filteredFormats = info.formats.filter(f => f.format_id === '137' || f.format_id === '140');
    const [audio, video] = filteredFormats.filter(f => f.format_id === '140' || f.format_id === '137');
    const aud_vid = { audio: audio.url, video: video.url };

    res.send(aud_vid);
    return;
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});