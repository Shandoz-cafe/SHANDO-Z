// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const target=document.querySelector(link.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth'});
  });
});

// Music toggle
const bgm = document.getElementById('bgm');
const toggle = document.getElementById('music-toggle');
bgm.volume = 1.0;
let isPlaying = true;
toggle.addEventListener('click', ()=>{
  if(isPlaying){ bgm.pause(); toggle.textContent='🔇'; }
  else{ bgm.play(); toggle.textContent='🔊'; }
  isPlaying = !isPlaying;
});

// Promo card animation
const promoCards = document.querySelectorAll('.promo-card');
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.transform='translateY(0)';
      entry.target.style.opacity='1';
    }
  });
},{threshold:0.1});

promoCards.forEach(card=>{
  card.style.transform='translateY(50px)';
  card.style.opacity='0';
  card.style.transition='all 0.6s ease-out';
  observer.observe(card);
});
