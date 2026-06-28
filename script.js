/* ── Particle canvas ────────────────────────────────────────────────────── */
(function(){
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});

  function Particle(){
    this.reset = function(){
      this.x = Math.random()*canvas.width;
      this.y = Math.random()*canvas.height;
      this.r = Math.random()*2.5+1;
      this.vx = (Math.random()-.5)*.45;
      this.vy = (Math.random()-.5)*.45;
      this.a = Math.random()*.5+.15;
    };
    this.reset();
  }

  for(let i=0;i<55;i++) particles.push(new Particle());

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(100,255,218,${p.a})`;
      ctx.fill();
    });
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<130){
          ctx.beginPath();
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.strokeStyle=`rgba(100,255,218,${.12*(1-d/130)})`;
          ctx.lineWidth=.7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Typing effect ──────────────────────────────────────────────────────── */
const PHRASES = ['Clean Energy Engineer','Fuel Cell Specialist','DVP&R Test Engineer','3D Printing & Fixtures','M.Sc. @ FAU Erlangen'];
let pi=0,ci=0,del=false;
const typedEl = document.getElementById('typed');

function type(){
  const cur=PHRASES[pi];
  typedEl.textContent = del ? cur.slice(0,--ci) : cur.slice(0,++ci);
  let wait = del?50:80;
  if(!del&&ci===cur.length){wait=2000;del=true;}
  else if(del&&ci===0){del=false;pi=(pi+1)%PHRASES.length;wait=400;}
  setTimeout(type,wait);
}

/* ── Chart.js global defaults ───────────────────────────────────────────── */
Chart.defaults.color='#8892b0';
Chart.defaults.borderColor='rgba(100,255,218,0.1)';
Chart.defaults.font.family='Inter';

/* ── Center-text plugin for doughnut charts ─────────────────────────────── */
const centerLabel = {
  id:'centerLabel',
  afterDraw(chart){
    const opt = chart.config.options.plugins?.centerLabel;
    if(!opt) return;
    const {ctx} = chart;
    const meta = chart.getDatasetMeta(0);
    if(!meta.data[0]) return;
    const cx=meta.data[0].x, cy=meta.data[0].y;
    ctx.save();
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillStyle='#64ffda';
    ctx.font='bold 26px Inter';
    ctx.fillText(opt.value, cx, cy-8);
    ctx.fillStyle='#8892b0';
    ctx.font='11px Inter';
    ctx.fillText(opt.label, cx, cy+14);
    ctx.restore();
  }
};
Chart.register(centerLabel);

/* ── Chart instances ────────────────────────────────────────────────────── */
let chartsInit = false;

function initCharts(){
  if(chartsInit) return;
  chartsInit=true;

  /* Radar – skills overview */
  new Chart(document.getElementById('radar-chart'),{
    type:'radar',
    data:{
      labels:['Electrochemical\nSystems','Testing &\nValidation','Prototyping\n& Workshop','CAD &\nDoc','Process\nOptimisation','Materials\nScience'],
      datasets:[{
        data:[88,92,84,80,82,76],
        backgroundColor:'rgba(100,255,218,.12)',
        borderColor:'rgba(100,255,218,.85)',
        borderWidth:2,
        pointBackgroundColor:'#64ffda',
        pointRadius:4,
        pointHoverRadius:6
      }]
    },
    options:{
      responsive:true,
      plugins:{legend:{display:false}},
      scales:{r:{
        min:0,max:100,
        ticks:{display:false,stepSize:25},
        grid:{color:'rgba(100,255,218,.1)'},
        angleLines:{color:'rgba(100,255,218,.1)'},
        pointLabels:{color:'#8892b0',font:{size:10}}
      }}
    }
  });

  /* CNC throughput – horizontal bar */
  new Chart(document.getElementById('chart-cnc'),{
    type:'bar',
    data:{
      labels:['Before','After'],
      datasets:[{
        data:[1,6],
        backgroundColor:['rgba(136,146,176,.4)','rgba(100,255,218,.75)'],
        borderRadius:6,
        borderSkipped:false
      }]
    },
    options:{
      indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>' '+c.raw+'× throughput'}}},
      scales:{
        x:{max:7,beginAtZero:true,ticks:{callback:v=>v+'×',stepSize:1},grid:{color:'rgba(100,255,218,.06)'}},
        y:{grid:{display:false}}
      }
    }
  });

  /* CO2 doughnut */
  new Chart(document.getElementById('chart-co2'),{
    type:'doughnut',
    data:{
      labels:['CO₂ Reduced','Remaining'],
      datasets:[{
        data:[21.2,78.8],
        backgroundColor:['rgba(100,255,218,.85)','rgba(136,146,176,.15)'],
        borderColor:['rgba(100,255,218,1)','rgba(136,146,176,.05)'],
        borderWidth:2
      }]
    },
    options:{
      cutout:'72%',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},centerLabel:{value:'21.2%',label:'CO₂ Saved'}}
    }
  });

  /* Cost savings doughnut */
  new Chart(document.getElementById('chart-cost'),{
    type:'doughnut',
    data:{
      labels:['Cost Saved','Remaining Cost'],
      datasets:[{
        data:[80,20],
        backgroundColor:['rgba(100,255,218,.85)','rgba(136,146,176,.15)'],
        borderColor:['rgba(100,255,218,1)','rgba(136,146,176,.05)'],
        borderWidth:2
      }]
    },
    options:{
      cutout:'72%',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},centerLabel:{value:'~80%',label:'Cost Saved'}}
    }
  });

  /* BPP production bar */
  new Chart(document.getElementById('chart-bpp'),{
    type:'bar',
    data:{
      labels:['Current\nCapacity','Expansion\nTarget'],
      datasets:[{
        data:[10626,63756],
        backgroundColor:['rgba(136,146,176,.4)','rgba(100,255,218,.75)'],
        borderRadius:6,
        borderSkipped:false
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>' '+c.raw.toLocaleString()+' BPP/day'}}},
      scales:{
        y:{beginAtZero:true,ticks:{callback:v=>v>=1000?Math.round(v/1000)+'k':v},grid:{color:'rgba(100,255,218,.06)'}},
        x:{grid:{display:false}}
      }
    }
  });
}

/* ── Modal data ─────────────────────────────────────────────────────────── */
const EXP = {
  tum:{
    role:'Working Student',company:'Technical University Munich',
    dept:'Department of Chemistry — Short-term contract',
    date:'Nov 2025 – Dec 2025 · Munich',color:'#4a9eff',
    bullets:[
      'Designed and <strong>3D printed a ceramic fuel-cell test fixture</strong> including sealing, clamping, and interface concepts for electrochemical testing.',
      'Produced CAD models, technical drawings, and assembly documentation.',
      'Prepared assembly instructions, safety requirements, and commissioning documentation.'
    ]
  },
  freudenberg:{
    role:'Thesis Student & Intern — R&D Team',company:'Freudenberg e-Power Systems',
    date:'Aug 2024 – Jun 2025 · Munich',color:'#64ffda',
    thesis:'A Comparative Study for Bonding and Sealing in the Industrial-Scale Production of Bipolar Plates',
    bullets:[
      'Derived a <strong>scalable bonding & sealing concept for ~342 graphite bipolar plates/day</strong> from experimental data and thermal boundary conditions.',
      'Developed & executed <strong>DVP&R validation plans</strong>: tensile, shear, hardness, chemical stability, leak-tightness, and accelerated lifetime testing (Arrhenius).',
      'Translated functional requirements (leak-tightness, chemical resistance, service life) into <strong>process specs, tolerances, and acceptance criteria</strong> for production & QA.',
      'Designed & 3D-printed ISO-compliant test specimen moulds; created 3D models and 2D drawings for sample plates coordinated with a manufacturing partner in China.',
      '<strong>Built & evaluated test rig</strong> comparing curing methods (oven, heated press, IR) — defined process windows and recommended most efficient method from data.',
      '<strong>Optimised CNC dispensing on DATRON CNC</strong> via NC programming & parameter studies — ~6× throughput increase with improved process robustness.',
      '(Intern) Performed displacement, Fuji pressure & leak testing; geometric inspections via 3D scanning and profilometer analysis.',
      '(Intern) Developed 3D-printed <strong>snap-fit alignment tool</strong> improving assembly consistency and detecting bonding defects earlier — reduced rework.'
    ]
  },
  lkt:{
    role:'Working Student',company:'FAU Erlangen',
    dept:'Lehrstuhl für Kunststofftechnik (LKT)',
    date:'Mar 2024 – Jul 2024 · Erlangen',color:'#a78bfa',
    bullets:[
      'Developed <strong>graphite/PP composite bipolar plates</strong> using injection moulding — studied material behaviour and manufacturing constraints.',
      'Researched frame-integrated MEA concepts for scalable bonding & sealing solutions in fuel-cell systems.',
      'Assisted in coordinating experimental work and documenting research results.'
    ]
  },
  truetech:{
    role:'Graduate Trainee',company:'Truetech Vision Industry Pvt. Ltd.',
    date:'Jul 2020 – Jan 2021 · Pune, India',color:'#fb923c',
    bullets:[
      '<strong>CAD-based tooling development</strong> and process planning for manufacturing machine operations.',
      'Created CAD models for prototypes and production parts; supported factory layout and process planning.',
      'Developed foundational understanding of metal material behaviour for forged and cast component analysis.'
    ]
  },
  pragati:{
    role:'Thesis Intern — Design Engineering',company:'Pragati Pvt. Ltd.',
    date:'Jun 2019 – Apr 2020 · Nashik, India',color:'#34d399',
    bullets:[
      'Designed & validated a <strong>cost-efficient injection wheel mould</strong> for a solar-panel cleaning trolley — <strong>~80% manufacturing cost reduction</strong>.',
      'Identified <strong>trapped air as root cause</strong> of injection defects; redesigned runner and venting systems to achieve a production-ready mould.',
    ]
  }
};

const PROJ = {
  co2:{
    title:'Low-CO₂ Scenario for Jena City',type:'Mini-Project · FAU Erlangen',
    intro:'Developed a city-scale scenario model for a clean energy transition, evaluating technology integration and quantifying CO₂ reduction potential.',
    bullets:[
      'Modelled integration of <strong>bioenergy, solar, EVs, CHP, fuel cells, and electrolysis</strong> technologies at city scale.',
      'Quantified a <strong>21.2% CO₂ reduction</strong> pathway through systematic technology deployment.',
      'Developed skills in system-level analysis, technology comparison, and energy transition assessment.'
    ],
    hasChart:true
  },
  electrolysis:{
    title:'Alkaline Water Electrolysis — H₂ Production',type:'Self-Initiated Project',
    intro:'Designed, built, and tested a complete alkaline electrolysis prototype from scratch to study hydrogen production behaviour under varying conditions.',
    bullets:[
      '<strong>Built alkaline electrolysis prototype</strong> from scratch — electrode assembly, electrolyte management, gas collection.',
      'Systematically varied <strong>temperature, KOH concentration, electrode geometry, and stack configuration</strong> to map H₂ production rates.',
      'Investigated <strong>degradation behaviour</strong> over extended operation — identified dominant loss mechanisms.',
      'Developed practical understanding of electrochemical system behaviour and experimental validation methods.'
    ]
  },
  connrod:{
    title:'Connecting Rod Failure Investigation',type:'B.E. Undergraduate Project',
    intro:'Systematic material characterisation study combining mechanical testing, hardness mapping, and microscopy to evaluate failure mechanisms in a connecting rod.',
    bullets:[
      'Performed <strong>UTM tensile testing</strong> to characterise stress-strain response and ultimate tensile strength.',
      'Conducted <strong>Vickers hardness mapping</strong> across the rod cross-section to identify hardness gradients.',
      '<strong>Optical microscopy</strong> to examine microstructure, grain boundaries, and surface defects.',
      'Inclusion analysis to identify non-metallic inclusions as potential crack initiation sites.',
      'Correlated microstructure observations to <strong>toughness and failure behaviour</strong> under load.'
    ]
  }
};

const IMPACT_MODAL = {
  cnc:{
    title:'CNC Throughput Optimisation — 6× Increase',
    body:`<p style="color:var(--muted);font-size:.9rem;margin-bottom:1rem">At Freudenberg e-Power Systems, the adhesive dispensing process for bipolar plate bonding was a production bottleneck with a required cycle time of just 6.5 minutes per plate.</p>
