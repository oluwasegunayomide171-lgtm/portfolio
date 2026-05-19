(function(){
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  function resize(){ W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize); resize();
  const count = 70;
  for(let i=0;i<count;i++) particles.push({
    x: Math.random()*2000, y: Math.random()*900,
    r: Math.random()*1.8+0.4,
    vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4,
    a: Math.random()*0.5+0.1
  });
  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(79,141,255,${p.a})`;
      ctx.fill();
    });
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(79,141,255,${0.08*(1-dist/120)})`;
          ctx.lineWidth=0.5; ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
(function(){
  const phrases = ['Web Designer.','Frontend Developer.','Tech Enthusiast.','UI/UX Creator.'];
  let i=0,j=0,del=false;
  const el = document.getElementById('typewriter');
  function type(){
    const phrase = phrases[i];
    if(!del){
      el.textContent = phrase.slice(0,j+1);
      j++;
      if(j===phrase.length){ del=true; setTimeout(type,1800); return; }
    } else {
      el.textContent = phrase.slice(0,j-1);
      j--;
      if(j===0){ del=false; i=(i+1)%phrases.length; }
    }
    setTimeout(type, del?60:100);
  }
  setTimeout(type, 1000);
})();
window.addEventListener('scroll',()=>{
  const s = document.documentElement;
  const p = (s.scrollTop/(s.scrollHeight-s.clientHeight))*100;
  document.getElementById('progress-bar').style.width = p+'%';
});

// ─── REVEAL ON SCROLL ───
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // Animate skill bars
      e.target.querySelectorAll('.skill-fill').forEach(bar=>{
        bar.style.width = bar.dataset.width+'%';
      });
      const fills = e.target.closest('.skill-card')?.querySelector('.skill-fill');
      if(fills) fills.style.width = fills.dataset.width+'%';
    }
  });
  },{threshold:0.15});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>observer.observe(el));
// Also observe skill cards
document.querySelectorAll('.skill-card').forEach(card=>{
  const bar=card.querySelector('.skill-fill');
  if(bar){
    new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting) bar.style.width=bar.dataset.width+'%';
    },{threshold:0.3}).observe(card);
  }
});
const themeBtn = document.getElementById('theme-btn');
let dark=true;
themeBtn.addEventListener('click',()=>{
  dark=!dark;
  document.body.classList.toggle('light',!dark);
  themeBtn.textContent = dark?'🌙':'☀️';
});

// ─── HAMBURGER ───
document.getElementById('hamburger').addEventListener('click',()=>{
  document.getElementById('mobile-menu').classList.toggle('open');
});
function closeMobile(){ document.getElementById('mobile-menu').classList.remove('open'); }
// ─── PROJECT FILTER ───
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter=btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card=>{
      const cats=card.dataset.category||'';
      card.style.display=(filter==='all'||cats.includes(filter))?'':'none';
    });
  });
});
// ─── FORM VALIDATION ───
function submitForm(e){
  e.preventDefault();
  let valid=true;
  const name=document.getElementById('name').value.trim();
  const email=document.getElementById('email').value.trim();
  const msg=document.getElementById('message').value.trim();
  document.getElementById('name-err').style.display=(!name)?'block':'none'; if(!name) valid=false;
  document.getElementById('email-err').style.display=(!email||!email.includes('@'))?'block':'none'; if(!email||!email.includes('@')) valid=false;
  document.getElementById('msg-err').style.display=(!msg)?'block':'none'; if(!msg) valid=false;
  if(valid){
    document.getElementById('form-success').style.display='block';
    document.getElementById('contact-form').reset();
    setTimeout(()=>document.getElementById('form-success').style.display='none',5000);
  }
}
// ─── CV DOWNLOAD ───
document.getElementById('cv-btn').addEventListener('click',e=>{
  e.preventDefault();
  const a=document.createElement('a');
  a.href='data:text/plain;charset=utf-8,Oluwasegun - CV\n\nWeb Designer | Frontend Developer | Tech Enthusiast\nKDA LINKS, Nigeria\n\nSkills: HTML, CSS, JavaScript, UI/UX, Responsive Design, Animations\n\nProjects: Banking Website UI, ICT Company Website, Portfolio Design, Landing Pages\n\nContact: oluwasegun@example.com';
  a.download='Oluwasegun_CV.txt'; a.click();
});

// ─── SMOOTH NAV LINK HIGHLIGHT ───
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(s=>{ if(window.scrollY>=s.offsetTop-200) current=s.id; });
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.style.color = a.getAttribute('href')==='#'+current?'var(--text)':'';
  });
},{ passive:true });