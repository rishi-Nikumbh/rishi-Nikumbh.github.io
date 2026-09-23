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

/* ── i18n ─────────────────────────────────────────────────────────────────
   EN strings live inline in index.html and are captured on load as the
   fallback/default dictionary; DE strings are provided here. Switching
   language rewrites every [data-i18n] element's HTML in place. */
(function () {
  var ROLES = {
    en: ['Mechanical Engineer', 'Fuel Cell & Hydrogen Technologies', 'R&D / Validation Engineer', 'Process & Manufacturing Engineer', 'Clean Energy Technologies'],
    de: ['Maschinenbauingenieur', 'Brennstoffzellen- & Wasserstofftechnik', 'F&E- / Validierungsingenieur', 'Prozess- & Fertigungstechnik', 'Clean Energy Technologies']
  };

  var DE = {
    'nav.about': 'Über mich', 'nav.impact': 'Erfolge', 'nav.skills': 'Skills', 'nav.experience': 'Erfahrung',
    'nav.projects': 'Projekte', 'nav.documents': 'Dokumente', 'nav.contact': 'Kontakt', 'nav.resume': 'Lebenslauf ↗',
    'hero.greeting': 'Hallo, ich bin', 'hero.location': 'Erlangen, Deutschland &nbsp;·&nbsp; Offen für neue Möglichkeiten',
    'hero.hireMe': 'Kontakt aufnehmen', 'hero.downloadCV': 'Lebenslauf herunterladen',
    'stats.cnc': 'CNC-Durchsatz<br/>Steigerung', 'stats.bpp': 'Bipolarplatten<br/>Verklebt / Tag',
    'stats.cost': 'Formkosten<br/>Einsparung', 'stats.co2': 'CO₂-Reduktion<br/>modelliert',
    'about.title': 'Über mich',
    'about.bio1': 'Maschinenbau- und Clean-Energy-Ingenieur (M.Sc., FAU Erlangen, Abschlussnote 1,8) mit praktischer Bandbreite in <strong>Brennstoffzellen-Stack-Tests, DVP&amp;R-Validierung und Fertigungsprozessentwicklung</strong>. Bei Freudenberg e-Power Systems entwickelte ich einen manuellen Klebeprozess zu einem validierten <strong>12-Stationen-Fertigungslayout</strong> weiter und steigerte den Durchsatz um das 7-Fache — inklusive der zugehörigen Prüfstandsarbeit: Dichtheitsprüfung, Scherzugversuch, chemische Beständigkeit und strukturierte Prüfberichte.',
    'about.quote': '&bdquo;Seine schnelle Auffassungsgabe und sein Denkvermögen ließen ihn selbst schwierige Situationen sofort überblicken und stets das Wesentliche erkennen&hellip; Herr Nikumbh war immer äußerst zuverlässig und genoss stets unser volles Vertrauen.&ldquo;',
    'about.quoteSrc': '&mdash; Freudenberg e-Power Systems, Zeugnis',
    'about.radar': 'Kompetenz-Radar',
    'trait.hardworking': 'Fleißig', 'trait.focused': 'Fokussiert', 'trait.persistent': 'Beharrlich',
    'trait.planning': 'Methodische Planung', 'trait.creative': 'Kreative Problemlösung',
    'impact.title': 'Technische Erfolge', 'impact.sub': 'Echte Zahlen aus echten Projekten — für die volle Geschichte auf eine Karte klicken.',
    'impact.clickHint': 'Zum Entdecken klicken →',
    'impact.cnc.title': 'CNC-Durchsatz', 'impact.cnc.sub': 'NC-Programmoptimierung · Freudenberg e-Power Systems',
    'impact.co2.title': 'CO₂-Reduktion', 'impact.co2.sub': 'Städtisches Energiewende-Modell · Jena',
    'impact.cost.title': 'Kosteneinsparung', 'impact.cost.sub': 'Spritzgussform-Neukonstruktion · Pragati Udyog',
    'impact.bpp.title': 'BPP-Skalierung', 'impact.bpp.sub': 'Bipolarplatten-Verklebung &amp; -Abdichtung · Freudenberg',
    'skills.title': 'Skills', 'skills.sub': 'Auf eine Karte klicken, um alle Skills zu sehen.',
    'skill.tapFront': 'Antippen für Skills', 'skill.tapBack': 'Zurück antippen',
    'skill1.title': 'Wasserstoff &amp;<br/>Elektrochemie', 'skill1.tagline': 'Brennstoffzellen · Elektrolyse · BPP',
    'skill1.backTitle': 'Wasserstoff &amp; Elektrochemische Systeme',
    'skill1.t1': 'Brennstoffzellen (PEM, Keramik)', 'skill1.t2': 'Alkalische Elektrolyse', 'skill1.t3': 'Bipolarplatten',
    'skill1.t4': 'Stack-Montage', 'skill1.t5': 'Verklebung &amp; Abdichtung', 'skill1.t6': 'H₂-Produktionstests',
    'skill1.t7': 'MEA-Konzepte', 'skill1.t8': 'Elektrochemische Hardware',
    'skill2.title': 'Test &amp;<br/>Validierung', 'skill2.tagline': 'DVP&R · Fehleranalyse · Dichtheitsprüfung',
    'skill2.backTitle': 'Test &amp; Validierung',
    'skill2.t2': 'Fehleranalyse', 'skill2.t3': 'Ursachenanalyse', 'skill2.t4': 'Dichtheitsprüfung',
    'skill2.t5': 'Fuji-Drucktest', 'skill2.t6': 'Profilometer-Analyse', 'skill2.t7': 'Zug- &amp; Scherversuch',
    'skill2.t8': 'Shore-A-Härte', 'skill2.t9': 'Chemische Beständigkeitsprüfung',
    'skill3.title': 'Prototypenbau &amp;<br/>Werkstatt', 'skill3.tagline': '3D-Druck · Vorrichtungen · CNC',
    'skill3.backTitle': 'Prototypenbau &amp; Werkstatttechnik',
    'skill3.t1': '3D-Druck (FDM &amp; SLA)', 'skill3.t3': 'Vorrichtungskonstruktion',
    'skill3.t5': 'NC-Programmierung', 'skill3.t6': 'Prüfstandsbau', 'skill3.t7': 'Vakuumsysteme', 'skill3.t8': 'Spritzguss',
    'skill4.title': 'CAD &amp;<br/>Dokumentation', 'skill4.tagline': 'CATIA · SolidWorks · GD&T',
    'skill4.backTitle': 'CAD &amp; Dokumentation',
    'skill4.t7': 'Technische Zeichnungen', 'skill4.t8': 'Montageanleitungen', 'skill4.t9': 'Prüfprotokolle',
    'exp.title': 'Erfahrung', 'exp.sub': 'Für die volle Geschichte auf eine Station am Weg klicken.',
    'exp.tum.role': 'Werkstudent', 'exp.tum.sum': '3D-gedruckte keramische Brennstoffzellen-Prüfvorrichtung mit eigener Abdichtung &amp; Klemmung.',
    'exp.freudenberg.role': 'Masterand &amp; Praktikant — F&amp;E', 'exp.freudenberg.sum': 'DVP&R-Validierung &amp; Klebeprozess für ~342 Bipolarplatten/Tag. 6-fache CNC-Durchsatzsteigerung.',
    'exp.lkt.role': 'Werkstudent', 'exp.lkt.sum': 'Graphit/PP-Verbund-Bipolarplatten (80% Graphit / 20% PP) im Spritzgussverfahren; MEA-Forschung.',
    'exp.truetech.role': 'Trainee', 'exp.truetech.sum': 'CAD-basierte Werkzeugentwicklung und Prozessplanung für die Fertigung.',
    'exp.pragati.role': 'Praktikant Abschlussarbeit — Konstruktion', 'exp.pragati.sum': 'Spritzgussform-Design mit ~80% Kostensenkung für ein Nylon-Radbauteil.',
    'exp.shreyas.role': 'Trainee-Ingenieur', 'exp.shreyas.sum': 'Prozessablaufplanung und Qualitätsprüfungen in der Fertigung nach ISO-Normen.',
    'exp.kalpataru.role': 'Fertigungspraktikant', 'exp.kalpataru.sum': 'Oberflächenbearbeitung und Maßgenauigkeit beim Bohren, Gewindeschneiden und Drehen.',
    'edu.title': 'Ausbildung',
    'edu.msc.name': 'Clean Energy Technologies', 'edu.msc.uni': 'Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU) · Deutschland',
    'edu.msc.grade': 'Abschlussnote: 1,8 (sehr gut)',
    'edu.msc.p1': 'Brennstoffzellen', 'edu.msc.p2': 'Elektrolyse', 'edu.msc.p3': 'Energiespeicher',
    'edu.msc.p5': 'Polymerwissenschaft', 'edu.msc.p6': 'PV-Systeme',
    'edu.be.name': 'Maschinenbau', 'edu.be.uni': 'Pune University · Indien',
    'edu.be.p2': 'Maschinenkonstruktion', 'edu.be.p3': 'Thermodynamik', 'edu.be.p4': 'Werkstoffkunde &amp; Metallurgie', 'edu.be.p5': 'Automatisierung',
    'edu.dip.name': 'Maschinenbau', 'edu.dip.uni': 'MSBTE · Indien',
    'edu.dip.p1': 'Fertigungstechnik', 'edu.dip.p2': 'Technische Grundlagen',
    'proj.title': 'Projekte', 'proj.sub': 'Für Details &amp; Diagramme auf ein Projekt klicken.', 'proj.explore': 'Details entdecken →',
    'proj.co2.tag': 'Miniprojekt', 'proj.co2.title': 'CO₂-armes Szenario · Stadt Jena',
    'proj.co2.desc': 'Städtisches Energiemodell mit Solar, E-Fahrzeugen, Brennstoffzellen &amp; Elektrolyse. 21,2% CO₂-Reduktion.',
    'proj.elec.tag': 'Eigeninitiative', 'proj.elec.title': 'Alkalische Wasserelektrolyse',
    'proj.elec.desc': 'H₂-Produktionsprototyp gebaut — Temperatur-, Konzentrations- &amp; Geometrieeffekte untersucht.',
    'proj.rod.tag': 'B.E.-Projekt', 'proj.rod.title': 'Pleuelstangen-Versagensstudie',
    'proj.rod.desc': 'Zugversuch (UTM) + Vickers-Härte + Mikroskopie zur Bewertung von Zähigkeit &amp; Versagensverhalten.',
    'pub.title': 'Publikationen',
    'docs.title': 'Dokumente', 'docs.sub': 'Offizielle Bewerbungsunterlagen, zur Ansicht verfügbar.',
    'docs.view': 'Ansehen ↗', 'docs.request': 'Anfragen ↗',
    'docs.refs.title': 'Arbeitszeugnisse &amp; Referenzen', 'docs.refs.desc': 'Referenzschreiben — Freudenberg, TrueTech Vision, Pragati Udyog u. a.',
    'docs.transcript.title': 'Notenübersicht', 'docs.transcript.desc': 'M.Sc. Clean Energy Technologies — FAU Erlangen-Nürnberg (inkl. vollständiger Modulübersicht)',
    'docs.degree.title': 'Abschluss- &amp; Diplomurkunden', 'docs.degree.desc': 'Bachelor of Engineering + Diplom (Maschinenbau) — M.Sc.-Urkunde folgt nach Studienabschluss',
    'docs.certs.title': 'Sprach- &amp; Leistungszertifikate', 'docs.certs.desc': 'Deutsch A2, Japanisch N5 sowie akademische Veranstaltungszertifikate',
    'lang.title': 'Sprachen',
    'lang.en': 'Englisch', 'lang.en.lvl': 'C1 · Verhandlungssicher',
    'lang.de': 'Deutsch', 'lang.de.lvl': 'B1 · Aktiv in Verbesserung',
    'lang.mr': 'Marathi', 'lang.mr.lvl': 'Muttersprache',
    'lang.hi': 'Hindi', 'lang.hi.lvl': 'Verhandlungssicher',
    'contact.title': 'Kontakt aufnehmen',
    'contact.text': 'Ich bewerbe mich derzeit auf <strong>Maschinenbauingenieur</strong>- und <strong>F&amp;E- / Validierungsingenieur</strong>-Stellen in der deutschen Wasserstoff- und Brennstoffzellenbranche. Sofort verfügbar.',
    'contact.linkedin': 'LinkedIn-Profil', 'contact.sayHello': 'Hallo sagen →', 'contact.bookCall': 'Termin buchen →',
    'contact.bookingLabel': 'Freie Termine ansehen und direkt buchen:', 'contact.bookingNote': 'Möchten Sie den Termin lieber selbst über Outlook, Teams oder eine andere Plattform organisieren? Schauen Sie sich einfach meine Verfügbarkeit oben an und vereinbaren Sie den Termin persönlich, wie es für Sie am besten passt.', 'contact.bookingFallback': 'Kalender lädt nicht? Buchungsseite in neuem Tab öffnen →',
    'footer.text': 'Rushikesh Nikumbh · © 2026'
  };

  var EN = {}; // captured from the live DOM on first load
  var current = localStorage.getItem('site-lang') || 'en';

  function captureEN() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (!(key in EN)) EN[key] = el.innerHTML;
    });
  }

  function applyLanguage(lang) {
    var dict = lang === 'de' ? DE : EN;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] != null) el.innerHTML = dict[key];
    });
    document.documentElement.setAttribute('lang', lang);
    var titleEl = document.getElementById('page-title');
    var descEl = document.getElementById('page-desc');
    if (titleEl) titleEl.textContent = lang === 'de'
      ? 'Rushikesh Nikumbh | Maschinenbauingenieur — Clean Energy & Wasserstoff'
      : 'Rushikesh Nikumbh | Mechanical Engineer — Clean Energy & Hydrogen';
    if (descEl) descEl.setAttribute('content', lang === 'de'
      ? 'Portfolio von Rushikesh Nikumbh – M.Sc. Clean Energy Technologies, Maschinenbauingenieur mit Schwerpunkt Brennstoffzellen-, Wasserstoff- und Fertigungstechnik.'
      : 'Portfolio of Rushikesh Nikumbh – M.Sc. Clean Energy Technologies, Mechanical Engineer specialising in fuel cell, hydrogen & manufacturing engineering.');
    var enBtn = document.getElementById('lang-en');
    var deBtn = document.getElementById('lang-de');
    if (enBtn && deBtn) {
      enBtn.classList.toggle('active', lang === 'en');
      deBtn.classList.toggle('active', lang === 'de');
      enBtn.setAttribute('aria-pressed', lang === 'en');
      deBtn.setAttribute('aria-pressed', lang === 'de');
    }
    current = lang;
    localStorage.setItem('site-lang', lang);
    if (window.__setTypedRoles) window.__setTypedRoles(ROLES[lang]);
    if (window.__setModalLang) window.__setModalLang(lang);
    if (window.__redrawTimeline) setTimeout(window.__redrawTimeline, 50);
    var cvFile = lang === 'de' ? 'assets/Rushikesh_CV_DE.pdf' : 'assets/Rushikesh_CV.pdf';
    var cvNav = document.getElementById('cv-link-nav');
    var cvHero = document.getElementById('cv-link-hero');
    if (cvNav) cvNav.setAttribute('href', cvFile);
    if (cvHero) cvHero.setAttribute('href', cvFile);
    var refsFile = lang === 'de' ? 'assets/documents/Work_Experience_DE.pdf' : 'assets/documents/Work_Experience_EN.pdf';
    var refsLink = document.getElementById('doc-link-refs');
    if (refsLink) refsLink.setAttribute('href', refsFile);
  }

  document.addEventListener('DOMContentLoaded', function () {
    captureEN();
    var enBtn = document.getElementById('lang-en');
    var deBtn = document.getElementById('lang-de');
    if (enBtn) enBtn.addEventListener('click', function () { applyLanguage('en'); });
    if (deBtn) deBtn.addEventListener('click', function () { applyLanguage('de'); });
    if (current !== 'en') applyLanguage(current);
  });

  window.__i18n = { ROLES: ROLES, applyLanguage: applyLanguage, getLang: function () { return current; } };
})();

