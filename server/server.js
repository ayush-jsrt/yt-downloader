const express = require('express');
const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap();

const app = express();

app.get('/', (req, res) => {
  res.send('working');
});

app.get('/download', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).send('URL parameter is required');
  }

  try {
    const info = await ytDlpWrap.getVideoInfo(url);
    console.log(info.formats);
    const format = info.formats.find(f => f.format_id === '22') || info.formats[0];

    res.header('Content-Disposition', `attachment; filename="${info.title}.mp4"`);
    res.header('Content-Type', 'video/mp4');

    const video = await ytDlpWrap.execStream([
      url,
      '-f', format.format_id,
    ]);

    video.pipe(res);

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while processing your request');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});