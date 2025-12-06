// script.js - Fitur interaktif untuk Shando'z Café

// Smooth Scroll untuk semua anchor link
const links = document.querySelectorAll('a[href^="#"]');
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Background Music Control
const bgm = document.getElementById('bgm');

// Tombol toggle musik
const musicToggle = document.createElement('button');
musicToggle.textContent = '🔊';
musicToggle.style.position = 'fixed';
musicToggle.style.bottom = '20px';
musicToggle.style.right = '20px';
musicToggle.style.fontSize = '1.5rem';
musicToggle.style.background = '#ff0066';
musicToggle.style.color = '#fff';
musicToggle.style.border = 'none';
musicToggle.style.borderRadius = '50%';
musicToggle.style.padding = '10px';
musicToggle.style.cursor = 'pointer';
document.body.appendChild(musicToggle);

let isPlaying = true;
musicToggle.addEventListener('click', () => {
  if(isPlaying){
    bgm.pause();
    musicToggle.textContent = '🔇';
  } else {
    bgm.play();
    musicToggle.textContent = '🔊';
  }
  isPlaying = !isPlaying;
});

// Animasi promo cards saat scroll
const promoCards = document.querySelectorAll('.promo-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.opacity = '1';
    }
  });
},{ threshold: 0.1 });

promoCards.forEach(card => {
  card.style.transform = 'translateY(50px)';
  card.style.opacity = '0';
  card.style.transition = 'all 0.6s ease-out';
  observer.observe(card);
});
