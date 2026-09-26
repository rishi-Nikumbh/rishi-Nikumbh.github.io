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
    'stats.cnc': 'CNC-Durchsatz<br/>Steigerung', 'stats.bpp': 'Bipolarplatten / Tag<br/>Layout geplant',
    'stats.cost': 'Geringere Kosten<br/>pro Rad', 'stats.co2': 'CO₂-Reduktion<br/>modelliert',
    'about.title': 'Über mich',
    'about.bio1': 'Maschinenbauingenieur kurz vor dem Abschluss des M.Sc. Clean Energy Processes an der FAU Erlangen (Note der Masterarbeit 1,8), mit praktischer Erfahrung in <strong>Tests von PEM-Brennstoffzellenkomponenten, DVP&amp;R-Validierung und Entwicklung von Fertigungsprozessen</strong>. Bei Freudenberg e-Power Systems habe ich einen neuen Klebstoff für die Verklebung von Graphit-Bipolarplatten qualifiziert, eine Aushärtung über Nacht durch eine von <strong>27 Minuten</strong> ersetzt, den CNC-Dosierdurchsatz <strong>6-fach</strong> gesteigert und ein Layout mit <strong>12 Stationen</strong> für 342 Platten pro Tag geplant.',
    'about.quote': '&bdquo;Seine schnelle Auffassungsgabe und sein Denkvermögen ließen ihn selbst schwierige Situationen sofort überblicken und stets das Wesentliche erkennen&hellip; Herr Nikumbh war immer äußerst zuverlässig und genoss stets unser volles Vertrauen.&ldquo;',
    'about.quoteSrc': 'Freudenberg e-Power Systems, Zeugnis',
    'about.radar': 'Kompetenz-Radar',
    'trait.hardworking': 'Fleißig', 'trait.focused': 'Fokussiert', 'trait.persistent': 'Beharrlich',
    'trait.planning': 'Methodische Planung', 'trait.creative': 'Kreative Problemlösung',
    'impact.title': 'Technische Erfolge', 'impact.sub': 'Echte Zahlen aus echten Projekten. Für die volle Geschichte auf eine Karte klicken.',
    'impact.clickHint': 'Zum Entdecken klicken →',
    'impact.cnc.title': 'CNC-Durchsatz', 'impact.cnc.sub': 'NC-Programmoptimierung · Freudenberg e-Power Systems',
    'impact.co2.title': 'CO₂-Reduktion', 'impact.co2.sub': 'Städtisches Energiewende-Modell · Jena',
    'impact.cost.title': 'Kosteneinsparung', 'impact.cost.sub': 'Spritzgussform-Konstruktion · Pragati Udyog',
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
    'exp.tum.role': 'Werkstudent', 'exp.tum.sum': '3D-gedruckte Prüfvorrichtung und Dichtungen für eine Glukose-Brennstoffzelle mit keramischem Elektrolyt.',
    'exp.freudenberg.role': 'Praktikant &amp; Masterand, F&amp;E', 'exp.freudenberg.sum': '6-facher CNC-Dosierdurchsatz und eine Klebstoffaushärtung von über 12 Stunden auf 27 Minuten verkürzt, für die Verklebung von Bipolarplatten.',
    'exp.lkt.role': 'Werkstudent', 'exp.lkt.sum': 'Graphit/PP-Verbund-Bipolarplatten im Spritzguss und Recherche zu rahmenintegrierten MEA-Dichtungen.',
    'exp.truetech.role': 'Trainee', 'exp.truetech.sum': 'CAD-Modelle, Fertigungszeichnungen und Stücklisten in PTC Creo und AutoCAD für Prototypen und Serienteile.',
    'exp.pragati.role': 'Gesponsertes Bachelorprojekt, Formenbau', 'exp.pragati.sum': 'Spritzgussform für ein Nylonrad mit 75% geringeren Kosten pro Rad bei 45 Rädern pro Stunde.',
    'exp.shreyas.role': 'Industriepraktikant', 'exp.shreyas.sum': 'Prozessablaufplanung und Qualitätsprüfungen nach ISO in einem Bohr- und Gewindeschneidbetrieb.',
    'exp.kalpataru.role': 'Fertigungspraktikant', 'exp.kalpataru.sum': 'Oberflächengüte und Maßgenauigkeit beim Bohren, Gewindeschneiden und Drehen.',
    'edu.title': 'Ausbildung',
    'edu.msc.name': 'Clean Energy Processes', 'edu.msc.uni': 'Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU) · Deutschland',
    'edu.msc.grade': 'Note der Masterarbeit 1,8',
    'edu.msc.p1': 'Brennstoffzellen &amp; Elektrolyseure', 'edu.msc.p2': 'Energiespeicher', 'edu.msc.p3': 'Thermische Kraftwerke',
    'edu.msc.p5': 'Polymerwissenschaft', 'edu.msc.p6': 'Dünnschichtverfahren',
    'edu.be.name': 'Maschinenbau', 'edu.be.uni': 'Pune University · Indien',
    'edu.be.p2': 'Maschinenkonstruktion', 'edu.be.p3': 'Thermodynamik', 'edu.be.p4': 'Werkstoffkunde &amp; Metallurgie', 'edu.be.p5': 'CAD/CAM &amp; Automatisierung',
    'edu.dip.name': 'Maschinenbau', 'edu.dip.uni': 'MSBTE · Indien',
    'edu.dip.p1': 'Fertigungstechnik', 'edu.dip.p2': 'Technische Grundlagen',
    'proj.title': 'Projekte', 'proj.sub': 'Für Details &amp; Diagramme auf ein Projekt klicken.', 'proj.explore': 'Details entdecken →',
    'proj.co2.tag': 'FAU-Gruppenprojekt', 'proj.co2.title': 'CO₂-armes Szenario · Stadt Jena',
    'proj.co2.desc': 'Solar, Biomethan aus städtischem Abfall, E-Bikes und Elektrobusse für Jena bis 2040 modelliert. 21,2% CO₂-Reduktion.',
    'proj.elec.tag': 'Eigeninitiative', 'proj.elec.title': 'Alkalische Wasserelektrolyse',
    'proj.elec.desc': 'H₂-Prototyp großteils aus Altmaterial gebaut und Elektrolyt, Temperatur, Elektrodenfläche und Stack-Aufbau getestet.',
    'proj.rod.tag': 'Diplomprojekt', 'proj.rod.title': 'Untersuchung einer Pleuelstange',
    'proj.rod.desc': 'Zugversuch an der UTM sowie Vickers-Härte, Mikroskopie und Einschlussanalyse.',
    'pub.title': 'Publikationen',
    'docs.title': 'Dokumente', 'docs.sub': 'Offizielle Bewerbungsunterlagen, zur Ansicht verfügbar.',
    'docs.view': 'Ansehen ↗', 'docs.request': 'Anfragen ↗',
    'docs.refs.title': 'Arbeitszeugnisse &amp; Referenzen', 'docs.refs.desc': 'Arbeitszeugnisse und Bescheinigungen von Freudenberg, Truetech Vision, Pragati Udyog u. a.',
    'docs.transcript.title': 'Notenübersicht', 'docs.transcript.desc': 'M.Sc. Clean Energy Processes, FAU Erlangen-Nürnberg, mit vollständiger Modulübersicht',
    'docs.degree.title': 'Abschluss- &amp; Diplomurkunden', 'docs.degree.desc': 'Bachelor of Engineering und Diplom im Maschinenbau. M.Sc.-Urkunde folgt nach Studienabschluss',
    'docs.certs.title': 'Sprach- &amp; Leistungszertifikate', 'docs.certs.desc': 'Deutsch A2, Japanisch N5 sowie akademische Veranstaltungszertifikate',
    'lang.title': 'Sprachen',
    'lang.en': 'Englisch', 'lang.en.lvl': 'C1 · Verhandlungssicher',
    'lang.de': 'Deutsch', 'lang.de.lvl': 'B1 · Aktiv in Verbesserung',
    'lang.mr': 'Marathi', 'lang.mr.lvl': 'Muttersprache',
    'lang.hi': 'Hindi', 'lang.hi.lvl': 'Verhandlungssicher',
    'contact.title': 'Kontakt aufnehmen',
    'contact.text': 'Ich bewerbe mich derzeit auf <strong>Maschinenbauingenieur</strong>- und <strong>F&amp;E- / Validierungsingenieur</strong>-Stellen in der deutschen Wasserstoff- und Brennstoffzellenbranche. Sofort verfügbar.',
    'contact.linkedin': 'LinkedIn-Profil', 'contact.sayHello': 'Hallo sagen →', 'contact.bookCall': 'Termin buchen →',
    'traits.focus': 'Fokus', 'traits.creative': 'Kreative Problemlösung', 'traits.adaptability': 'Anpassungsfähigkeit', 'traits.teamwork': 'Teamarbeit', 'traits.detail': 'Detailgenauigkeit',
    'contact.bookingLabel': 'Freie Termine ansehen und direkt buchen:', 'contact.bookingNote': 'Möchten Sie den Termin lieber selbst über Outlook, Teams oder eine andere Plattform organisieren? Schauen Sie sich einfach meine Verfügbarkeit oben an und vereinbaren Sie den Termin persönlich, wie es für Sie am besten passt.', 'contact.bookingFallback': 'Kalender lädt nicht? Buchungsseite in neuem Tab öffnen →',
    'edu.msc.p4': 'Ökobilanzierung', 'edu.be.grade': 'Erste Klasse mit Auszeichnung', 'edu.be.p6': 'Messtechnik &amp; Qualitätssicherung', 'edu.dip.grade': 'Erste Klasse mit Auszeichnung',
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
      ? 'Portfolio von Rushikesh Nikumbh, Maschinenbauingenieur (M.Sc. Clean Energy Processes, FAU Erlangen) mit Schwerpunkt Brennstoffzellentests, Validierung und Fertigungstechnik.'
      : 'Portfolio of Rushikesh Nikumbh, mechanical engineer (M.Sc. Clean Energy Processes, FAU Erlangen) specialising in fuel cell testing, validation and manufacturing engineering.');
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

  /* ── Trait icon animations on scroll ─────────────────────────────────── */
  var traitEl = document.getElementById('trait-icons');
  if (traitEl) {
    var traitObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('play'); traitObs.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    traitObs.observe(traitEl);
  }

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
        y: { beginAtZero: type === 'bar', grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 11 } } }
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
      role: 'Working Student, Department of Chemistry', co: 'Technical University of Munich (TUM)',
      date: 'Nov 2025 – Dec 2025',
      intro: 'Built the test hardware for a glucose fuel cell with a ceramic electrolyte, from the sealing concept to the first validation tests.',
      bullets: [
        'Designed and 3D printed the cell test fixture with a dedicated sealing profile, clamping and the interfaces for electrochemical testing',
        'Made a 3D printed mould to cast the complex sealing geometry, then oven cured the seals',
        'Ran the first single cell validation tests, checking leak tightness and measuring cell voltage',
        'Wrote the CAD models, technical drawings, assembly instructions, safety requirements and commissioning procedure for the setup'
      ]
    },
    'freudenberg': {
      role: 'Intern, then Master&rsquo;s Thesis Student (R&amp;D)', co: 'Freudenberg e-Power Systems GmbH',
      date: 'Aug 2024 – Jun 2025',
      thesis: 'M.Sc. thesis &ldquo;Analysis of Bonding Application for Graphite Bipolar Plate&rdquo; in the Unit Cell &amp; Bipolar Plate Technology team, following a 5 month internship in the same team.',
      bullets: [
        '<strong>6&times; CNC dispensing throughput</strong> (8 to 50 mm/s) and a <strong>12 station</strong> bonding layout planned for <strong>342 bipolar plates a day</strong>',
        'Replaced an overnight adhesive cure of more than 12 hours with a <strong>27 minute</strong> heat cure, after comparing IR, hot plate and oven curing',
        'Defined the DVP&amp;R test plan for the new adhesive and prepared the samples to standard, covering leaching (ICP-OES), chemical stability, tensile, lap shear and leak tests',
        'Leak tested short stacks to check the quality of bonded plates, and ran Fuji pressure film tests to check the force distribution across the plates',
        'Measured dispensed bead profiles with a profilometer and 3D scanner and tuned the dispensing parameters from the results',
        'Designed a 3D printed snap fit tool that aligns the plates for bonding and removed the need for 2 extra operators, plus a vacuum table and gripper for handling',
        'Joined Freudenberg&rsquo;s internal training courses on my own initiative'
      ]
    },
    'lkt': {
      role: 'Working Student', co: 'FAU Erlangen, Institute of Polymer Technology (LKT)',
      date: 'Mar 2024 – Jul 2024',
      intro: 'Research on composite bipolar plates and sealing concepts for fuel cell stacks.',
      bullets: [
        'Developed graphite and polypropylene composite materials for bipolar plates, processed by injection moulding',
        'Researched literature and patents on gas seal designs and materials, and identified frame integrated MEAs with an injection moulded sealing frame as a promising route to mass manufacturing and long term reliability',
        'Assisted in coordinating the experimental work'
      ]
    },
    'truetech': {
      role: 'Graduate Trainee, Production Engineering', co: 'Truetech Vision Industry Pvt. Ltd.',
      date: 'Jul 2020 – Jan 2021',
      intro: 'Six month in plant training covering design, production drawings and the manufacturing floor.',
      bullets: [
        'Built CAD models in PTC Creo and AutoCAD for prototypes and production components',
        'Prepared production drawings and bills of materials, and ran basic stress analysis and data evaluation',
        'Supported plant layout optimisation and learned to run the plant&rsquo;s manufacturing machines'
      ]
    },
    'pragati': {
      role: 'Sponsored B.E. Project, Mould Design', co: 'Pragati Udyog',
      date: 'Jun 2019 – Apr 2020',
      thesis: 'B.E. group project &ldquo;Design and Manufacturing of Wheel Mould&rdquo;, sponsored by Pragati Udyog and taken from CAD model to a tested, production ready injection mould for a solar panel cleaning trolley wheel.',
      bullets: [
        '<strong>75% lower cost per wheel</strong> (Rs. 27.5 against a Rs. 110 market price) at 45 wheels per hour, with the mould paying back its cost in 16 hours of production',
        'Modelled the complete mould in PTC Creo 4.0 and produced manufacturing drawings for every part',
        'Sized the sprue (5.2 mm) and runner (8.5 mm) by calculation for nylon',
        'Traced injection defects to trapped air and fixed them by redesigning the runner and venting',
        'Validated the mould through a 3 phase trial before production'
      ]
    },
    'shreyas': {
      role: 'Industrial Trainee', co: 'Shreyas Industry, Nashik',
      date: 'Jun 2019 (2 weeks)',
      intro: 'Two week industrial training at a drilling and tapping job shop.',
      bullets: [
        'Mapped the process flow and prepared the bill of processes for parts on the shop floor',
        'Carried out quality checks on drilled and tapped parts according to ISO norms'
      ]
    },
    'kalpataru': {
      role: 'Manufacturing Trainee', co: 'Kalpataru Precision Tools, Nashik',
      date: 'May 2016 – Jun 2016',
      intro: 'One month training programme during my diploma, my first time on a production floor.',
      bullets: [
        'Worked on drilling, tapping and lathe operations with a focus on surface finish and dimensional accuracy',
        'Described in my training certificate as punctual, hardworking and inquisitive'
      ]
    }
  };

  /* ── Experience modal data — German ───────────────────────────────────── */
  var expDataDE = {
    'tum': {
      role: 'Werkstudent, Department Chemie', co: 'Technische Universität München (TUM)',
      date: 'Nov 2025 – Dez 2025',
      intro: 'Testhardware für eine Glukose-Brennstoffzelle mit keramischem Elektrolyt aufgebaut, vom Dichtungskonzept bis zu den ersten Validierungstests.',
      bullets: [
        'Prüfvorrichtung der Zelle mit eigenem Dichtungsprofil, Klemmung und Schnittstellen für elektrochemische Tests konstruiert und 3D-gedruckt',
        'Eine 3D-gedruckte Form zum Gießen der komplexen Dichtungsgeometrie gebaut und die Dichtungen im Ofen ausgehärtet',
        'Die ersten Einzelzell-Validierungstests durchgeführt, mit Dichtheitsprüfung und Messung der Zellspannung',
        'CAD-Modelle, technische Zeichnungen, Montageanleitung, Sicherheitsanforderungen und Inbetriebnahmeverfahren für den Aufbau erstellt'
      ]
    },
    'freudenberg': {
      role: 'Praktikant, dann Masterand (F&amp;E)', co: 'Freudenberg e-Power Systems GmbH',
      date: 'Aug 2024 – Jun 2025',
      thesis: 'Masterarbeit &bdquo;Analysis of Bonding Application for Graphite Bipolar Plate&ldquo; im Team Unit Cell &amp; Bipolar Plate Technology, nach einem fünfmonatigen Praktikum im selben Team.',
      bullets: [
        '<strong>6-facher CNC-Dosierdurchsatz</strong> (8 auf 50 mm/s) und ein Verklebungslayout mit <strong>12 Stationen</strong>, geplant für <strong>342 Bipolarplatten pro Tag</strong>',
        'Eine Klebstoffaushärtung über Nacht von mehr als 12 Stunden durch eine Warmhärtung von <strong>27 Minuten</strong> ersetzt, nach einem Vergleich von IR-, Heizplatten- und Ofenaushärtung',
        'Den DVP&amp;R-Prüfplan für den neuen Klebstoff festgelegt und die Proben normgerecht vorbereitet, mit Auslaugung (ICP-OES), chemischer Beständigkeit, Zugversuch, Zugscherversuch und Dichtheitsprüfung',
        'Dichtheitsprüfungen am Short Stack zur Qualitätssicherung verklebter Platten und Fuji-Drucktests zur Kraftverteilung über die Platten durchgeführt',
        'Profile der dosierten Raupen mit Profilometer und 3D-Scanner vermessen und die Dosierparameter anhand der Ergebnisse angepasst',
        'Ein 3D-gedrucktes Schnapp-Ausrichtwerkzeug für die Verklebung konstruiert, das 2 zusätzliche Bediener überflüssig machte, dazu einen Vakuumtisch und Greifer für das Handling',
        'Aus eigener Initiative an internen Schulungen von Freudenberg teilgenommen'
      ]
    },
    'lkt': {
      role: 'Werkstudent', co: 'FAU Erlangen, Lehrstuhl für Kunststofftechnik (LKT)',
      date: 'Mär 2024 – Jul 2024',
      intro: 'Forschung zu Verbund-Bipolarplatten und Dichtungskonzepten für Brennstoffzellen-Stacks.',
      bullets: [
        'Verbundwerkstoffe aus Graphit und Polypropylen für Bipolarplatten entwickelt, verarbeitet im Spritzguss',
        'Literatur und Patente zu Gasdichtungen und Dichtungswerkstoffen recherchiert und rahmenintegrierte MEAs mit spritzgegossenem Dichtrahmen als vielversprechenden Weg für Massenfertigung und Langzeitzuverlässigkeit identifiziert',
        'Bei der Koordination der Versuchsarbeit unterstützt'
      ]
    },
    'truetech': {
      role: 'Graduate Trainee, Produktionstechnik', co: 'Truetech Vision Industry Pvt. Ltd.',
      date: 'Jul 2020 – Jan 2021',
      intro: 'Sechsmonatige Ausbildung im Werk mit Konstruktion, Fertigungszeichnungen und Arbeit in der Produktion.',
      bullets: [
        'CAD-Modelle in PTC Creo und AutoCAD für Prototypen und Serienbauteile erstellt',
        'Fertigungszeichnungen und Stücklisten erstellt sowie einfache Festigkeitsberechnungen und Datenauswertungen durchgeführt',
        'Bei der Optimierung des Werkslayouts unterstützt und die Fertigungsmaschinen des Werks bedienen gelernt'
      ]
    },
    'pragati': {
      role: 'Gesponsertes Bachelorprojekt, Formenbau', co: 'Pragati Udyog',
      date: 'Jun 2019 – Apr 2020',
      thesis: 'Bachelor-Gruppenprojekt &bdquo;Design and Manufacturing of Wheel Mould&ldquo;, gesponsert von Pragati Udyog, vom CAD-Modell bis zur getesteten, serienreifen Spritzgussform für das Rad eines Solarpanel Reinigungswagens.',
      bullets: [
        '<strong>75% geringere Kosten pro Rad</strong> (Rs. 27,5 gegenüber einem Marktpreis von Rs. 110) bei 45 Rädern pro Stunde, und die Form hatte ihre Kosten nach 16 Stunden Produktion wieder eingespielt',
        'Komplette Form in PTC Creo 4.0 modelliert und Fertigungszeichnungen für jedes Bauteil erstellt',
        'Anguss (5,2 mm) und Verteilerkanal (8,5 mm) für Nylon rechnerisch ausgelegt',
        'Spritzfehler auf eingeschlossene Luft zurückgeführt und durch Neugestaltung von Verteilerkanal und Entlüftung behoben',
        'Form in einer dreistufigen Erprobung vor der Serienproduktion validiert'
      ]
    },
    'shreyas': {
      role: 'Industriepraktikant', co: 'Shreyas Industry, Nashik',
      date: 'Jun 2019 (2 Wochen)',
      intro: 'Zweiwöchiges Industriepraktikum in einem Bohr- und Gewindeschneidbetrieb.',
      bullets: [
        'Prozessablauf aufgenommen und den Arbeitsplan für Teile in der Fertigung erstellt',
        'Qualitätsprüfungen an gebohrten und gewindegeschnittenen Teilen nach ISO-Normen durchgeführt'
      ]
    },
    'kalpataru': {
      role: 'Fertigungspraktikant', co: 'Kalpataru Precision Tools, Nashik',
      date: 'Mai 2016 – Jun 2016',
      intro: 'Einmonatiges Praktikum während meines Diploms, mein erster Einsatz in der Fertigung.',
      bullets: [
        'Bohr-, Gewindeschneid- und Dreharbeiten mit Fokus auf Oberflächengüte und Maßgenauigkeit',
        'Im Praktikumszeugnis als pünktlich, fleißig und wissbegierig beschrieben'
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
      title: 'Low CO₂ Scenario for the City of Jena',
      tag: 'Energy Systems Analysis &middot; FAU Group Project',
      intro: 'A group project in the Renewable Thermal Power Plants module at FAU. We analysed Jena&rsquo;s energy and emissions data and modelled how the city could cut CO₂ by 2040. The plan modelled a 21.2% cut in CO₂ emissions.',
      bullets: [
        'Analysed 15 years of energy, population and emissions data (2005 to 2019) and projected the trends to 2040',
        'Modelled 500 kW of new solar capacity every year and a 500 kW biogas plant that turns the city&rsquo;s household waste into biomethane',
        'Modelled a shift to e-bikes and 44 electric buses phased in over 20 years',
        'Evaluated a redesign of the city&rsquo;s power plant around a 10.4 MW gas engine and a heat recovery steam turbine'
      ]
    },
    'electrolysis': {
      title: 'Alkaline Water Electrolysis Prototype',
      tag: 'Self Initiated &middot; Hydrogen Production',
      intro: 'A curiosity project during my bachelor studies in 2019. I built a working electrolyser, largely from scrap materials, to see how design choices change hydrogen output.',
      bullets: [
        'Built the electrolysis stack and test setup largely from scrap and low cost materials',
        'Varied the electrolyte, its temperature, the electrode surface area and the stack configuration to compare their effect on hydrogen production',
        'Powered the stack from a transformer based DC supply and recorded stack voltage and current for every run'
      ]
    },
    'connrod': {
      title: 'Experimental Investigation of a Connecting Rod',
      tag: 'Diploma Project &middot; Materials Testing',
      intro: 'Six month diploma project analysing the material of an engine connecting rod to evaluate its degradation behaviour.',
      bullets: [
        'Ran tensile tests on a universal testing machine',
        'Measured Vickers hardness and examined the microstructure under the microscope',
        'Checked the material for inclusions as part of the characterisation'
      ]
    }
  };

  /* ── Project modal data — German ──────────────────────────────────────── */
  var projDataDE = {
    'co2': {
      title: 'CO₂-armes Szenario für die Stadt Jena',
      tag: 'Energiesystemanalyse &middot; FAU-Gruppenprojekt',
      intro: 'Ein Gruppenprojekt im Modul Renewable Thermal Power Plants an der FAU. Wir haben die Energie- und Emissionsdaten Jenas analysiert und modelliert, wie die Stadt ihren CO₂-Ausstoß bis 2040 senken könnte. Der Plan modellierte eine CO₂-Reduktion von 21,2%.',
      bullets: [
        '15 Jahre Energie-, Bevölkerungs- und Emissionsdaten (2005 bis 2019) analysiert und die Trends bis 2040 fortgeschrieben',
        '500 kW neue Solarleistung pro Jahr und eine 500 kW Biogasanlage modelliert, die den Hausmüll der Stadt in Biomethan umwandelt',
        'Einen Umstieg auf E-Bikes und 44 Elektrobusse modelliert, schrittweise eingeführt über 20 Jahre',
        'Eine Neukonzeption des städtischen Kraftwerks mit 10,4 MW Gasmotor und Dampfturbine zur Wärmerückgewinnung bewertet'
      ]
    },
    'electrolysis': {
      title: 'Prototyp für alkalische Wasserelektrolyse',
      tag: 'Eigeninitiative &middot; Wasserstofferzeugung',
      intro: 'Ein Neugier-Projekt während meines Bachelorstudiums 2019. Ich habe einen funktionierenden Elektrolyseur gebaut, großteils aus Altmaterial, um zu sehen, wie Designentscheidungen die Wasserstoffproduktion verändern.',
      bullets: [
        'Elektrolyse-Stack und Versuchsaufbau großteils aus Altmaterial und günstigen Materialien gebaut',
        'Elektrolyt, Temperatur, Elektrodenfläche und Stack-Konfiguration variiert, um ihren Einfluss auf die Wasserstoffproduktion zu vergleichen',
        'Den Stack über ein transformatorbasiertes DC-Netzteil versorgt und Stapelspannung und Strom bei jedem Versuch aufgezeichnet'
      ]
    },
    'connrod': {
      title: 'Experimentelle Untersuchung einer Pleuelstange',
      tag: 'Diplomprojekt &middot; Werkstoffprüfung',
      intro: 'Sechsmonatiges Diplomprojekt zur Werkstoffanalyse einer Motorpleuelstange und ihres Degradationsverhaltens.',
      bullets: [
        'Zugversuche an einer Universalprüfmaschine durchgeführt',
        'Vickers-Härte gemessen und das Gefüge unter dem Mikroskop untersucht',
        'Den Werkstoff im Rahmen der Charakterisierung auf Einschlüsse geprüft'
      ]
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

  /* ── Impact-chart modal data ─────────────────────────────────────────── */
  var impactData = {
    'cnc': {
      tag: 'Dispensing Process Optimisation &middot; Freudenberg e-Power Systems (M.Sc. Thesis)',
      title: 'CNC Dispensing Throughput: 6&times; Increase',
      intro: 'The core constraint for bonding BPPs was reproducibility of the dispensed bead (the adhesive line) at high speed. Dispensing worked fine at 8&nbsp;mm/s, but mass production required 50&nbsp;mm/s. At that speed, the machine&rsquo;s constant volume pump caused the area of the bead&rsquo;s cross section to vary along its length.',
      bullets: [
        'Reached <strong>50 mm/s</strong> dispensing speed, up from <strong>8 mm/s</strong> (<strong>6&times; faster</strong>), the speed mass production required, while keeping the bead fully within tolerance',
        'Learned to program the DATRON dispensing system from scratch, since no formal training was available, by working through its manual and testing how each setting changed the dispensed line',
        'Found that straight needles choked the flow, laying 20 to 30 mm of adhesive followed by 30 to 40 mm gaps, while tapered needles kept dripping after each stop at 6 bar. A tapered gauge 20 needle at 2 bar gave a clean, unbroken line with no dripping',
        'Followed DATRON&rsquo;s official procedure for tuning the A factor and B factor, its built in settings that compensate for speed changes, running test lines at alternating speeds and adjusting each factor step by step',
        'Verified the results with measurements instead of visual judgement alone, checking the bead&rsquo;s cross section at multiple points with a profilometer, since small variations invisible to the eye can still cause leaks. Across 5 repeat trials the mean bead area stayed between 0.40 and 0.43 mm&sup2;',
        'Observed the bead drifting out of tolerance over the course of the day, even with identical settings. Hourly thermal camera checks showed the dispensing pump warming from 24 &deg;C to about 32 &deg;C, caused by friction between the pump&rsquo;s moving parts and the thick adhesive, which thinned the adhesive and changed how it flowed. Fixed it by adding a heater that holds the pump at a constant 34 &deg;C, which made the process repeatable all day'
      ],
      chartType: 'bar', chartLabel: 'Dispensing speed (mm/s)', chartLabels: ['Before', 'After'], chartValues: [8, 50]
    },
    'co2': {
      tag: 'Energy Systems Analysis &middot; FAU Coursework (Group Project)',
      title: 'Low-CO&#8322; Scenario for Jena: 21.2% CO&#8322; Reduction Modelled',
      intro: 'As part of an FAU coursework group project, we modelled how Jena, a city producing around 300,000 tons of CO&#8322; a year from gas heating and transport alone, could cut its emissions. We analysed 15 years of energy and commuting data and projected trends out to 2040, then modelled four levers: more solar on the grid, biomethane from the city&rsquo;s own waste, a shift to e-bikes and electric buses, and a redesigned power plant. Overall, the plan modelled a 21.2% cut in CO&#8322; emissions.',
      bullets: [
        'Analysed 15 years of Jena&rsquo;s population, energy, and emissions data (2005 to 2019) across electricity, heating, and transport to build a baseline picture of the city&rsquo;s CO&#8322; sources',
        'Modelled a continued rollout of 500 kW of solar capacity every year for the electricity grid through to 2040, an investment of roughly &euro;650,000 annually',
        'Sized a 500 kW biogas plant that could convert the city&rsquo;s household waste, around 211 kg per person a year, into biomethane as a substitute for natural gas, projecting the city&rsquo;s gas linked CO&#8322; to reach 90,635 tons by 2040 with the plan in place, down from a projected 167,941 tons if nothing changed',
        'Modelled a shift in commuting patterns: most private car users switching to e-bikes for 8 months of the year, alongside phasing 44 electric buses into the public transport fleet, rolled out gradually over 20 years through to the early 2040s',
        'Evaluated redesigning the city&rsquo;s actual power plant with a 10.4 MW gas engine and a heat recovery steam turbine in place of the current setup, and separately checked whether retrofitting carbon capture onto the existing plant made economic sense instead'
      ],
      chartType: 'bar', chartLabel: 'CO&#8322; emissions (tons/year)', chartLabels: ['Before', 'After'], chartValues: [158789, 124789]
    },
    'cost': {
      tag: 'Mould Design &amp; Manufacturing &middot; Pragati Udyog (B.E. Group Project)',
      title: 'Wheel Injection Mould: 75% Lower Cost per Wheel',
      intro: 'A manufacturer needed a steady supply of nylon wheels for a solar panel cleaning trolley. Machining them was slow and expensive, and the market price was Rs.&nbsp;110 per wheel. In a 4 person B.E. group project with Pragati Group of Industries, we compared 3D printing, CNC machining and injection moulding. We chose injection moulding for high volume production and took the mould from CAD model to a tested, production ready tool.',
      bullets: [
        '<strong>Rs.&nbsp;27.5</strong> per wheel from the finished mould, against a <strong>Rs.&nbsp;110</strong> market price (<strong>75% lower</strong>), at <strong>45 wheels per hour</strong>. The mould paid back its full cost in <strong>16 hours</strong> of production',
        'Modelled the complete mould in PTC Creo 4.0 from the company&rsquo;s 2D wheel drawing, covering the upper and lower cavity, ejector plates and pins, sprue, runner and cooling circuit, and produced manufacturing drawings for every part',
        'Sized the feed system by calculation, with a <strong>5.2&nbsp;mm</strong> sprue (the 6.5&nbsp;mm standard diameter corrected by nylon&rsquo;s 0.8 factor) and an <strong>8.5&nbsp;mm</strong> runner based on the part weight and runner length',
        'Found injection defects in the first trial and traced the root cause to trapped air. With no way out, the air was compressed by the incoming nylon and stopped the melt from filling the cavity. Fixed it by redesigning the runner and the venting at the parting line so the air could escape ahead of the melt',
        'Validated the mould in a 3 phase trial, checking mould closing, cooling and clean part release first, then the wheel&rsquo;s dimensions, shape and function, and finally a full run on the optimised mould before production'
      ],
      chartType: 'bar', chartLabel: 'Cost per wheel (Rs.)', chartLabels: ['Market price', 'Moulded'], chartValues: [110, 27.5]
    },
    'bpp': {
      tag: 'Bonding &amp; Sealing Process &middot; Freudenberg e-Power Systems (M.Sc. Thesis)',
      title: 'Bipolar Plate Bonding Scale-Up: 342 Plates a Day',
      intro: 'Freudenberg bonded graphite bipolar plates with an adhesive that cured overnight for more than 12 hours under heavy weights, so each station bonded one plate a day, far too slow for series production. My thesis qualified a heat curing adhesive to replace it, developed the dispensing and curing steps, and planned the production layout.',
      bullets: [
        '<strong>342</strong> bipolar plates a day from a <strong>12 station</strong> oven curing layout on two shifts, against <strong>12</strong> a day if the same stations ran the old 12 hour overnight cure. Enough to finish a <strong>3,500 plate</strong> order in <strong>11 working days</strong>',
        'Cut the cure from more than <strong>12 hours</strong> to <strong>27 minutes</strong> (1,600 s at 130 to 135 &deg;C) after comparing IR heating, a hot plate press and an oven with thermocouples on the bond line. IR was dropped because the aluminium tool only reached 62 &deg;C while the plate beneath it hit 171 &deg;C, and the oven won because one oven with several compartments scales better than a row of presses',
        'Sized the line at 12 stations so that the 27 minute cure, shared across the stations, keeps pace with the 137 second cycle for dispensing and joining each plate',
        'Defined the DVP&amp;R plan to qualify the new adhesive and prepared the samples to standard. Six tests covered leaching (ICP-OES), 1,000 hours of chemical ageing at 95 &deg;C, tensile (ISO 37), lap shear (<strong>2.5 MPa</strong>, ISO 4587), thermal stability and leak tightness',
        'Designed a 3D printed leak test fixture and leak tested the bonded plates in five pressure steps up to 2,300 mbar. All plates stayed leak tight',
        'Designed the handling for series production, a vacuum table and gripper plus an alignment fixture that positions the two half plates for bonding'
      ],
      chartType: 'bar', chartLabel: 'Bipolar plates per day (12 stations)', chartLabels: ['Before (12 h+ cure)', 'After (27 min cure)'], chartValues: [12, 342]
    }
  };

  /* ── Impact-chart modal data — German ────────────────────────────────── */
  var impactDataDE = {
    'cnc': {
      tag: 'Optimierung des Dosierprozesses &middot; Freudenberg e-Power Systems (Masterarbeit)',
      title: 'CNC-Dosierdurchsatz: 6-fache Steigerung',
      intro: 'Die zentrale Herausforderung beim Verkleben der BPPs war die Reproduzierbarkeit der dosierten Klebstoffraupe bei hoher Geschwindigkeit. Die Dosierung funktionierte bei 8&nbsp;mm/s einwandfrei, doch die Serienproduktion erforderte 50&nbsp;mm/s. Bei dieser Geschwindigkeit f&uuml;hrte die volumenkonstante Pumpe der Maschine dazu, dass die Querschnittsfl&auml;che der Raupe entlang ihrer L&auml;nge schwankte.',
      bullets: [
        '<strong>50 mm/s</strong> Dosiergeschwindigkeit erreicht, ausgehend von <strong>8 mm/s</strong> (<strong>6-fach schneller</strong>), die von der Serienproduktion geforderte Geschwindigkeit, bei voller Einhaltung der Raupentoleranz',
        'Die Programmierung des DATRON-Dosiersystems von Grund auf selbst erlernt, da keine formale Schulung verf&uuml;gbar war, indem ich mich durch das Handbuch gearbeitet und getestet habe, wie sich jede Einstellung auf die dosierte Linie auswirkt',
        'Festgestellt, dass gerade Nadeln den Fluss abwürgten und nur 20 bis 30 mm Klebstoff mit anschließenden Lücken von 30 bis 40 mm auftrugen, während konische Nadeln bei 6 bar nach jedem Stopp nachtropften. Eine konische Nadel der Größe 20 bei 2 bar ergab eine saubere, durchgehende Linie ohne Nachtropfen',
        'Dem offiziellen DATRON-Verfahren zur Einstellung von A-Faktor und B-Faktor gefolgt, den integrierten Einstellungen zur Kompensation von Geschwindigkeits&auml;nderungen, indem Testlinien mit wechselnden Geschwindigkeiten gefahren und jeder Faktor schrittweise angepasst wurde',
        'Die Ergebnisse durch Messungen statt nur durch Sichtprüfung verifiziert und den Raupenquerschnitt an mehreren Stellen mit einem Profilometer gemessen, da kleine, mit bloßem Auge unsichtbare Abweichungen dennoch zu Undichtigkeiten führen können. Über 5 Wiederholversuche lag die mittlere Raupenfläche zwischen 0,40 und 0,43 mm&sup2;',
        'Beobachtet, dass die Raupe im Laufe des Tages trotz identischer Einstellungen außerhalb der Toleranz driftete. Stündliche Messungen mit der Wärmebildkamera zeigten, dass sich die Dosierpumpe von 24 &deg;C auf etwa 32 &deg;C erwärmte, verursacht durch Reibung zwischen den beweglichen Teilen der Pumpe und dem zähen Klebstoff, wodurch der Klebstoff dünnflüssiger wurde und anders floss. Behoben durch eine Heizung, die die Pumpe konstant auf 34 &deg;C hält, wodurch der Prozess den ganzen Tag reproduzierbar wurde'
      ],
      chartType: 'bar', chartLabel: 'Dosiergeschwindigkeit (mm/s)', chartLabels: ['Vorher', 'Nachher'], chartValues: [8, 50]
    },
    'co2': {
      tag: 'Energiesystemanalyse &middot; FAU Studienprojekt (Gruppenprojekt)',
      title: 'Low-CO&#8322;-Szenario f&uuml;r Jena: 21,2% CO&#8322;-Reduktion modelliert',
      intro: 'Im Rahmen eines FAU Studienprojekts in der Gruppe haben wir modelliert, wie Jena, eine Stadt, die allein durch Erdgasheizung und Verkehr rund 300.000 Tonnen CO&#8322; pro Jahr verursacht, seine Emissionen senken k&ouml;nnte. Wir analysierten 15 Jahre an Energie- und Pendlerdaten und projizierten die Trends bis 2040, dann modellierten wir vier Hebel: mehr Solarenergie im Stromnetz, Biomethan aus dem Abfall der Stadt, einen Umstieg auf E-Bikes und Elektrobusse sowie ein neu konzipiertes Kraftwerk. Insgesamt modellierte der Plan eine CO&#8322;-Reduktion von 21,2%.',
      bullets: [
        'Analysierte 15 Jahre an Bev&ouml;lkerungs-, Energie- und Emissionsdaten Jenas (2005 bis 2019) in den Bereichen Strom, W&auml;rme und Verkehr, um ein Basisbild der CO&#8322;-Quellen der Stadt zu erstellen',
        'Modellierte einen fortlaufenden Ausbau von 500 kW Solarleistung pro Jahr f&uuml;r das Stromnetz bis 2040, eine Investition von rund 650.000 Euro pro Jahr',
        'Dimensionierte eine 500 kW Biogasanlage, die den Hausm&uuml;ll der Stadt, rund 211 kg pro Person und Jahr, in Biomethan als Ersatz f&uuml;r Erdgas umwandeln k&ouml;nnte, und projizierte die erdgasbedingten CO&#8322;-Emissionen der Stadt auf 90.635 Tonnen im Jahr 2040 mit dem Plan, gegen&uuml;ber prognostizierten 167.941 Tonnen ohne &Auml;nderungen',
        'Modellierte eine Verlagerung des Pendelverhaltens: die meisten Nutzer privater Fahrzeuge steigen f&uuml;r 8 Monate im Jahr auf E-Bikes um, zus&auml;tzlich werden schrittweise 44 Elektrobusse &uuml;ber 20 Jahre bis in die fr&uuml;hen 2040er Jahre in die &ouml;ffentliche Busflotte integriert',
        'Bewertete eine Neukonzeption des tats&auml;chlichen Kraftwerks der Stadt mit einem 10,4 MW Gasmotor und einer Dampfturbine zur W&auml;rmer&uuml;ckgewinnung anstelle der bestehenden Anlage, und pr&uuml;fte separat, ob eine Nachr&uuml;stung mit CO&#8322;-Abscheidung am bestehenden Kraftwerk wirtschaftlich sinnvoll w&auml;re'
      ],
      chartType: 'bar', chartLabel: 'CO&#8322;-Emissionen (Tonnen/Jahr)', chartLabels: ['Vorher', 'Nachher'], chartValues: [158789, 124789]
    },
    'cost': {
      tag: 'Formenbau &amp; Fertigung &middot; Pragati Udyog (Bachelor Gruppenprojekt)',
      title: 'Spritzgussform f&uuml;r R&auml;der: 75% geringere Kosten pro Rad',
      intro: 'Ein Hersteller ben&ouml;tigte eine st&auml;ndige Versorgung mit Nylonr&auml;dern f&uuml;r einen Solarpanel Reinigungswagen. Die spanende Fertigung war langsam und teuer, und der Marktpreis lag bei Rs.&nbsp;110 pro Rad. In einem Gruppenprojekt zu viert im Bachelorstudium, gemeinsam mit der Pragati Group of Industries, haben wir 3D-Druck, CNC-Bearbeitung und Spritzguss verglichen. Wir haben uns f&uuml;r den Spritzguss als Verfahren f&uuml;r hohe St&uuml;ckzahlen entschieden und die Form vom CAD-Modell bis zum getesteten, serienreifen Werkzeug umgesetzt.',
      bullets: [
        '<strong>Rs.&nbsp;27,5</strong> pro Rad aus der fertigen Form, gegen&uuml;ber einem Marktpreis von <strong>Rs.&nbsp;110</strong> (<strong>75% g&uuml;nstiger</strong>), bei <strong>45 R&auml;dern pro Stunde</strong>. Die Form hatte ihre gesamten Kosten nach <strong>16 Stunden</strong> Produktion wieder eingespielt',
        'Die komplette Form in PTC Creo 4.0 auf Basis der 2D-Radzeichnung des Unternehmens modelliert, einschlie&szlig;lich oberer und unterer Kavit&auml;t, Auswerferplatten und Auswerferstiften, Anguss, Verteilerkanal und K&uuml;hlkreislauf, und Fertigungszeichnungen f&uuml;r jedes Bauteil erstellt',
        'Das Angusssystem rechnerisch ausgelegt, mit einem <strong>5,2&nbsp;mm</strong> Anguss (der Standarddurchmesser von 6,5&nbsp;mm, korrigiert um den Nylonfaktor 0,8) und einem <strong>8,5&nbsp;mm</strong> Verteilerkanal, abgeleitet aus Bauteilgewicht und Kanall&auml;nge',
        'Im ersten Versuch Spritzfehler festgestellt und die Ursache auf eingeschlossene Luft zur&uuml;ckgef&uuml;hrt. Ohne Austrittsm&ouml;glichkeit wurde sie von der einstr&ouml;menden Nylonschmelze komprimiert und verhinderte die vollst&auml;ndige F&uuml;llung der Kavit&auml;t. Behoben durch eine Neugestaltung des Verteilerkanals und der Entl&uuml;ftung an der Trennebene, sodass die Luft vor der Schmelze entweichen konnte',
        'Die Form in einer dreistufigen Erprobung validiert, zuerst Schlie&szlig;en der Form, K&uuml;hlung und saubere Entformung, dann Ma&szlig;e, Form und Funktion des Rades und abschlie&szlig;end ein kompletter Lauf mit der optimierten Form vor der Serienproduktion'
      ],
      chartType: 'bar', chartLabel: 'Kosten pro Rad (Rs.)', chartLabels: ['Marktpreis', 'Spritzguss'], chartValues: [110, 27.5]
    },
    'bpp': {
      tag: 'Verklebung &amp; Abdichtung &middot; Freudenberg e-Power Systems (Masterarbeit)',
      title: 'Skalierung der Bipolarplatten-Verklebung: 342 Platten pro Tag',
      intro: 'Freudenberg verklebte Graphit-Bipolarplatten mit einem Klebstoff, der über Nacht mehr als 12 Stunden unter schweren Gewichten aushärtete, sodass jede Station eine Platte pro Tag verklebte, viel zu langsam für die Serienfertigung. In meiner Masterarbeit habe ich einen warmhärtenden Klebstoff als Ersatz qualifiziert, das Dosieren und Aushärten entwickelt und das Produktionslayout geplant.',
      bullets: [
        '<strong>342</strong> Bipolarplatten pro Tag mit einem Ofen-Aushärtungslayout aus <strong>12 Stationen</strong> im Zweischichtbetrieb, gegenüber <strong>12</strong> pro Tag, wenn dieselben Stationen mit der alten 12 Stunden Aushärtung über Nacht laufen würden. Genug für einen Auftrag über <strong>3.500 Platten</strong> in <strong>11 Arbeitstagen</strong>',
        'Die Aushärtung von mehr als <strong>12 Stunden</strong> auf <strong>27 Minuten</strong> verkürzt (1.600 s bei 130 bis 135 &deg;C), nach einem Vergleich von IR-Heizung, Heizplattenpresse und Ofen mit Thermoelementen in der Klebefuge. IR schied aus, weil das Aluminiumwerkzeug nur 62 &deg;C erreichte, während die Platte darunter 171 &deg;C erreichte, und der Ofen setzte sich durch, weil ein Ofen mit mehreren Fächern besser skaliert als eine Reihe von Pressen',
        'Die Linie auf 12 Stationen ausgelegt, damit die 27 Minuten Aushärtung, verteilt auf die Stationen, mit dem 137 Sekunden Takt für Dosieren und Fügen jeder Platte Schritt hält',
        'Den DVP&amp;R-Plan zur Qualifizierung des neuen Klebstoffs festgelegt und die Proben normgerecht vorbereitet. Sechs Prüfungen deckten Auslaugung (ICP-OES), 1.000 Stunden chemische Alterung bei 95 &deg;C, Zugversuch (ISO 37), Zugscherfestigkeit (<strong>2,5 MPa</strong>, ISO 4587), thermische Stabilität und Dichtheit ab',
        'Eine 3D-gedruckte Dichtheitsprüfvorrichtung konstruiert und die verklebten Platten in fünf Druckstufen bis 2.300 mbar geprüft. Alle Platten blieben dicht',
        'Das Handling für die Serienfertigung konzipiert, einen Vakuumtisch und Greifer sowie eine Ausrichtvorrichtung, die die beiden Halbplatten zum Verkleben positioniert'
      ],
      chartType: 'bar', chartLabel: 'Bipolarplatten pro Tag (12 Stationen)', chartLabels: ['Vorher (12 h+ Aushärtung)', 'Nachher (27 min Aushärtung)'], chartValues: [12, 342]
    }
  };

  document.querySelectorAll('.chart-card[data-modal]').forEach(function (card) {
    card.addEventListener('click', function () {
      var __lang3 = window.__i18n ? window.__i18n.getLang() : 'en';
      var d = (__lang3 === 'de' ? impactDataDE : impactData)[card.dataset.modal];
      if (!d) return;
      var html = '<button id="modal-close">&#x2715;</button>'
        + '<div class="m-role">' + d.tag + '</div>'
        + '<div class="m-title">' + d.title + '</div>'
        + (d.date ? '<div class="m-date">' + d.date + '</div>' : '')
        + '<div class="m-intro">' + d.intro + '</div>'
        + '<ul class="m-bullets">' + d.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>';
      if (d.chartValues) {
        html += '<div class="m-chart-wrap">'
          + '<canvas id="modal-chart" data-type="' + (d.chartType || 'bar') + '" data-label="' + d.chartLabel + '"'
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
              pointLabels: { color: '#ccd6f6', font: { size: 9 }, padding: 14 }
            }
          },
          layout: { padding: { top: 24, left: 24, right: 24, bottom: 10 } }
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
            data: [8, 50],
            backgroundColor: ['rgba(100,255,218,.2)', 'rgba(100,255,218,.7)'],
            borderColor: '#64ffda', borderWidth: 1.5, borderRadius: 6
          }]
        },
        options: Object.assign({}, baseOpts, {
          indexAxis: 'y',
          scales: {
            x: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 10 }, maxRotation: 0, callback: function (v) { return v % 25 === 0 ? v + ' mm/s' : ''; } } },
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
          labels: ['Market price', 'Moulded'],
          datasets: [{
            data: [110, 27.5],
            backgroundColor: ['rgba(255,80,80,.35)', 'rgba(100,255,218,.6)'],
            borderColor: ['#ff5050', '#64ffda'],
            borderWidth: 1.5, borderRadius: 6
          }]
        },
        options: Object.assign({}, baseOpts, {
          scales: {
            x: { grid: { display: false }, ticks: { color: '#ccd6f6', font: { size: 10 } } },
            y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 10 }, callback: function (v) { return 'Rs ' + v; } } }
          }
        })
      });
    }

    /* Bar — BPP plates per day before and after */
    var bppEl = document.getElementById('chart-bpp');
    if (bppEl) {
      new Chart(bppEl, {
        type: 'bar',
        data: {
          labels: ['Before (12 h+ cure)', 'After (27 min cure)'],
          datasets: [{
            data: [12, 342],
            backgroundColor: ['rgba(255,80,80,.35)', 'rgba(100,255,218,.6)'],
            borderColor: ['#ff5050', '#64ffda'], borderWidth: 1.5, borderRadius: 6
          }]
        },
        options: Object.assign({}, baseOpts, {
          scales: {
            x: { grid: { display: false }, ticks: { color: '#ccd6f6', font: { size: 10 } } },
            y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,.05)' }, ticks: { color: '#8892b0', font: { size: 10 } } }
          }
        })
      });
    }

  } // end typeof Chart guard

}); // end DOMContentLoaded