<ul class="modal-bullets">
<li>Analysed the existing DATRON CNC dispensing program and identified redundant tool paths and inefficient parameter settings.</li>
<li>Redesigned the <strong>NC program structure</strong> and optimised feed rates, dispensing speed, and tooling parameters.</li>
<li>Achieved <strong>~6× throughput increase</strong> while simultaneously improving process robustness and dispensing quality.</li>
<li>Documented process windows and defined parameters for repeatable production-scale operation.</li>
</ul>`
  },
  co2:{
    title:'21.2% CO₂ Reduction — Jena City Scenario',
    body:`<p style="color:var(--muted);font-size:.9rem;margin-bottom:1rem">A mini-project modelling a complete clean energy transition for the city of Jena, Germany — evaluating which technology mix achieves the greatest CO₂ reduction.</p>
<ul class="modal-bullets">
<li>Integrated <strong>bioenergy, solar PV, electric vehicles (EVs), CHP plants, fuel cells, and electrolysis</strong> into a unified scenario model.</li>
<li>Quantified a <strong>21.2% CO₂ reduction</strong> achievable through coordinated technology deployment.</li>
<li>Evaluated trade-offs between cost, infrastructure requirements, and emissions impact for each technology.</li>
</ul>`
  },
  cost:{
    title:'~80% Cost Reduction — Injection Mould Redesign',
    body:`<p style="color:var(--muted);font-size:.9rem;margin-bottom:1rem">Thesis project at Pragati Pvt. Ltd., Nashik — designing a cost-efficient injection mould for a solar-panel cleaning trolley wheel.</p>
