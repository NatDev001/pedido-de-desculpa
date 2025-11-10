document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const video = document.getElementById('video-desculpa');
  const imageDisplay = document.getElementById('image-display');
  const botoesContainer = document.querySelector('.botoes-container');
  const btnNao = document.getElementById("btn-nao");

  let initialVideoPlayed = false;
  let movimentoIniciado = false;
  let intervaloMovimento = null;

  const listaMedia = [
    "videos/IMG-20251108-WA0164.jpg",
    "videos/IMG-20251108-WA0165.jpg",
    "videos/IMG-20251108-WA0166.jpg",
    "videos/IMG-20251108-WA0167.jpg",
    "videos/IMG-20251108-WA0168.jpg",
    "videos/IMG-20251108-WA0169.jpg",
    "videos/IMG-20251108-WA0170.jpg",
    "videos/IMG-20251108-WA0171.jpg",
    "videos/IMG-20251108-WA0172.jpg",
    "videos/VID-20251108-WA0028.mp4",
    "videos/VID-20251108-WA0029.mp4",
    "videos/VID-20251108-WA0030.mp4",
    "videos/VID-20251108-WA0031.mp4",
    "videos/VID-20251108-WA0032.mp4",
    "videos/VID-20251108-WA0033.mp4",
    "videos/VID-20251108-WA0034.mp4",
    "videos/VID-20251108-WA0035.mp4",
    "videos/VID-20251108-WA0036.mp4",
    "videos/VID-20251108-WA0037.mp4",
    "videos/VID-20251108-WA0038.mp4",
    "videos/VID-20251108-WA0039.mp4",
    "videos/VID-20251108-WA0040.mp4",
    "videos/VID-20251108-WA0041.mp4",
    "videos/VID-20251108-WA0042.mp4",
    "videos/VID-20251108-WA0043.mp4",
  ];

  function moverBotao() {
    const maxX = window.innerWidth - btnNao.offsetWidth;
    const maxY = window.innerHeight - btnNao.offsetHeight;
    const novoX = Math.random() * maxX;
    const novoY = Math.random() * maxY;
    btnNao.style.left = `${novoX}px`;
    btnNao.style.top = `${novoY}px`;
  }

  video.addEventListener('ended', () => {
    if (video.src.includes('dsclp.mp4')) {
      initialVideoPlayed = true;
    }
    botoesContainer.classList.add('visible');
  });

  btnNao.addEventListener("click", () => {
    if (!movimentoIniciado) {
      movimentoIniciado = true;
      intervaloMovimento = setInterval(moverBotao, 1200)
      btnNao.classList.add("correndo");
    }
    moverBotao();

    const novoMedia = listaMedia[Math.floor(Math.random() * listaMedia.length)];

    video.classList.remove('active');
    imageDisplay.classList.remove('active');
    video.pause();
    video.currentTime = 0;

    if (novoMedia.endsWith('.mp4')) {
      video.src = novoMedia;
      video.load();
      video.play();
      video.classList.add('active');
    } else {
      imageDisplay.src = novoMedia;
      imageDisplay.classList.add('active');
      setTimeout(() => {
        botoesContainer.classList.add('visible');
      }, 4000); // Mostra botões após 4 segundos para imagens
    }
  });

  video.addEventListener("loadedmetadata", () => {
    if (video.duration < 5) {
      video.loop = true;
    } else {
      video.loop = false;
    }
  });

  envelope.addEventListener('click', () => {
    envelope.classList.toggle('open');

    if (envelope.classList.contains('open')) {
      video.classList.add('active');
      setTimeout(() => {
        video.play();
      }, 1000);
    } else {
      video.pause();
      video.currentTime = 0;
      botoesContainer.classList.remove('visible');
      video.classList.remove('active');
      imageDisplay.classList.remove('active');
      initialVideoPlayed = false;
      // Reset button position and movement
      if (movimentoIniciado) {
        clearInterval(intervaloMovimento);
        movimentoIniciado = false;
        btnNao.style.left = '';
        btnNao.style.top = '';
      }
    }
  });
});