/* ── All setup after DOM ready ───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

  /* ── Typed effect ─────────────────────────────────────────────────────── */
  var typedEl = document.getElementById('typed');
  if (typedEl) {
    var roles = window.__i18n.ROLES[window.__i18n.getLang()];
    var ri = 0, wi = 0, deleting = false, typeTimer = null;
    function type() {
      var words = roles[ri].split(' ');
      wi = Math.max(0, Math.min(wi, words.length));
      typedEl.textContent = deleting ? words.slice(0, wi).join(' ') : words.slice(0, wi + 1).join(' ');
      if (!deleting) {
        if (wi < words.length - 1) { wi++; typeTimer = setTimeout(type, 200); return; }
        deleting = true; typeTimer = setTimeout(type, 1400); return;
      }
      if (wi > 0) { wi--; typeTimer = setTimeout(type, 130); return; }
      deleting = false; ri = (ri + 1) % roles.length; wi = 0;
      typeTimer = setTimeout(type, 300);
    }
    type();
    window.__setTypedRoles = function (newRoles) {
      roles = newRoles; ri = 0; wi = 0; deleting = false;
      if (typeTimer) clearTimeout(typeTimer);
      typedEl.textContent = '';
      type();
    };
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

  /* ── Experience timeline path (winding road connecting the logo stops) ──
     Draws an S-curve through the actual rendered center of each .tl-dot,
     so it always lines up regardless of screen width, text length/language,
     or how the fade-up cards have settled. */
  (function () {
    var wrap = document.getElementById('tl-wrap');
    var svg = document.getElementById('tl-svg');
    var runnerSvg = document.getElementById('tl-runner-svg');
    var path = document.getElementById('tl-path');
    if (!wrap || !svg || !path) return;

    function draw() {
      var dots = wrap.querySelectorAll('.tl-dot');
      if (!dots.length) return;
      var wrapRect = wrap.getBoundingClientRect();
      var w = wrapRect.width, h = wrapRect.height;
      svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      if (runnerSvg) runnerSvg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      var pts = Array.prototype.map.call(dots, function (d) {
        var r = d.getBoundingClientRect();
        return { x: r.left + r.width / 2 - wrapRect.left, y: r.top + r.height / 2 - wrapRect.top };
      });
      if (pts.length < 2) { path.setAttribute('d', ''); return; }
      var d = 'M ' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1);
      for (var i = 0; i < pts.length - 1; i++) {
        var p0 = pts[i], p1 = pts[i + 1];
        var midY = (p0.y + p1.y) / 2;
        d += ' C ' + p0.x.toFixed(1) + ' ' + midY.toFixed(1) + ', ' + p1.x.toFixed(1) + ' ' + midY.toFixed(1) + ', ' + p1.x.toFixed(1) + ' ' + p1.y.toFixed(1);
      }
      path.setAttribute('d', d);
    }

    /* ── Runner: a little hard-hat engineer who walks the road as you scroll.
       Scrolling down = moving into the past (most-recent stop is at the top),
       so his stride plays in reverse; scrolling up plays it forward again. */
    var runnerG = document.getElementById('tl-runner');
    var legF = document.getElementById('tl-leg-front');
    var legB = document.getElementById('tl-leg-back');
    var armF = document.getElementById('tl-arm-front');
    var armB = document.getElementById('tl-arm-back');
    var lastProgress = null, strideDist = 0, facing = 1;
    var STRIDE_LEN = 30, MAX_SWING = 34;

    function sectionProgress() {
      var rect = wrap.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var total = rect.height + vh;
      if (total <= 0) return 0;
      var traveled = vh - rect.top;
      return Math.max(0, Math.min(1, traveled / total));
    }

    function updateRunner() {
      if (!runnerG || typeof path.getTotalLength !== 'function') return;
      var len = path.getTotalLength();
      if (!len) return;
      var progress = sectionProgress();
      if (lastProgress === null) lastProgress = progress;
      var delta = progress - lastProgress; // negative while scrolling back up
      strideDist += delta * len;
      lastProgress = progress;

      var atLen = Math.max(0, Math.min(len, progress * len));
      var pt = path.getPointAtLength(atLen);
      var pt2 = path.getPointAtLength(Math.min(len, atLen + 3));
      var dx = pt2.x - pt.x;
      if (Math.abs(dx) > 0.2) facing = dx < 0 ? -1 : 1;

      var phase = (strideDist / STRIDE_LEN) * Math.PI * 2;
      var swing = Math.sin(phase) * MAX_SWING;
      var bob = Math.abs(Math.sin(phase)) * 3;

      if (legF) legF.setAttribute('transform', 'rotate(' + swing.toFixed(1) + ' 0 0)');
      if (legB) legB.setAttribute('transform', 'rotate(' + (-swing).toFixed(1) + ' 0 0)');
      if (armF) armF.setAttribute('transform', 'rotate(' + (-swing * 0.7).toFixed(1) + ' 0 -36)');
      if (armB) armB.setAttribute('transform', 'rotate(' + (swing * 0.7).toFixed(1) + ' 0 -36)');
      runnerG.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ' ' + (pt.y - bob).toFixed(1) + ') scale(' + facing + ' 1)');
    }

    window.__redrawTimeline = function () { draw(); updateRunner(); };
    window.addEventListener('resize', function () {
      clearTimeout(window.__tlResizeT);
      window.__tlResizeT = setTimeout(window.__redrawTimeline, 120);
    });
    window.addEventListener('load', window.__redrawTimeline);
    var scrollTicking = false;
    window.addEventListener('scroll', function () {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(function () { updateRunner(); scrollTicking = false; });
    }, { passive: true });

    // Catch late layout shifts (web fonts, fade-up reveal, logo image loads)
    var tries = 0;
    var settleTimer = setInterval(function () {
      window.__redrawTimeline();
      tries++;
      if (tries > 20) clearInterval(settleTimer);
    }, 150);
    wrap.querySelectorAll('.tl-dot img').forEach(function (img) {
      if (img.complete) return;
      img.addEventListener('load', window.__redrawTimeline);
    });
    window.__redrawTimeline();
  })();

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
      intro: 'Short-duration assignment developing a custom test fixture for fuel cell research.',
      bullets: [
        '3D-printed a ceramic fuel cell test fixture with custom sealing &amp; clamping design',
        'Performed leak-tightness verification and electrochemical voltage characterisation on the assembled fixture',
        'Produced commissioning documentation, safety protocols, and technical drawings for the test setup'
      ]
    },
    'freudenberg': {
      role: 'Thesis Student & Research Intern', co: 'Freudenberg e-Power Systems GmbH',
      date: 'Aug 2024 – Jun 2025',
      thesis: 'M.Sc. Thesis: Bonding & Sealing Process Optimisation for PEM Fuel Cell Bipolar Plates — 342 BPP/day production layout and 6× CNC dispensing throughput through structured DVP&R validation.',
      bullets: [
        '<strong>342 BPP/day</strong> production layout designed — 12-station curing concept scaled from a 20/day single-station baseline',
        '<strong>6× CNC dispensing throughput</strong> via NC-program optimisation and parameter tuning',
        'Identified and specified suitable test methods (leaching, chemical stability, mechanical) within a structured DVP&amp;R framework',
        'Prepared standardized test specimens to ISO norms; evaluated measurement data and wrote structured test reports',
        'Learned the DATRON dispensing system\'s code structure independently — no formal training — and wrote new programs for specific dispensing outputs, troubleshooting by tracing patterns in the output back to the code',
        'Fuji Pressure Film testing for contact pressure distribution analysis',
        'Surface characterization using profilometer &amp; 3D scanning',
        'Calibration checks on measurement equipment before test execution',
        'CATIA V5 &amp; SolidWorks fixture design for test-rig development',
        'Technical documentation: DVP&amp;R reports, test protocols, process flowcharts'
      ],
      chartLabel: 'BPP Daily Output (units)',
      chartLabels: ['Baseline', 'Study 1', 'Study 2', 'Study 3', 'Optimised'],
      chartValues: [20, 110, 200, 280, 342]
    },
    'lkt': {
      role: 'Working Student — Bipolar Plate Materials Research', co: 'FAU Erlangen — Lehrstuhl für Kunststofftechnik (LKT)',
      date: 'Mar 2024 – Jul 2024',
      intro: 'Materials research into composite bipolar plates and scalable bonding concepts for fuel cell stacks.',
      bullets: [
        'Developed graphite/PP composite bipolar plates (80% graphite / 20% PP) via injection moulding',
        'Investigated material behaviour and manufacturing constraints of composite BPPs',
        'Researched frame-integrated MEA bonding and sealing concepts for scalable stack assembly',
        'Coordinated experimental work and documented results for research outputs'
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
      role: 'Thesis Intern — Design Engineer', co: 'Pragati Udyog',
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

  /* ── Experience modal data — German ───────────────────────────────────── */
  var expDataDE = {
    'tum': {
      role: 'Werkstudent', co: 'Technische Universität München (TUM)',
      date: 'Nov 2025 – Dez 2025',
      intro: 'Kurzzeitiger Einsatz zur Entwicklung einer maßgeschneiderten Prüfvorrichtung für die Brennstoffzellenforschung.',
      bullets: [
        'Keramische Brennstoffzellen-Prüfvorrichtung mit eigens entwickelter Abdichtung und Klemmung 3D-gedruckt',
        'Dichtheitsprüfung und elektrochemische Spannungscharakterisierung an der montierten Vorrichtung durchgeführt',
        'Inbetriebnahmedokumentation, Sicherheitsprotokolle und technische Zeichnungen für den Versuchsaufbau erstellt'
      ]
    },
    'freudenberg': {
      role: 'Masterand &amp; Forschungspraktikant', co: 'Freudenberg e-Power Systems GmbH',
      date: 'Aug 2024 – Jun 2025',
      thesis: 'Masterarbeit: Prozessoptimierung für Verklebung &amp; Abdichtung von PEM-Brennstoffzellen-Bipolarplatten — Produktionslayout für 342 BPP/Tag und 6-fache CNC-Dosierdurchsatzsteigerung durch strukturierte DVP&R-Validierung.',
      bullets: [
        '<strong>Produktionslayout für 342 BPP/Tag</strong> entworfen — 12-Stationen-Aushärtungskonzept, skaliert von einer Basis von 20/Tag mit einer Station',
        '<strong>6-fache Steigerung des CNC-Dosierdurchsatzes</strong> durch NC-Programmoptimierung und Parameteranpassung',
        'Geeignete Prüfmethoden (Laugung, chemische Beständigkeit, mechanische Prüfungen) im Rahmen eines strukturierten DVP&amp;R-Frameworks identifiziert und festgelegt',
        'Standardisierte Prüfkörper nach Normen vorbereitet; Messdaten ausgewertet und strukturierte Prüfberichte verfasst',
        'Den Code-Aufbau des DATRON-Dosiersystems selbstständig gelernt — ohne formale Schulung — und neue Programme für bestimmte Dosierausgaben geschrieben, mit Fehlersuche anhand der Ausgabemuster',
        'Fuji-Drucktests zur Analyse der Kontaktdruckverteilung',
        'Oberflächencharakterisierung mittels Profilometer &amp; 3D-Scanning',
        'Kalibrierprüfungen der Messtechnik vor jeder Testdurchführung',
        'CATIA V5 &amp; SolidWorks Vorrichtungskonstruktion für den Prüfstandsbau',
        'Technische Dokumentation: DVP&amp;R-Berichte, Prüfprotokolle, Prozessablaufpläne'
      ],
      chartLabel: 'BPP Tagesausstoß (Stück)',
      chartLabels: ['Basis', 'Studie 1', 'Studie 2', 'Studie 3', 'Optimiert'],
      chartValues: [20, 110, 200, 280, 342]
    },
    'lkt': {
      role: 'Werkstudent — Materialforschung Bipolarplatten', co: 'FAU Erlangen — Lehrstuhl für Kunststofftechnik (LKT)',
      date: 'Mär 2024 – Jul 2024',
      intro: 'Materialforschung an Verbund-Bipolarplatten und skalierbaren Verklebungskonzepten für Brennstoffzellen-Stacks.',
      bullets: [
        'Graphit/PP-Verbund-Bipolarplatten (80% Graphit / 20% PP) im Spritzgussverfahren entwickelt',
        'Materialverhalten und Fertigungsgrenzen von Verbund-BPPs untersucht',
        'Rahmenintegrierte MEA-Verklebungs- und Abdichtungskonzepte für skalierbare Stack-Montage erforscht',
        'Versuchsarbeit koordiniert und Ergebnisse für Forschungszwecke dokumentiert'
      ]
    },
    'truetech': {
      role: 'Trainee', co: 'Truetech Vision — Pune, Indien',
      date: 'Jul 2020 – Jan 2021',
      intro: 'Rolle in industrieller Automatisierung und Maschinenbau mit Fokus auf Konstruktion und Inbetriebnahme.',
      bullets: [
        'Mechanische Montage und Inbetriebnahme automatisierter Prüflinien geleitet',
        'CNC-Maschinen gewartet und erste Fehlersuche durchgeführt',
        'CATIA- &amp; AutoCAD-Zeichnungen für kundenspezifische Werkzeugadapter erstellt',
        'Kundenseitige Maschinenübergabe und Bedienerschulung'
      ]
    },
    'pragati': {
      role: 'Praktikant Abschlussarbeit — Konstruktion', co: 'Pragati Udyog',
      date: 'Jun 2019 – Apr 2020',
      thesis: 'Bachelorarbeit: Entwurf und Fertigung einer Radform — vollständiger Lebenszyklus von der Entwurfsidee bis zum produktionsreifen Werkzeug.',
      bullets: [
        'Radform-Geometrie in CATIA V5 mit GD&amp;T-Tolerierung entworfen',
        'Materialauswahl und Optimierung des Entformungswinkels durchgeführt',
        'CNC-Bearbeitung von Formkavität und Formkernen koordiniert',
        'Maßprüfung und Passungstests durchgeführt',
        'Vollständige Abschlussarbeit verfasst: Literaturrecherche, Konstruktionsbegründung, Fertigungsprozess'
      ]
    },
    'shreyas': {
      role: 'Trainee-Ingenieur', co: 'Shreyas Industry',
      date: 'Jun 2019',
      intro: 'Kurzer Einblick in Fertigungsbetrieb und Qualitätsprüfung.',
      bullets: [
        'Dreh-, Fräs- und Schleifarbeiten beobachtet und begleitet',
        'Qualitätsteam bei Maßprüfungen unterstützt',
        'Prozessparameter für Standardarbeitsanweisungen dokumentiert'
      ]
    },
    'kalpataru': {
      role: 'Fertigungspraktikant', co: 'Kalpataru Precision Tools',
      date: 'Mai 2016 – Jun 2016',
      intro: 'Erstes Industriepraktikum — Einblick in Präzisionswerkzeugbau und Zerspanung.',
      bullets: [
        'Konventionelle und CNC-Bearbeitung von Präzisionswerkzeugen beobachtet',
        'Grundlagen von Spannmitteln, Werkzeugwegplanung und G-Code gelernt',
        'An Qualitätsprüfungen teilgenommen: Härteprüfung, Oberflächenmessung'
      ]
    }
  };

  document.querySelectorAll('.tl-node[data-exp]').forEach(function (card) {
    card.addEventListener('click', function () {
      var lang = window.__i18n ? window.__i18n.getLang() : 'en';
      var d = (lang === 'de' ? expDataDE : expData)[card.dataset.exp];
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

  /* ── Project modal data — German ──────────────────────────────────────── */
  var projDataDE = {
    'co2': {
      title: 'CO₂-arme Szenariomodellierung — Stadt Jena',
      tag: 'Energiesystemanalyse',
      intro: 'Umfassende Energiewende-Studie zur Analyse von CO₂-Reduktionspfaden für die Stadt Jena.',
      bullets: [
        '<strong>21,2% CO₂-Reduktion</strong> im modellierten Szenario bis 2035 erreicht',
        'Wind-, Solar-PV-, Biomasse- und Wärmepumpen-Integrationspfade analysiert',
        'Sektorkopplung zwischen Strom, Wärme und Verkehr bewertet',
        'EnergyPLAN und Python für Szenariomodellierung und Sensitivitätsanalyse eingesetzt',
        'Ergebnisse mit Visualisierungs-Dashboards für die Stakeholder-Kommunikation präsentiert'
      ],
      chartLabel: 'CO₂-Index (Basis=100)',
      chartLabels: ['2020', '2025', '2028', '2031', '2035'],
      chartValues: [100, 91, 83, 82.3, 78.8]
    },
    'electrolysis': {
      title: 'Alkalischer Wasserelektrolyse-Prototyp',
      tag: 'Wasserstoffproduktion',
      intro: 'Vollständiger Entwurf und Bau einer alkalischen Elektrolysezelle mit systematischer elektrochemischer Charakterisierung.',
      bullets: [
        'Reaktion: <strong>2H₂O → 2H₂ + O₂</strong> mit 30 Gew.-% KOH-Elektrolyt',
        'Kathode: Edelstahlgeflecht; Anode: Nickelschaum für katalytische Oberfläche',
        'Eigens 3D-gedrucktes PLA-Gehäuse und Elektrodenabstandshalter (SolidWorks)',
        'Elektrochemische Tests: Polarisationskurven, EIS, Tafel-Steigungsanalyse',
        'Faraday-Wirkungsgrad und H₂-Reinheit bei verschiedenen Stromdichten gemessen',
        'Ergebnisse in die Publikationspipeline der FAU-Forschungsgruppe eingeflossen'
      ],
      chartLabel: 'Zellspannung (V)',
      chartLabels: ['10 mA/cm²', '50 mA/cm²', '100 mA/cm²', '200 mA/cm²', '400 mA/cm²'],
      chartValues: [1.52, 1.68, 1.82, 1.98, 2.15]
    },
    'connrod': {
      title: 'Pleuelstangen-Versagensuntersuchung',
      tag: 'Werkstoffe &amp; Prüftechnik',
      intro: 'Experimentelle Untersuchung von mechanischen Eigenschaften und Versagensverhalten mittels UTM und Vickers-Härtekartierung.',
      bullets: [
        'Zugversuch (UTM): Streckgrenze, Zugfestigkeit, Bruchdehnung im Vergleich zu DIN-EN-Normen',
        'Vickers-Härtekartierung: 15-Punkte-Profil über den Querschnitt',
        'Bruchflächenanalyse: spröde vs. duktile Versagensarten mittels Makro- und Mikroskopie',
        'CATIA V5 FE-Vernetzung zur Verifikation von Spannungskonzentrationen',
        'Werkstoff: 40Cr4-Legierungsstahl — Härte 285–310 HV über den Messbereich',
        'Ergebnisse in strukturiertem technischen Bericht mit Bestehen/Nicht-Bestehen-Bewertung dokumentiert'
      ],
      chartLabel: 'Härte (HV)',
      chartLabels: ['Kante 1', 'Zone 2', 'Zone 3', 'Mitte', 'Zone 5', 'Zone 6', 'Kante 7'],
      chartValues: [310, 302, 297, 285, 291, 299, 308]
    }
  };

  document.querySelectorAll('.proj-card[data-proj]').forEach(function (card) {
    card.addEventListener('click', function () {
      var __lang = window.__i18n ? window.__i18n.getLang() : 'en';
      var d = (__lang === 'de' ? projDataDE : projData)[card.dataset.proj];
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
          labels: ['Fuel Cell Stack Testing', 'DVP&R Validation', '3D Print / CAD', 'Test Bench Ops', 'Electrochemistry', 'Data Evaluation'],
          datasets: [{
            data: [95, 90, 85, 82, 78, 75],
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
              pointLabels: { color: '#ccd6f6', font: { size: 9 } }
            }
          },
          layout: { padding: 6 }
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
            data: [20, 120, 198, 240, 310, 342],
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
