// Smooth scroll
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Music toggle
const bgm = document.getElementById('bgm');
const toggle = document.getElementById('music-toggle');
bgm.volume = 1.0;
let isPlaying = true;
toggle.addEventListener('click', () => {
  if(isPlaying){
    bgm.pause();
    toggle.textContent = '🔇';
  } else {
    bgm.play();
    toggle.textContent = '🔊';
  }
  isPlaying = !isPlaying;
});

function scrollToHome() {
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}
