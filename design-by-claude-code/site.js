/* CognitMind — shared site behavior across pages.
   Exposes window.NDSite = { EN, initPage }. Loaded as a classic script in each page's <helmet>. */
(function () {
  var EN = {
    'nav.home':'Home','nav.services':'Services','nav.learn':'Learn','nav.company':'Company','nav.cta':'Book a free call',
    'hero.kicker':'AI, explained and engineered.',
    'hero.h1a':'We take AI from ','hero.h1b':'experiment','hero.h1c':' to ','hero.h1d':'production.',
    'hero.cta1':'Book a free call','hero.cta2':'Learn AI',
    'cred.kicker':'Experience built at',
    'home.teaser.kicker':'What we do',
    'home.teaser.heading':'From the experiment to production.',
    'home.teaser.s.title':'Consulting','home.teaser.s.desc':'A ladder of services from a Discovery Sprint to full deployment.','home.teaser.s.cta':'See services →',
    'home.teaser.l.title':'Learn','home.teaser.l.desc':'No-hype explainers: papers and videos to actually understand AI.','home.teaser.l.cta':'Explore Learn →',
    'home.teaser.c.title':'Company','home.teaser.c.desc':'Nearly a decade building AI, vision, backend and data.','home.teaser.c.cta':'About us →',
    'services.kicker':'Services',
    'services.heading':'One ladder — from diagnosis to production.',
    'services.sub':'Start where it makes sense. Every step delivers value on its own.',
    's1.title':'AI Discovery Sprint','s1.badge':'Entry point','s1.meta':'1–2 weeks · fixed price',
    's1.desc':'We diagnose where AI adds value, what data exists and what is feasible. You get a prioritized roadmap with estimates.',
    's2.title':'Proof of Concept / MVP','s2.meta':'3–8 weeks · fixed price',
    's2.desc':'A working prototype of the prioritized solution: predictive, vision, NLP/LLM or a data pipeline.',
    's3.title':'Build & Deploy','s3.meta':'2–4+ months',
    's3.desc':'Full solution to production: MLOps, cloud deployment, monitoring, documentation and handover.',
    's4.title':'Fractional Head of AI','s4.meta':'monthly retainer',
    's4.desc':'Part-time technical leadership: architecture, review, mentorship and AI strategy.',
    's5.title':'Workshops & Training','s5.meta':'per session',
    's5.desc':'Team training: ML, LLMs/MCP and AI applied to security.',
    'cap.kicker':'Technical capabilities','cap.heading':'What we build, end to end.',
    'c1.title':'End-to-end Machine Learning','c1.desc':'From raw data to a model in production.',
    'c2.title':'Computer Vision','c2.desc':'Detection, tracking and models on the edge.',
    'c3.title':'NLP & LLMs','c3.desc':'RAG, agents and MCP, done with judgment.',
    'c4.title':'Data engineering & backend','c4.desc':'Pipelines and APIs that survive production.',
    'c5.title':'MLOps & deployment','c5.desc':'AWS / GCP, monitoring and model CI/CD.',
    'learn.kicker':'Community · Learn','learn.heading':'Actually understand AI.',
    'learn.sub':'No-hype explainers: the same clarity we work with, open to everyone.',
    'learn.p1.tag':'Community app','learn.p1.title':'Paper Explainer',
    'learn.p1.desc':'Explore arXiv papers with plain-language explanations: context → problem → what they did → why it matters.',
    'learn.p1.cta':'Open Paper Explainer →',
    'learn.p2.tag':'YouTube','learn.p2.title':'CognitMind explains',
    'learn.p2.desc':'Short videos with the intuition behind each topic, in Spanish. Simple, but rigorous.',
    'learn.p2.cta':'Watch the channel →',
    'learn.soon':'Coming soon','learn.soon2':'Coming soon',
    'company.kicker':'The company','company.heading':'We study the problem before promising anything.',
    'company.body':'CognitMind is an AI and data consultancy founded by Florencia Vela — a Computer Engineer (honors) with an AI specialization from UBA (9.2/10). Nearly a decade building AI, computer vision, backend and data: from fraud detection at MercadoLibre to leading AI teams. That is why every project starts with a Discovery. No hype.',
    'company.linkedin':'Florencia on LinkedIn →',
    'st1.label':'AI Specialization · UBA','st2.label':'years in AI & data',
    'st3.label':'inference optimized · YOLO','st4.label':'proven technical leadership',
    'contact.kicker':'Contact','contact.heading':'Got a problem AI could solve?',
    'contact.body':"Let's start with a Discovery: we study your case and return a clear plan, no strings attached.",
    'contact.cta':'Book a free call',
    'footer.tagline':'AI, explained and engineered.'
  };

  function applyLang(api, lang) {
    api.lang = lang;
    var root = api.root;
    root.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (lang === 'en') { if (api.EN[k] != null) el.textContent = api.EN[k]; }
      else { if (api._orig[k] != null) el.textContent = api._orig[k]; }
    });
    root.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      var active = b.getAttribute('data-lang-btn') === lang;
      b.style.background = active ? '#5BE9FF' : 'transparent';
      b.style.color = active ? '#0A0B0D' : '#9AA0AA';
    });
    try { document.documentElement.lang = lang; } catch (e) {}
    if (api._buildParticleWords) api._buildParticleWords();
  }

  function setLang(api, lang) {
    if (lang === api.lang) return;
    try { localStorage.setItem('nd_lang', lang); } catch (e) {}
    applyLang(api, lang);
  }

  function initLang(api) {
    api._orig = {};
    api.root.querySelectorAll('[data-i18n]').forEach(function (el) {
      api._orig[el.getAttribute('data-i18n')] = el.textContent;
    });
    api.root.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(api, b.getAttribute('data-lang-btn')); });
    });
    var stored = 'es';
    try { stored = localStorage.getItem('nd_lang') || 'es'; } catch (e) {}
    api.lang = 'es';
    if (stored === 'en') applyLang(api, 'en');
  }

  function initNavHover(api) {
    api.root.querySelectorAll('[data-navlink]').forEach(function (a) {
      if (a.getAttribute('data-active') === '1') return;
      a.addEventListener('mouseenter', function () { a.style.color = '#F3F5F8'; });
      a.addEventListener('mouseleave', function () { a.style.color = '#9AA0AA'; });
    });
  }

  function initReveals(api) {
    var root = api.root;
    function animateCount(el) {
      var to = parseFloat(el.getAttribute('data-count'));
      var dec = parseInt(el.getAttribute('data-count-dec') || '0', 10);
      var dur = 1100, start = performance.now();
      function tick(now) {
        var t = Math.min(1, (now - start) / dur);
        var e = 1 - Math.pow(1 - t, 3);
        el.textContent = (to * e).toFixed(dec);
        if (t < 1) requestAnimationFrame(tick); else el.textContent = to.toFixed(dec);
      }
      requestAnimationFrame(tick);
    }
    var revealEls = Array.prototype.slice.call(root.querySelectorAll('[data-reveal]'));
    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.transition = 'opacity .85s cubic-bezier(.2,.7,.2,1), transform .85s cubic-bezier(.2,.7,.2,1)';
      var d = el.getAttribute('data-reveal-delay');
      if (d) el.style.transitionDelay = d + 'ms';
    });
    function revealCheck() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = revealEls.length - 1; i >= 0; i--) {
        var el = revealEls[i];
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > 0) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.querySelectorAll('[data-count]').forEach(animateCount);
          revealEls.splice(i, 1);
        }
      }
    }
    window.addEventListener('scroll', revealCheck, { passive: true });
    revealCheck();
    setTimeout(revealCheck, 120);
    setTimeout(revealCheck, 650);
  }

  function initScrollUI(api) {
    var root = api.root;
    var bar = root.querySelector('#nd-progress');
    var nav = root.querySelector('#nd-nav');
    function onScroll() {
      var st = window.scrollY || document.documentElement.scrollTop;
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (dh > 0 ? (st / dh * 100) : 0) + '%';
      if (nav) {
        if (st > 16) {
          nav.style.background = 'rgba(10,11,13,.82)';
          nav.style.backdropFilter = 'blur(12px)';
          nav.style.webkitBackdropFilter = 'blur(12px)';
          nav.style.borderBottomColor = 'rgba(255,255,255,.08)';
        } else {
          nav.style.background = 'transparent';
          nav.style.backdropFilter = 'none';
          nav.style.webkitBackdropFilter = 'none';
          nav.style.borderBottomColor = 'transparent';
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- hero neural canvas ---------- */
  function setupCanvas(api) {
    var root = api.root;
    var c = root.querySelector('#nd-canvas');
    var hero = root.querySelector('#nd-hero');
    if (!c || !hero) return;
    var ctx = c.getContext('2d');
    var w = 0, h = 0, dpr = 1, pts = [];
    api.sizeCanvas = function () {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = hero.clientWidth; h = hero.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      c.style.width = w + 'px'; c.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var N = Math.max(28, Math.min(70, Math.floor(w * h / 24000)));
      pts = [];
      for (var i = 0; i < N; i++) pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .26, vy: (Math.random() - .5) * .26, tw: Math.random() * Math.PI * 2, sp: 0.5 + Math.random() * 1.6, rad: 1.1 + Math.random() * 1.7, beacon: Math.random() < 0.22 });
    };
    api.sizeCanvas();
    window.addEventListener('resize', function () { api.sizeCanvas && api.sizeCanvas(); });
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function frame() {
      ctx.clearRect(0, 0, w, h);
      var t = performance.now() / 1000;
      for (var a = 0; a < pts.length; a++) {
        var p = pts[a];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (var i = 0; i < pts.length; i++) {
        for (var j = i + 1; j < pts.length; j++) {
          var A = pts[i], B = pts[j];
          var dx = A.x - B.x, dy = A.y - B.y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            ctx.strokeStyle = 'rgba(91,233,255,' + (1 - d / 150) * 0.16 + ')';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
          }
        }
      }
      for (var k = 0; k < pts.length; k++) {
        var q = pts[k];
        var tw = 0.5 + 0.5 * Math.sin(t * q.sp + q.tw);
        var intensity = q.beacon ? (0.45 + tw * 0.55) : (0.25 + tw * 0.45);
        ctx.save();
        ctx.shadowColor = 'rgba(91,233,255,0.95)';
        ctx.shadowBlur = (q.beacon ? 16 : 8) + tw * (q.beacon ? 26 : 14);
        ctx.fillStyle = 'rgba(120,240,255,' + intensity + ')';
        ctx.beginPath(); ctx.arc(q.x, q.y, q.rad * (0.85 + tw * 0.5), 0, 7); ctx.fill();
        ctx.shadowBlur = (q.beacon ? 10 : 4) + tw * 8;
        ctx.fillStyle = 'rgba(235,253,255,' + (0.5 + tw * 0.5) + ')';
        ctx.beginPath(); ctx.arc(q.x, q.y, q.rad * (0.42 + tw * 0.18), 0, 7); ctx.fill();
        ctx.restore();
      }
      if (!reduce) api._raf = requestAnimationFrame(frame);
    }
    frame();
  }

  /* ---------- particle-text words ---------- */
  function buildWord(api, span) {
    var cs = getComputedStyle(span);
    var fs = parseFloat(cs.fontSize);
    if (!fs || !span.offsetWidth) return null;
    var padX = fs * 0.18, padY = fs * 0.30;
    var wCss = span.offsetWidth + padX * 2;
    var hCss = span.offsetHeight + padY * 2;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var off = document.createElement('canvas');
    off.width = Math.ceil(wCss); off.height = Math.ceil(hCss);
    var octx = off.getContext('2d');
    octx.fillStyle = '#fff';
    octx.textBaseline = 'middle';
    octx.textAlign = 'left';
    try { octx.letterSpacing = cs.letterSpacing; } catch (e) {}
    octx.font = '700 ' + fs + 'px ' + cs.fontFamily;
    octx.fillText(span.textContent, padX, hCss / 2);
    var img;
    try { img = octx.getImageData(0, 0, off.width, off.height).data; } catch (e) { return null; }
    var step = Math.max(2, Math.round(fs / 42));
    var homes = [];
    for (var y = 0; y < off.height; y += step) {
      for (var x = 0; x < off.width; x += step) {
        if (img[(y * off.width + x) * 4 + 3] > 128) homes.push([x, y]);
      }
    }
    if (!homes.length) return null;
    var cv = span._pcanvas;
    if (!cv) {
      cv = document.createElement('canvas');
      cv.style.position = 'absolute';
      cv.style.pointerEvents = 'none';
      cv.style.zIndex = '2';
      span.parentElement.appendChild(cv);
      span._pcanvas = cv;
    }
    cv.style.left = (span.offsetLeft - padX) + 'px';
    cv.style.top = (span.offsetTop - padY) + 'px';
    cv.style.width = wCss + 'px';
    cv.style.height = hCss + 'px';
    cv.width = Math.ceil(wCss * dpr); cv.height = Math.ceil(hCss * dpr);
    var ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var particles = homes.map(function (hh) { return { hx: hh[0], hy: hh[1], x: hh[0], y: hh[1], vx: 0, vy: 0 }; });
    span.style.color = 'transparent';
    var key = span.getAttribute('data-i18n');
    var accent = (key === 'hero.h1b' || key === 'hero.h1d');
    return { span: span, cv: cv, ctx: ctx, particles: particles, w: wCss, h: hCss, accent: accent };
  }

  function particleFrame(api) {
    var R = 78, push = 2.6, spring = 0.052, damp = 0.85, stretch = 2.6;
    var words = api.particleWords || [];
    for (var n = 0; n < words.length; n++) {
      var W = words[n];
      var ctx = W.ctx, particles = W.particles;
      ctx.clearRect(0, 0, W.w, W.h);
      var rect = W.cv.getBoundingClientRect();
      var mx = api.mouse.x - rect.left, my = api.mouse.y - rect.top;
      var near = (mx > -160 && mx < W.w + 160 && my > -160 && my < W.h + 160);
      ctx.lineCap = 'round';
      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = W.accent ? 'rgba(91,233,255,0.82)' : 'rgba(240,244,248,0.85)';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      var moving = [];
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (near) {
          var dx = p.x - mx, dy = p.y - my, d2 = dx * dx + dy * dy;
          if (d2 < R * R) { var d = Math.sqrt(d2) || 1, f = (1 - d / R) * push; p.vx += dx / d * f; p.vy += dy / d * f; }
        }
        p.vx = (p.vx + (p.hx - p.x) * spring) * damp;
        p.vy = (p.vy + (p.hy - p.y) * spring) * damp;
        p.x += p.vx; p.y += p.vy;
        if (Math.abs(p.vx) + Math.abs(p.vy) < 0.35) {
          ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 0.01, p.y);
        } else {
          moving.push(p);
        }
      }
      ctx.stroke();
      for (var m = 0; m < moving.length; m++) {
        var pp = moving[m];
        var sp = Math.min(1, (Math.abs(pp.vx) + Math.abs(pp.vy)) / 16);
        var cr, cg, cb;
        if (W.accent) { cr = (91 + (58 - 91) * sp) | 0; cg = (233 + (110 - 233) * sp) | 0; cb = 255; }
        else { cr = (240 + (255 - 240) * sp) | 0; cg = (244 + (255 - 244) * sp) | 0; cb = (248 + (255 - 248) * sp) | 0; }
        ctx.strokeStyle = 'rgba(' + cr + ',' + cg + ',' + cb + ',' + (0.8 + sp * 0.2) + ')';
        ctx.lineWidth = 1.8 + sp * 1.0;
        ctx.beginPath();
        ctx.moveTo(pp.x, pp.y);
        ctx.lineTo(pp.x - pp.vx * stretch, pp.y - pp.vy * stretch);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  function setupParticleText(api) {
    var root = api.root;
    var spans = [
      root.querySelector('[data-i18n="hero.h1a"]'),
      root.querySelector('[data-i18n="hero.h1b"]'),
      root.querySelector('[data-i18n="hero.h1c"]'),
      root.querySelector('[data-i18n="hero.h1d"]')
    ].filter(Boolean);
    if (!spans.length) return;
    var h1 = spans[0].closest('h1');
    if (h1) h1.style.position = 'relative';
    api.mouse = { x: -9999, y: -9999 };
    var hero = root.querySelector('#nd-hero');
    if (hero) {
      hero.addEventListener('mousemove', function (e) { api.mouse.x = e.clientX; api.mouse.y = e.clientY; });
      hero.addEventListener('mouseleave', function () { api.mouse.x = -9999; api.mouse.y = -9999; });
    }
    function build() { api.particleWords = spans.map(function (s) { return buildWord(api, s); }).filter(Boolean); particleFrame(api); }
    api._buildParticleWords = build;
    function startLoop() { if (api._praf) return; (function loop() { particleFrame(api); api._praf = requestAnimationFrame(loop); })(); }
    var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    ready.then(function () { build(); startLoop(); });
    setTimeout(function () { build(); startLoop(); }, 500);
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(build, 200); });
  }

  function initPage(root, opts) {
    opts = opts || {};
    if (!root) return;
    var api = { root: root, lang: 'es', EN: EN };
    initLang(api);
    initNavHover(api);
    initReveals(api);
    initScrollUI(api);
    if (opts.hero) { setupCanvas(api); setupParticleText(api); }
    return api;
  }

  window.NDSite = { EN: EN, initPage: initPage };
})();
