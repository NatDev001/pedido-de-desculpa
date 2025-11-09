document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const video = document.getElementById('video-desculpa');

  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');

    if (envelope.classList.contains('open')) {
      setTimeout(() => {
        video.play();
      }, 1000);
    } else {
      video.pause();
      video.currentTime = 0;
    }
  });
});
