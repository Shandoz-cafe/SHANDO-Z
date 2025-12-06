// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Music autoplay after first scroll
const bgm = document.getElementById('bgm');
let isPlaying = false;
const toggle = document.getElementById('music-toggle');

function startMusic() {
  if (!isPlaying) {
    bgm.play().catch(e => console.log('Autoplay blocked, user must interact.'));
    isPlaying = true;
    toggle.textContent = '🔊';
    window.removeEventListener('scroll', startMusic);
  }
}
window.addEventListener('scroll', startMusic, { once: true });

// Music toggle button
toggle.addEventListener('click', () => {
  if(isPlaying){
    bgm.pause();
    toggle.textContent = '🔇';
    isPlaying = false;
  } else {
    bgm.play();
    toggle.textContent = '🔊';
    isPlaying = true;
  }
});

// Promo card animation
document.querySelectorAll('.promo-card').forEach(card => {
  card.style.transform = 'translateY(30px)';
  card.style.opacity = '0';
  card.style.transition = 'all 0.5s ease-out';
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
      }
    });
  }, { threshold: 0.1 });
  observer.observe(card);
});
