const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: false });

async function combineMedia(audioURL, videoURL) {
    document.getElementById('loading').style.display = 'block';
    await ffmpeg.load();

    console.log('ffmpeg loaded');
    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(videoURL));
    ffmpeg.FS('writeFile', 'audio.m4a', await fetchFile(audioURL));

    await ffmpeg.run('-i', 'video.mp4', '-i', 'audio.m4a', '-c:v', 'copy', '-c:a', 'aac', '-map', '0:v:0', '-map', '1:a:0', 'output.mp4');

    const data = ffmpeg.FS('readFile', 'output.mp4');
    const videoBlob = new Blob([data.buffer], { type: 'video/mp4' });

    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(videoBlob);
    downloadLink.download = 'combined_video.mp4';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}