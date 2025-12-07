/* GLOBAL HELPERS */
const qs = sel => document.querySelector(sel);
const qsa = sel => Array.from(document.querySelectorAll(sel));

/* SMOOTH SCROLL for anchor links */
qsa('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

/* LOGO */
const logo = qs('#logo') || qs('.logo');
if(logo) logo.addEventListener('click', ()=> window.location.href = 'index.html');

/* MUSIC (polite autoplay attempt + toggle) */
const bgm = qs('#bgm');
const toggle = qs('#music-toggle');
let isPlaying = false;
if(toggle) toggle.textContent = '🔇';

function attemptPlay(){
  if(!bgm) return;
  bgm.play().then(()=> {
    isPlaying = true; if(toggle) toggle.textContent = '🔊';
  }).catch(()=>{ isPlaying = false; if(toggle) toggle.textContent = '🔇'; });
}

window.addEventListener('load', ()=> attemptPlay());
window.addEventListener('pointerdown', ()=> attemptPlay(), {once:true});
window.addEventListener('touchstart', ()=> attemptPlay(), {once:true});

if(toggle){
  toggle.addEventListener('click', ()=>{
    if(!bgm) return;
    if(isPlaying){ bgm.pause(); isPlaying = false; toggle.textContent = '🔇'; }
    else { bgm.play().then(()=>{ isPlaying = true; toggle.textContent = '🔊'; }).catch(()=>{}); }
  });
}

/* LIGHTBOX for gallery & menu click */
const lightbox = qs('#lightbox');
const lightboxImg = qs('#lightbox-img');
const lightboxClose = qs('#lightbox-close');

function openLightbox(src){
  if(!lightbox) return;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src = '';
}
if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=> { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e=> { if(e.key === 'Escape') closeLightbox(); });

qsa('.lightbox-trigger').forEach(img=>{
  img.addEventListener('click', ()=> openLightbox(img.dataset.full || img.src));
});

/* MENU CAROUSEL (manual next/prev + dots + swipe) */
const track = qs('.carousel-track');
const slides = qsa('.carousel-slide');
const prevBtn = qs('.carousel-btn.prev');
const nextBtn = qs('.carousel-btn.next');
const dotsWrap = qs('.carousel-dots');

let currentIndex = 0;
function updateCarousel(){
  if(!track) return;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  // update dots
  if(dotsWrap){
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d,i)=> d.classList.toggle('active', i===currentIndex));
  }
  // pre-load adjacent images (helps large JPG)
  const prev = slides[(currentIndex-1+slides.length)%slides.length];
  const next = slides[(currentIndex+1)%slides.length];
  [prev,next].forEach(s=>{ const img = s.querySelector('img'); if(img && img.dataset && img.dataset.src){ img.src = img.dataset.src; }});
}
if(slides.length && dotsWrap){
  dotsWrap.innerHTML = slides.map((_,i)=> `<span class="carousel-dot ${i===0?'active':''}" data-i="${i}"></span>`).join('');
  qsa('.carousel-dot').forEach(dot=>{
    dot.addEventListener('click', ()=> { currentIndex = Number(dot.dataset.i); updateCarousel(); });
  });
}
if(nextBtn) nextBtn.addEventListener('click', ()=> { currentIndex = (currentIndex+1)%slides.length; updateCarousel(); });
if(prevBtn) prevBtn.addEventListener('click', ()=> { currentIndex = (currentIndex-1+slides.length)%slides.length; updateCarousel(); });

// enable swipe for carousel
let startX = 0, moved=false;
const swipeZone = qs('.menu-carousel');
if(swipeZone){
  swipeZone.addEventListener('touchstart', e=> { startX = e.touches[0].clientX; moved=false; });
  swipeZone.addEventListener('touchmove', e=> { moved = true; });
  swipeZone.addEventListener('touchend', e=>{
    if(!moved) return;
    const dx = e.changedTouches[0].clientX - startX;
    if(Math.abs(dx) < 30) return;
    if(dx < 0) { currentIndex = (currentIndex+1)%slides.length; } else { currentIndex = (currentIndex-1+slides.length)%slides.length; }
    updateCarousel();
  });
}

// click on carousel image opens lightbox
qsa('.carousel-slide img').forEach((img, i)=>{
  img.addEventListener('click', ()=> openLightbox(img.src || img.dataset.src));
});

// reveal animations for promo & slides
const revealItems = document.querySelectorAll('.promo-card, .carousel-slide');
const revealObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'all 0.6s ease-out';
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:0.12});
revealItems.forEach(it=>{
  it.style.opacity = 0;
  it.style.transform = 'translateY(30px)';
  revealObserver.observe(it);
});

/* responsive fix: large images (2482x3509) -> object-fit:contain and limit max-height handled in CSS */
