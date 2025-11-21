// ====== Simple loader control ======
document.addEventListener('DOMContentLoaded', function () {
  // simulate loading for demo — set shorter or longer
  setTimeout(hideLoader, 900);

  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // live status demo variable (set true to show LIVE)
  // In production, set isLive based on YouTube Data API or your streaming flag
  let isLive = false; // change to true to test LIVE UI
  updateLiveUI(isLive);

  // slider setup
  initSlider();

  // particles
  initParticles();

  // join button example
  document.getElementById('joinBtn').addEventListener('click', ()=> alert('Join link / Discord invite (replace)'));
});

function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.style.opacity = 0;
  setTimeout(()=> loader.remove(), 700);
}

// update live UI
function updateLiveUI(isLive){
  const livePill = document.getElementById('livePill');
  const liveIndicator = document.getElementById('liveIndicator');
  if(isLive){
    if(livePill) livePill.style.display = 'flex';
    if(liveIndicator) { liveIndicator.textContent = 'LIVE'; liveIndicator.classList.remove('offline'); liveIndicator.classList.add('online'); }
  } else {
    if(livePill) livePill.style.display = 'none';
    if(liveIndicator) { liveIndicator.textContent = 'OFFLINE'; liveIndicator.classList.remove('online'); liveIndicator.classList.add('offline'); }
  }
}

// ====== basic slider ======
function initSlider(){
  const slider = document.getElementById('slider');
  if(!slider) return;
  const slidesWrap = slider.querySelector('.slides');
  const slides = slidesWrap.children;
  let index = 0;
  const total = slides.length;
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  function go(i){
    index = (i + total) % total;
    slidesWrap.style.transform = `translateX(-${index * 100}%)`;
  }
  if(nextBtn) nextBtn.addEventListener('click', ()=> go(index+1));
  if(prevBtn) prevBtn.addEventListener('click', ()=> go(index-1));

  // autoplay
  let autoplay = setInterval(()=> go(index+1), 4500);
  slider.addEventListener('mouseenter', ()=> clearInterval(autoplay));
  slider.addEventListener('mouseleave', ()=> autoplay = setInterval(()=> go(index+1), 4500));
}

// ====== particles (canvas) ======
function initParticles(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const arr = [];
  const PARTICLES = Math.floor((w*h)/60000); // density

  window.addEventListener('resize', ()=> {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  });

  function rand(min,max){ return Math.random()*(max-min)+min; }

  for(let i=0;i<Math.max(20, PARTICLES); i++){
    arr.push({
      x: rand(0,w),
      y: rand(0,h),
      r: rand(0.6,2.6),
      vx: rand(-0.2,0.2),
      vy: rand(-0.15,0.15),
      hue: rand(0,360)
    });
  }

  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const p of arr){
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < -10) p.x = w+10;
      if(p.x > w+10) p.x = -10;
      if(p.y < -10) p.y = h+10;
      if(p.y > h+10) p.y = -10;

      const g = ctx.createRadialGradient(p.x,p.y,p.r*0.1,p.x,p.y,p.r*6);
      g.addColorStop(0, `hsla(${p.hue},100%,60%,0.9)`);
      g.addColorStop(0.5, `hsla(${p.hue},80%,45%,0.15)`);
      g.addColorStop(1, `rgba(0,0,0,0)`);
      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}
