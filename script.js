/* ── Particle Canvas ──────────────────────────────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.8 + .4;
    this.dx = (Math.random() - .5) * .35;
    this.dy = (Math.random() - .5) * .35;
    this.a = Math.random() * .45 + .1;
  };

  function init() {
    resize();
    particles = Array.from({ length: 90 }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) p.reset();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100,255,218,' + p.a + ')';
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(100,255,218,' + (.08 * (1 - d / 90)) + ')';
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init();
  draw();
})();

/* ── All setup after DOM ready ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Typed effect ─────────────────────────────────────────────────────── */
  var roles = [
    'Clean Energy Engineer',
    'Fuel Cell Systems Specialist',
    'DVP&R Validation Expert',
    'Hydrogen Technology Researcher',
    'Mechanical Design Engineer'
  ];
  var typedEl = document.getElementById('typed');
  if (typedEl) {
    var ri = 0, ci = 0, deleting = false;
    function type() {
      var word = roles[ri];
      typedEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
      if (!deleting && ci > word.length) { deleting = true; setTimeout(type, 1800); return; }
      if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
      setTimeout(type, deleting ? 55 : 90);
    }
    type();
  }

  /* ── Navbar scroll / highlight ────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');
  var navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', function () {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
    var found = '';
    document.querySelectorAll('section[id]').forEach(function (s) {
      if (window.scrollY >= s.offsetTop - 130) found = s.id;
    });
    navLinks.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + found);
    });
  });

  /* ── Mobile hamburger ─────────────────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var navLinksEl = document.querySelector('.nav-links');
  if (hamburger && navLinksEl) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinksEl.classList.toggle('open');
    });
    navLinksEl.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinksEl.classList.remove('open');
      });
    });
  }

  /* ── Fade-up on scroll ────────────────────────────────────────────────── */
  var fadeObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(function (el) { fadeObs.observe(el); });

  /* ── Counter animation ────────────────────────────────────────────────── */
  var cObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var target = parseFloat(el.dataset.target);
      var suffix = el.dataset.suffix || '';
      var dec = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
      var steps = 60, step = 0;
      var tick = setInterval(function () {
        step++;
        el.textContent = (target * (step / steps)).toFixed(dec) + suffix;
        if (step >= steps) { el.textContent = target.toFixed(dec) + suffix; clearInterval(tick); }
      }, 20);
      cObs.unobserve(el);
    });
  }, { threshold: .5 });
  document.querySelectorAll('[data-target]').forEach(function (c) { cObs.observe(c); });

  /* ── Language bar animation ───────────────────────────────────────────── */
  var barObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.lang-fill').forEach(function (bar) {
        bar.style.width = parseInt(bar.dataset.w, 10) + '%';
      });
      barObs.unobserve(e.target);
    });
  }, { threshold: .3 });
  var langSection = document.getElementById('languages');
  if (langSection) barObs.observe(langSection);

  /* ── Skill card click toggle (mobile) ────────────────────────────────── */
  document.querySelectorAll('.skill-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var wasActive = card.classList.contains('active');
      document.querySelectorAll('.skill-card.active').forEach(function (c) { c.classList.remove('active'); });
      if (!wasActive) card.classList.add('active');
    });
  });

  /* ── Modal system ─────────────────────────────────────────────────────── */
  var overlay = document.getElementById('modal-overlay');
  var modalBody = document.getElementById('modal-body');

  function openModal(html) {
    if (!overlay || !modalBody) return;
    modalBody.innerHTML = html;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var mc = document.getElementById('modal-chart');
    if (mc && typeof Chart !== 'undefined') {
      var type = mc.dataset.type || 'bar';
      var labels = JSON.parse(mc.dataset.labels || '[]');
      var values = JSON.parse(mc.dataset.values || '[]');
      var scalesOpt = type !== 'radar' ? {
        x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 11 } } },
        y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 11 } } }
      } : {
        r: { grid: { color: 'rgba(255,255,255,.08)' }, ticks: { display: false }, pointLabels: { color: '#ccd6f6', font: { size: 11 } } }
      };
      new Chart(mc, {
        type: type,
        data: {
          labels: labels,
          datasets: [{
            label: mc.dataset.label || '',
            data: values,
            backgroundColor: 'rgba(100,255,218,.2)',
            borderColor: '#64ffda', borderWidth: 2, borderRadius: 6,
            pointBackgroundColor: '#64ffda', fill: true,
            tension: .35
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: scalesOpt
        }
      });
    }
    var closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
  }

  function closeModal() {
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (modalBody) modalBody.innerHTML = '';
  }

  if (overlay) overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  /* ── Experience modal data ────────────────────────────────────────────── */
  var expData = {
    'tum': {
      role: 'Working Student', co: 'Technical University Munich (TUM)',
      date: 'Nov 2025 – Dec 2025',
      intro: 'Short-duration assignment supporting fuel cell research activities.',
      bullets: [
        'Assisted ongoing fuel cell research with documentation and testing support',
        'Applied DVP&R validation methodologies in academic research context',
        'Coordinated with doctoral researchers on experimental test planning'
      ]
    },
    'freudenberg': {
      role: 'Thesis Student & Research Intern', co: 'Freudenberg e-Power Systems GmbH',
      date: 'Aug 2024 – Jun 2025',
      thesis: 'M.Sc. Thesis: Optimization of Bipolar Plate Manufacturing — 342 BPP/day throughput and 80% cost reduction through CNC parameter optimization and DVP&R validation.',
      bullets: [
        '<strong>342 BPP/day</strong> throughput — 6× improvement over baseline via CNC studies',
        '<strong>80% cost reduction</strong> in bipolar plate manufacturing',
        'Designed & executed DVP&R validation plans for PEM fuel cell components',
        'Fuji Pressure Film testing for contact pressure distribution analysis',
        'Surface characterization using profilometer &amp; SEM microscopy',
        'Accelerated Lifetime Testing (ALT) protocols for stack durability',
        'CATIA V5 &amp; SolidWorks fixture design for test-rig development',
        'Technical documentation: FMEA, test reports, process flowcharts'
      ],
      chartLabel: 'BPP Daily Output (units)',
      chartLabels: ['Baseline', 'Study 1', 'Study 2', 'Study 3', 'Optimised'],
      chartValues: [57, 120, 198, 270, 342]
    },
    'lkt': {
      role: 'Working Student — Alkaline Electrolysis', co: 'FAU Erlangen — LKT Chair',
      date: 'Mar 2024 – Jul 2024',
      intro: 'Built and characterized a full alkaline water electrolysis prototype from scratch.',
      bullets: [
        'Designed &amp; built complete alkaline electrolysis prototype (2H₂O → 2H₂ + O₂)',
        'Fabricated cathode (stainless steel) and anode (Ni foam) electrode assemblies',
        'Assembled KOH electrolyte circulation system',
        'Electrochemical characterization: I-V curves, EIS, overpotential analysis',
        'SolidWorks 3D printed custom housing &amp; electrode frames',
        'Documented results for integration into faculty research publications'
      ]
    },
    'truetech': {
      role: 'Graduate Trainee', co: 'Truetech Vision — Pune, India',
      date: 'Jul 2020 – Jan 2021',
      intro: 'Industrial automation and mechanical systems role covering machine design and commissioning.',
      bullets: [
        'Managed mechanical assembly and commissioning of automated inspection lines',
        'Maintained CNC machines and performed first-level troubleshooting',
        'Created CATIA &amp; AutoCAD drawings for custom tooling adaptors',
        'Customer-facing machine handover and operator training'
      ]
    },
    'pragati': {
      role: 'Thesis Intern — Design Engineer', co: 'Pragati Pvt. Ltd.',
      date: 'Jun 2019 – Apr 2020',
      thesis: 'B.E. Thesis: Design and Manufacturing of Wheel Mould — full lifecycle from design intent to production-ready tooling.',
      bullets: [
        'Designed wheel mould geometry in CATIA V5 with GD&amp;T tolerancing',
        'Performed material selection and draft angle optimization for de-moulding',
        'Coordinated CNC machining of mould cavity and core inserts',
        'Conducted dimensional inspection and fit-check testing',
        'Authored full thesis: literature review, design rationale, manufacturing process'
      ]
    },
    'shreyas': {
      role: 'Trainee Engineer', co: 'Shreyas Industry',
      date: 'Jun 2019',
      intro: 'Short industrial exposure to manufacturing floor operations and quality inspection.',
      bullets: [
        'Observed and participated in lathe, milling, and grinding operations',
        'Assisted quality team with dimensional inspection',
        'Documented process parameters for standard operating procedures'
      ]
    },
    'kalpataru': {
      role: 'Manufacturing Intern', co: 'Kalpataru Precision Tools',
      date: 'May 2016 – Jun 2016',
      intro: 'First industrial internship — exposure to precision tooling and machining.',
      bullets: [
        'Observed conventional and CNC machining of precision cutting tools',
        'Learned workholding, toolpath planning, and G-code basics',
        'Participated in quality checks: hardness testing, surface finish measurement'
      ]
    }
  };

  document.querySelectorAll('.exp-card[data-exp]').forEach(function (card) {
    card.addEventListener('click', function () {
      var d = expData[card.dataset.exp];
      if (!d) return;
      var html = '<button id="modal-close">&#x2715;</button>'
        + '<div class="m-role">' + d.role + '</div>'
        + '<div class="m-title">' + d.co + '</div>'
        + '<div class="m-date">' + d.date + '</div>';
      if (d.thesis) html += '<div class="m-thesis">' + d.thesis + '</div>';
      if (d.intro) html += '<div class="m-intro">' + d.intro + '</div>';
      html += '<ul class="m-bullets">' + d.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
      if (d.chartValues) {
        html += '<div class="m-chart-wrap">'
          + '<canvas id="modal-chart" data-type="bar" data-label="' + d.chartLabel + '"'
          + ' data-labels=\'' + JSON.stringify(d.chartLabels) + '\''
          + ' data-values=\'' + JSON.stringify(d.chartValues) + '\'></canvas>'
          + '</div>';
      }
      openModal(html);
    });
  });

  /* ── Project modal data ───────────────────────────────────────────────── */
  var projData = {
    'co2': {
      title: 'Low-CO₂ Scenario Simulation — City of Jena',
      tag: 'Energy Systems Analysis',
      intro: 'Comprehensive clean energy transition study analysing CO₂ reduction pathways for the city of Jena.',
      bullets: [
        '<strong>21.2% CO₂ reduction</strong> achieved by 2035 in the modelled scenario',
        'Analysed wind, solar PV, biomass, and heat pump integration pathways',
        'Evaluated sector coupling between electricity, heat, and transport',
        'Used EnergyPLAN and Python for scenario modelling and sensitivity analysis',
        'Presented findings with visualization dashboards for stakeholder communication'
      ],
      chartLabel: 'CO₂ Index (base=100)',
      chartLabels: ['2020', '2025', '2028', '2031', '2035'],
      chartValues: [100, 91, 83, 82.3, 78.8]
    },
    'electrolysis': {
      title: 'Alkaline Water Electrolysis Prototype',
      tag: 'Hydrogen Production',
      intro: 'Full-stack design and build of an alkaline electrolysis test cell with systematic electrochemical characterization.',
      bullets: [
        'Reaction: <strong>2H₂O → 2H₂ + O₂</strong> using 30 wt% KOH electrolyte',
        'Cathode: stainless steel mesh; Anode: nickel foam for catalytic surface area',
        'Custom 3D-printed PLA housing and electrode spacer frames (SolidWorks)',
        'Electrochemical testing: polarization curves, EIS, Tafel slope analysis',
        'Measured Faradaic efficiency and H₂ purity at different current densities',
        'Results fed into FAU research group publication pipeline'
      ],
      chartLabel: 'Cell Voltage (V)',
      chartLabels: ['10 mA/cm²', '50 mA/cm²', '100 mA/cm²', '200 mA/cm²', '400 mA/cm²'],
      chartValues: [1.52, 1.68, 1.82, 1.98, 2.15]
    },
    'connrod': {
      title: 'Connecting Rod Failure Investigation',
      tag: 'Materials &amp; Testing',
      intro: 'Experimental investigation into mechanical properties and failure modes using UTM and Vickers hardness mapping.',
      bullets: [
        'UTM tensile test: yield strength, UTS, elongation compared to DIN EN standards',
        'Vickers Hardness mapping: 15-point profile across cross-section',
        'Fracture surface analysis: brittle vs. ductile modes via macro + microscopy',
        'CATIA V5 FE mesh preparation for stress concentration verification',
        'Material: 40Cr4 alloy steel — hardness 285–310 HV across gauge',
        'Documented results in structured technical report with pass/fail conclusion'
      ],
      chartLabel: 'Hardness (HV)',
      chartLabels: ['Edge 1', 'Zone 2', 'Zone 3', 'Centre', 'Zone 5', 'Zone 6', 'Edge 7'],
      chartValues: [310, 302, 297, 285, 291, 299, 308]
    }
  };

  document.querySelectorAll('.proj-card[data-proj]').forEach(function (card) {
    card.addEventListener('click', function () {
      var d = projData[card.dataset.proj];
      if (!d) return;
      var html = '<button id="modal-close">&#x2715;</button>'
        + '<div class="m-role">' + d.tag + '</div>'
        + '<div class="m-title">' + d.title + '</div>'
        + '<div class="m-intro">' + d.intro + '</div>'
        + '<ul class="m-bullets">' + d.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
      if (d.chartValues) {
        html += '<div class="m-chart-wrap">'
          + '<canvas id="modal-chart" data-type="line" data-label="' + d.chartLabel + '"'
          + ' data-labels=\'' + JSON.stringify(d.chartLabels) + '\''
          + ' data-values=\'' + JSON.stringify(d.chartValues) + '\'></canvas>'
          + '</div>';
      }
      openModal(html);
    });
  });

  /* ── Chart.js charts (guarded — entire block only runs if Chart loaded) ── */
  if (typeof Chart !== 'undefined') {
    Chart.defaults.color = '#8892b0';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
    Chart.defaults.font.family = "'Fira Code', monospace";

    var baseOpts = {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      animation: { duration: 1200 }
    };

    /* Radar — Skills */
    var radarEl = document.getElementById('radar-chart');
    if (radarEl) {
      new Chart(radarEl, {
        type: 'radar',
        data: {
          labels: ['Fuel Cell Systems', 'DVP&R Testing', '3D Print / CAD', 'CNC / Workshop', 'Electrochemistry', 'Data Analysis'],
          datasets: [{
            data: [95, 90, 85, 80, 78, 72],
            backgroundColor: 'rgba(100,255,218,.1)',
            borderColor: '#64ffda', borderWidth: 2,
            pointBackgroundColor: '#64ffda', pointRadius: 4
          }]
        },
        options: Object.assign({}, baseOpts, {
          scales: {
            r: {
              min: 0, max: 100,
              grid: { color: 'rgba(255,255,255,.08)' },
              ticks: { display: false },
              pointLabels: { color: '#ccd6f6', font: { size: 10 } }
            }
          }
        })
      });
    }

    /* Horizontal bar — CNC throughput */
    var cncEl = document.getElementById('chart-cnc');
    if (cncEl) {
      new Chart(cncEl, {
        type: 'bar',
        data: {
          labels: ['Before', 'After'],
          datasets: [{
            data: [57, 342],
            backgroundColor: ['rgba(100,255,218,.2)', 'rgba(100,255,218,.7)'],
            borderColor: '#64ffda', borderWidth: 1.5, borderRadius: 6
          }]
        },
        options: Object.assign({}, baseOpts, {
          indexAxis: 'y',
          scales: {
            x: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 10 } } },
            y: { grid: { display: false }, ticks: { color: '#ccd6f6', font: { size: 10 } } }
          }
        })
      });
    }

    /* Doughnut — CO₂ reduction */
    var co2El = document.getElementById('chart-co2');
    if (co2El) {
      new Chart(co2El, {
        type: 'doughnut',
        data: {
          labels: ['CO₂ Reduced', 'Remaining'],
          datasets: [{
            data: [21.2, 78.8],
            backgroundColor: ['rgba(100,255,218,.75)', 'rgba(255,255,255,.07)'],
            borderColor: ['#64ffda', 'transparent'],
            borderWidth: [2, 0]
          }]
        },
        options: Object.assign({}, baseOpts, { cutout: '72%' })
      });
    }

    /* Bar — Cost reduction */
    var costEl = document.getElementById('chart-cost');
    if (costEl) {
      new Chart(costEl, {
        type: 'bar',
        data: {
          labels: ['Legacy', 'Optimised'],
          datasets: [{
            data: [100, 20],
            backgroundColor: ['rgba(255,80,80,.35)', 'rgba(100,255,218,.6)'],
            borderColor: ['#ff5050', '#64ffda'],
            borderWidth: 1.5, borderRadius: 6
          }]
        },
        options: Object.assign({}, baseOpts, {
          scales: {
            x: { grid: { display: false }, ticks: { color: '#ccd6f6', font: { size: 10 } } },
            y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 10 }, callback: function (v) { return v + '%'; } } }
          }
        })
      });
    }

    /* Bar — BPP ramp-up */
    var bppEl = document.getElementById('chart-bpp');
    if (bppEl) {
      new Chart(bppEl, {
        type: 'bar',
        data: {
          labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jun'],
          datasets: [{
            data: [57, 120, 198, 240, 310, 342],
            backgroundColor: 'rgba(100,255,218,.25)',
            borderColor: '#64ffda', borderWidth: 1.5, borderRadius: 6
          }]
        },
        options: Object.assign({}, baseOpts, {
          scales: {
            x: { grid: { display: false }, ticks: { color: '#8892b0', font: { size: 10 } } },
            y: { grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 10 } } }
          }
        })
      });
    }

  } // end typeof Chart guard

}); // end DOMContentLoaded
