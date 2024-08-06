const YTDlpWrap = require('yt-dlp-wrap').default;
const ytDlpWrap = new YTDlpWrap();

async function downloadYouTubeVideo(url, outputPath) {
  try {
    console.log('Starting download...');
    
    await ytDlpWrap.exec([
      url,
      '-f', 'bestvideo+bestaudio/best',
      '-o', outputPath,
      '--merge-output-format', 'mp4'
    ]);
    
    console.log('Download completed successfully!');
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

// Example usage
const videoUrl = 'https://www.youtube.com/watch?v=LDZX4ooRsWs';
const outputPath = '%(title)s.%(ext)s';

downloadYouTubeVideo(videoUrl, outputPath);