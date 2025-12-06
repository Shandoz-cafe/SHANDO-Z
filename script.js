// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Music toggle
const bgm = document.getElementById('bgm');
const toggle = document.getElementById('music-toggle');
let isPlaying = true;
toggle.addEventListener('click', () => {
  if (isPlaying) { bgm.pause(); toggle.textContent = '🔇'; }
  else { bgm.play(); toggle.textContent = '🔊'; }
  isPlaying = !isPlaying;
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
