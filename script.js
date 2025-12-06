// Smooth scroll
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Music autoplay toggle
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

// Promo card animation
const promoCards = document.querySelectorAll('.promo-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
    }
  });
}, { threshold: 0.1 });

promoCards.forEach(card => {
  card.style.transform = 'translateY(50px)';
  card.style.opacity = '0';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});