<ul class="modal-bullets">
<li>Original mould design had high manufacturing cost due to complex geometry and runner system.</li>
<li><strong>Identified trapped air</strong> as the primary cause of injection defects through systematic failure analysis.</li>
<li>Redesigned <strong>runner system and venting channels</strong> — eliminating defects while drastically simplifying tooling.</li>
<li>Achieved <strong>~80% manufacturing cost reduction</strong> compared to the initial design concept.</li>
</ul>`
  },
  bpp:{
    title:'342 Bipolar Plates/Day — Bonding & Sealing Process',
    body:`<p style="color:var(--muted);font-size:.9rem;margin-bottom:1rem">Freudenberg e-Power Systems plans a 400% production scale-up (from ~10,600 to ~63,700 MPP/year). Bonding & sealing of bipolar plates is a critical bottleneck — existing cycle time of 11h 20min needed to meet a 6.5-minute target.</p>
<ul class="modal-bullets">
<li>Developed and validated a <strong>scalable bonding & sealing concept</strong> for graphite bipolar plates meeting the 6.5-min cycle time target.</li>
<li>Selected UV-curable sealant and fast-cure bonding materials via DVP&R testing and datasheet analysis.</li>
<li>Designed <strong>metal fixture with 0.1 mm positioning tolerance</strong> for multi-plate simultaneous curing.</li>
<li>Process supports the production of <strong>≈342 bipolar plates per day</strong> at target cycle time.</li>
</ul>`
  }
};

/* ── Modal system ───────────────────────────────────────────────────────── */
const overlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');

function openModal(html){
  modalBody.innerHTML = html;
  overlay.setAttribute('aria-hidden','false');
  overlay.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

function expModalHTML(d){
  return `
    <p class="modal-role">${d.role}</p>
    <p class="modal-title">${d.company}${d.dept?` <span style="color:var(--muted);font-weight:400;font-size:.85rem">— ${d.dept}</span>`:''}  </p>
    <p class="modal-date">${d.date}</p>
    ${d.thesis?`<div class="modal-thesis">📄 Thesis: <em>${d.thesis}</em></div>`:''}
    <ul class="modal-bullets">${d.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`;
}

function projModalHTML(d){
  return `
    <p class="modal-role" style="color:var(--muted)">${d.type}</p>
    <p class="modal-title">${d.title}</p>
    <p style="color:var(--muted);font-size:.88rem;margin:.75rem 0 1rem">${d.intro}</p>
    ${d.hasChart?`<div class="modal-chart-wrap"><canvas id="modal-co2-chart"></canvas></div>`:''}
    <ul class="modal-bullets">${d.bullets.map(b=>`<li>${b}</li>`).join('')}</ul>`;
}

/* attach exp card listeners */
document.querySelectorAll('[data-exp]').forEach(el=>{
  el.addEventListener('click',()=>{
    const d = EXP[el.dataset.exp];
    if(d) openModal(expModalHTML(d));
  });
  el.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') el.click(); });
});

/* attach project card listeners */
document.querySelectorAll('[data-proj]').forEach(el=>{
  el.addEventListener('click',()=>{
    const d = PROJ[el.dataset.proj];
    if(!d) return;
    openModal(projModalHTML(d));
    if(d.hasChart){
      setTimeout(()=>{
        const canvas = document.getElementById('modal-co2-chart');
        if(!canvas) return;
        new Chart(canvas,{
          type:'doughnut',
          data:{
            labels:['CO₂ Reduced','Remaining'],
            datasets:[{data:[21.2,78.8],backgroundColor:['rgba(100,255,218,.85)','rgba(136,146,176,.15)'],borderColor:['rgba(100,255,218,1)','rgba(136,146,176,.05)'],borderWidth:2}]
          },
          options:{cutout:'70%',responsive:true,maintainAspectRatio:false,plugins:{legend:{position:'right'},centerLabel:{value:'21.2%',label:'CO₂ Saved'}}}
        });
      },50);
    }
  });
  el.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') el.click(); });
});

/* attach impact chart card listeners */
document.querySelectorAll('[data-modal]').forEach(el=>{
  const key = el.dataset.modal;
  if(!IMPACT_MODAL[key]) return;
  el.addEventListener('click',()=>{
    const d = IMPACT_MODAL[key];
    openModal(`<p class="modal-title">${d.title}</p><div class="modal-section">${d.body}</div>`);
  });
  el.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') el.click(); });
});

/* ── Flip cards ─────────────────────────────────────────────────────────── */
document.querySelectorAll('.flip-card').forEach(card=>{
  card.addEventListener('click',()=> card.classList.toggle('flipped'));
});

/* ── Intersection Observer utilities ────────────────────────────────────── */
function onEnter(selector, cb, opts={}){
  const obs = new IntersectionObserver((entries,o)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){ cb(e.target,i,o); }
    });
  }, {threshold:0.15,...opts});
  document.querySelectorAll(selector).forEach(el=>obs.observe(el));
}

/* fade-up animations */
onEnter('.fade-up',(el,i)=>{
  setTimeout(()=>el.classList.add('visible'), i*80);
});

/* animated counters */
onEnter('.stat-num',(el,i,obs)=>{
  obs.unobserve(el);
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix||'';
  const dec = parseInt(el.dataset.decimal||'0');
  const dur = 1600, step = 16;
  let cur = 0, t = 0;
  const iv = setInterval(()=>{
    t += step;
    cur = target * Math.min(t/dur,1);
    el.textContent = (dec>0?cur.toFixed(dec):Math.round(cur))+suffix;
    if(t>=dur){ el.textContent=(dec>0?target.toFixed(dec):target)+suffix; clearInterval(iv); }
  },step);
},{threshold:0.5});

/* language bars */
onEnter('.lang-fill',(el,i,obs)=>{
  obs.unobserve(el);
  setTimeout(()=>{ el.style.width=el.style.getPropertyValue('--w'); }, i*150+200);
});

/* init charts when impact section visible */
const impactObs = new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){ initCharts(); impactObs.disconnect(); }
},{threshold:0.1});
const impactSec = document.getElementById('impact');
if(impactSec) impactObs.observe(impactSec);

/* also init radar when about section visible */
const aboutObs = new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){ initCharts(); aboutObs.disconnect(); }
},{threshold:0.1});
const aboutSec = document.getElementById('about');
if(aboutSec) aboutObs.observe(aboutSec);

/* ── Nav ────────────────────────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled', window.scrollY>20);
  // active link
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{
    if(window.scrollY >= s.offsetTop-200) cur=s.id;
  });
  navLinks.forEach(a=>a.classList.toggle('active', a.getAttribute('href')==='#'+cur));
},{passive:true});

/* ── Hamburger ──────────────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-links');
hamburger.addEventListener('click',()=>{
  hamburger.classList.toggle('open');
  navList.classList.toggle('open');
});
navList.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  hamburger.classList.remove('open');
  navList.classList.remove('open');
}));

/* ── Start typing on load ───────────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded',()=> setTimeout(type,700));
