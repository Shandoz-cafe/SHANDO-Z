// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Logo → balik ke Home
document.querySelector('.logo').addEventListener('click', () => {
  document.querySelector('#home').scrollIntoView({ behavior: "smooth" });
});

// MUSIC CONTROL
const bgm = document.getElementById("bgm");
const toggle = document.getElementById("music-toggle");

// iPhone & Chrome autoplay fix → user must click first
let isPlaying = false;

toggle.addEventListener("click", () => {
  if (!isPlaying) {
    bgm.play();
    toggle.textContent = "🔊";
  } else {
    bgm.pause();
    toggle.textContent = "🔇";
  }
  isPlaying = !isPlaying;
});

// Promo animation fade-in
const promoCards = document.querySelectorAll(".promo-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

promoCards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.6s ease-out";
  observer.observe(card);
});
