/* ----------------------------
  script.js — controls:
  - smooth scroll
  - music toggle & autoplay attempt
  - lightbox for gallery
  - promo/menu reveal animations
  - logo click => home
-------------------------------*/

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    const href = link.getAttribute('href');
    if(!href || href === "#") return;
    const target = document.querySelector(href);
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Logo click scroll to top/home
const logo = document.getElementById('logo');
if(logo){
  logo.addEventListener('click', ()=> {
    const home = document.getElementById('home');
    if(home) home.scrollIntoView({behavior:'smooth'});
  });
}

/* MUSIC: play only on user action in many mobile browsers.
   We try to be polite: attempt to play on first user gesture (click anywhere).
*/
const bgm = document.getElementById('bgm');
const toggle = document.getElementById('music-toggle');
let playing = false;

// set initial toggle icon
if(toggle) toggle.textContent = '🔇';

function safePlay(){
  if(!bgm) return;
  bgm.play().then(()=> {
    playing = true;
    if(toggle) toggle.textContent = '🔊';
  }).catch(()=> {
    // autoplay blocked — waiting for user interaction
    playing = false;
    if(toggle) toggle.textContent = '🔇';
  });
}

// Try auto-play once DOM loaded (may be blocked)
window.addEventListener('load', ()=> {
  safePlay();
});

// Also attempt to play on first user gesture
function onFirstGesture(){
  safePlay();
  window.removeEventListener('pointerdown', onFirstGesture);
  window.removeEventListener('touchstart', onFirstGesture);
}
window.addEventListener('pointerdown', onFirstGesture);
window.addEventListener('touchstart', onFirstGesture);

// Toggle button
if(toggle){
  toggle.addEventListener('click', ()=>{
    if(!bgm) return;
    if(playing){
      bgm.pause();
      playing = false;
      toggle.textContent = '🔇';
    } else {
      bgm.play().catch(()=>{/*ignore*/});
      playing = true;
      toggle.textContent = '🔊';
    }
  });
}

/* LIGHTBOX */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img'); // from earlier lightbox id usage
const lbClose = document.getElementById('lightbox-close');

function openLightbox(src){
  if(!lb) return;
  const img = lb.querySelector('img') || null;
  if(img) img.src = src;
  lb.classList.add('open');
  lb.setAttribute('aria-hidden','false');
}
function closeLightbox(){
  if(!lb) return;
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden','true');
  const img = lb.querySelector('img') || null;
  if(img) img.src = '';
}

// delegate clicks on elements with .lightbox-trigger or .menu-item to open
document.addEventListener('click', (e)=>{
  const t = e.target;
  // gallery thumbnails
  if(t.matches('.lightbox-trigger')){
    const full = t.dataset.full || t.src;
    openLightbox(full);
  }
  // menu item click opens full image
  if(t.closest && t.closest('.menu-item')){
    const item = t.closest('.menu-item');
    const src = item.dataset.media || (item.querySelector('img') && item.querySelector('img').src);
    if(src) openLightbox(src);
  }
  // close button
  if(t.matches('.lightbox-close') || t.matches('#lightbox') ){
    closeLightbox();
  }
});

// close lightbox on ESC
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeLightbox();
});

// Ensure lightbox close exists
if(lb && !lb.querySelector('img')){
  // create inner img and close if missing (for safety)
  const img = document.createElement('img'); lb.appendChild(img);
  const btn = document.createElement('button'); btn.className='lightbox-close'; btn.innerText='✕'; lb.appendChild(btn);
  btn.addEventListener('click', closeLightbox);
}

/* PROMO & MENU reveal animation (IntersectionObserver) */
const revealItems = document.querySelectorAll('.promo-card, .menu-item');
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
