<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Valentine ❤️ – Do you love me?</title>
  <meta name="description" content="A playful Valentine's Day mini‑site with floating hearts, a Yes/No love prompt, countdown, and a cute letter.">
  <style>
    :root{
      --bg1:#ffafbd; /* pink */
      --bg2:#ffc3a0; /* peach */
      --text:#2a132b;
      --white:#fff;
      --accent:#ff4d6d;
      --accent-2:#ff758f;
      --shadow:0 10px 30px rgba(0,0,0,.15);
      --glass:rgba(255,255,255,.35);
    }
    *{box-sizing:border-box}
    html,body{height:100%}
    body{
      margin:0; font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji;
      color:var(--text);
      background: linear-gradient(135deg,var(--bg1),var(--bg2));
      overflow-x:hidden;
    }
    /* Floating hearts background */
    .bg-hearts{position:fixed; inset:0; pointer-events:none; z-index:0; overflow:hidden}
    .heart{position:absolute; width:18px; height:18px; transform:rotate(-45deg); opacity:.6; animation: floatUp linear infinite}
    .heart::before,.heart::after{content:""; position:absolute; width:18px; height:18px; background:currentColor; border-radius:50%}
    .heart::before{top:-9px; left:0}
    .heart::after{left:9px; top:0}
    @keyframes floatUp{from{transform:translateY(100vh) rotate(-45deg)} to{transform:translateY(-15vh) rotate(-45deg)}}

    header{
      position:relative; z-index:2; text-align:center; padding:48px 16px 16px;
    }
    .badge{
      display:inline-block; background:var(--glass); color:#7a2941; backdrop-filter: blur(8px);
      border:1px solid rgba(255,255,255,.5); padding:6px 12px; border-radius:999px; font-weight:600; letter-spacing:.2px; box-shadow: var(--shadow);
    }
    h1{font-size: clamp(36px, 5vw, 60px); margin:16px 0 8px}
    .sub{opacity:.8; font-size:clamp(14px,2.5vw,18px)}

    main{position:relative; z-index:2; display:grid; gap:24px; grid-template-columns:1fr; max-width:1050px; margin:24px auto 80px; padding:0 16px}

    .card{
      background:rgba(255,255,255,.6); border:1px solid rgba(255,255,255,.7); backdrop-filter: blur(10px);
      border-radius:24px; padding:22px; box-shadow: var(--shadow);
    }

    /* Yes/No section */
    .prompt{display:grid; grid-template-columns:1.1fr .9fr; gap:16px}
    @media (max-width: 860px){.prompt{grid-template-columns:1fr}} 

    .question{display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:24px 12px}
    .question h2{font-size: clamp(28px,4.5vw,44px); margin:0 0 8px}
    .buttons{display:flex; gap:16px; flex-wrap:wrap; justify-content:center}
    button{
      cursor:pointer; border:none; border-radius:999px; padding:14px 22px; font-size:18px; font-weight:700; transition:.2s transform ease, .2s box-shadow ease, .2s opacity;
      box-shadow: 0 8px 18px rgba(0,0,0,.18)
    }
    .yes{background:linear-gradient(90deg,var(--accent),var(--accent-2)); color:var(--white)}
    .no{background:#ffd6e0; color:#7a2941}
    button:active{transform: scale(.98)}

    .polaroid{
      position:relative; background:#fff; border-radius:16px; padding:14px; box-shadow: var(--shadow); text-align:center
    }
    .polaroid img{width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:12px}
    .polaroid .caption{font-weight:700; padding-top:8px}

    /* Countdown */
    .countdown{display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:6px}
    .timer{min-width:90px; background:#fff; border-radius:14px; padding:10px; text-align:center; box-shadow: var(--shadow)}
    .timer .num{font-size:26px; font-weight:800}
    .timer .lbl{opacity:.7; font-size:12px}

    /* Love letter */
    .letter{display:grid; grid-template-columns:1fr 1fr; gap:16px}
    @media (max-width: 860px){.letter{grid-template-columns:1fr}}
    .letter textarea{width:100%; min-height:160px; resize:vertical; border-radius:14px; border:1px solid #ffd0da; padding:12px; font-size:16px; outline:none}
    .letter input{width:100%; border-radius:999px; border:1px solid #ffd0da; padding:12px 14px; font-size:16px; outline:none}
    .letter .preview{background:#fff; border-radius:18px; padding:16px; box-shadow: var(--shadow)}

    footer{color:#6d2a40; text-align:center; padding:30px 12px; opacity:.9}

    /* hidden celebratory banner */
    .celebrate{display:none; text-align:center}
    .celebrate h3{font-size: clamp(26px, 5vw, 40px); margin:6px 0}
    .celebrate p{margin:0}

    /* confetti canvas on top */
    #confetti{position:fixed; inset:0; pointer-events:none; z-index:5}
  </style>
</head>
<body>
  <!-- Floating hearts background (generated in JS) -->
  <div class="bg-hearts" id="bgHearts" aria-hidden="true"></div>
  <canvas id="confetti"></canvas>

  <header>
    <span class="badge">Valentine's Special</span>
    <h1>Do you love me? 💘</h1>
    <p class="sub">A cute, copy‑paste site for confessions, proposals, and blushes.</p>
  </header>

  <main>
    <!-- Yes/No prompt -->
    <section class="card prompt">
      <div class="question">
        <h2><span id="nameTarget">Hey you</span>… be my Valentine?</h2>
        <div class="buttons">
          <button class="yes" id="yesBtn">Yes 💖</button>
          <button class="no" id="noBtn">No 💔</button>
        </div>
        <div class="celebrate" id="celebrate">
          <h3>Yay! We're on the same wavelength 💞</h3>
          <p>A thousand hearts are dancing for us right now.</p>
        </div>
        <div class="countdown" aria-live="polite" id="countdown"></div>
      </div>
      <div class="polaroid">
        <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop" alt="Two hearts and soft pink bokeh"/>
        <div class="caption">You + Me = ✨</div>
      </div>
    </section>

    <!-- Love letter composer -->
    <section class="card">
      <h2 style="margin:6px 0 14px">Write a sweet note</h2>
      <div class="letter">
        <div>
          <label>Their name</label>
          <input id="toName" placeholder="e.g., Khine, Alex, Honey" />
          <label style="display:block; margin-top:10px">Your message</label>
          <textarea id="note" placeholder="Write from the heart…"></textarea>
          <div style="display:flex; gap:10px; margin-top:10px">
            <button class="yes" id="fillTemplate">Use cute template ✍️</button>
            <button class="no" id="copyLetter">Copy letter 📋</button>
          </div>
        </div>
        <div class="preview" id="preview">
          <h3 style="margin:0">Preview</h3>
          <p>Dear <strong><span id="previewName">Valentine</span></strong>,</p>
          <p id="previewBody">Every heartbeat spells your name. Be my forever Valentine?</p>
          <p>Yours, <em>You</em> 💗</p>
        </div>
      </div>
    </section>
  </main>

  <footer>
    Made with ❤. Tip: send this page link to your crush, or save it as an app on your phone!
  </footer>

  <script>
    // ---------- Floating background hearts ----------
    (function makeHearts(){
      const colors = ["#ff4d6d","#ff8fa3","#f783ac","#faa2c1","#ffccd5"]; 
      const c = document.getElementById('bgHearts');
      const H = () => Math.max(window.innerHeight, document.documentElement.clientHeight);
      const W = () => Math.max(window.innerWidth, document.documentElement.clientWidth);
      function spawn(){
        const h = document.createElement('div');
        h.className = 'heart';
        h.style.left = Math.random()*W() + 'px';
        h.style.bottom = '-20px';
        h.style.color = colors[Math.random()*colors.length|0];
        const dur = 12 + Math.random()*14; // seconds
        h.style.animationDuration = dur + 's';
        h.style.scale = (0.6 + Math.random()*1.2).toFixed(2);
        c.appendChild(h);
        setTimeout(()=> h.remove(), dur*1000);
      }
      for(let i=0;i<28;i++) setTimeout(spawn, i*300);
      setInterval(spawn, 1200);
      addEventListener('resize', ()=>{});
    })();

    // ---------- Cheeky No button that dodges the mouse ----------
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');
    let dodgeCount = 0;
    function moveNo(){
      const r = noBtn.getBoundingClientRect();
      const pad = 12;
      const nx = Math.max(pad, Math.min(window.innerWidth - r.width - pad, Math.random()*(window.innerWidth - r.width)));
      const ny = Math.max(pad, Math.min(window.innerHeight - r.height - pad, Math.random()*(window.innerHeight - r.height)));
      noBtn.style.position='fixed';
      noBtn.style.left = nx + 'px';
      noBtn.style.top = ny + 'px';
      dodgeCount++;
      if(dodgeCount>4){ noBtn.style.opacity = 0.8 }
      if(dodgeCount>8){ noBtn.style.opacity = 0.6 }
      if(dodgeCount>12){ noBtn.style.opacity = 0.4 }
    }
    noBtn.addEventListener('mouseenter', moveNo);
    noBtn.addEventListener('click', moveNo);

    // ---------- Yes button celebration ----------
    const banner = document.getElementById('celebrate');
    yesBtn.addEventListener('click', ()=>{
      banner.style.display='block';
      burstHearts(window.innerWidth/2, window.innerHeight/2);
      // gently jiggle Yes button for flair
      yesBtn.animate([{transform:'scale(1)'},{transform:'scale(1.08)'},{transform:'scale(1)'}],{duration:400,iterations:1});
    });

    // ---------- Confetti hearts ----------
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize(){canvas.width = innerWidth; canvas.height = innerHeight}
    addEventListener('resize', resize); resize();

    function heartPath(ctx, size){
      const s = size;
      ctx.moveTo(0, s/4);
      ctx.bezierCurveTo(0, -s/12, s/2, -s/12, s/2, s/4);
      ctx.bezierCurveTo(s/2, s/1.5, 0, s/1.3, 0, s);
      ctx.bezierCurveTo(0, s/1.3, -s/2, s/1.5, -s/2, s/4);
      ctx.bezierCurveTo(-s/2, -s/12, 0, -s/12, 0, s/4);
    }

    function burstHearts(x, y){
      const colors = ['#ff4d6d','#ff8fa3','#f783ac','#faa2c1','#ffccd5','#fff'];
      for(let i=0;i<90;i++){
        const ang = Math.random()*Math.PI*2;
        const spd = 2 + Math.random()*5;
        particles.push({
          x, y, vx: Math.cos(ang)*spd, vy: Math.sin(ang)*spd-2,
          life: 90 + Math.random()*50,
          size: 6 + Math.random()*10,
          color: colors[i%colors.length],
          rot: Math.random()*Math.PI, vr: (Math.random()-.5)*0.1
        });
      }
    }

    function step(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles = particles.filter(p=> p.life>0);
      particles.forEach(p=>{
        p.life--; p.vy += 0.05; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color; ctx.beginPath(); heartPath(ctx, p.size); ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(step);
    }
    step();

    // Click anywhere to pop hearts
    addEventListener('click', (e)=>{ if(e.target.tagName !== 'BUTTON') burstHearts(e.clientX,e.clientY) });

    // ---------- Countdown to next Valentine's Day (Feb 14) ----------
    const countdown = document.getElementById('countdown');
    function nextValentines(){
      const now = new Date();
      const year = (now.getMonth()>1 || (now.getMonth()==1 && now.getDate()>14)) ? now.getFullYear()+1 : now.getFullYear();
      return new Date(year, 1, 14, 0, 0, 0); // Feb is month index 1
    }
    function updateCountdown(){
      const target = nextValentines();
      const diff = target - new Date();
      const s = Math.max(0, Math.floor(diff/1000));
      const d = Math.floor(s/86400);
      const h = Math.floor((s%86400)/3600);
      const m = Math.floor((s%3600)/60);
      const sec = s%60;
      countdown.innerHTML = ['Days','Hours','Minutes','Seconds']
        .map((lbl,i)=>`<div class="timer"><div class="num">${[d,h,m,sec][i].toString().padStart(2,'0')}</div><div class="lbl">${lbl}</div></div>`).join('');
    }
    updateCountdown(); setInterval(updateCountdown,1000);

    // ---------- Love letter live preview & helpers ----------
    const toName = document.getElementById('toName');
    const note = document.getElementById('note');
    const previewName = document.getElementById('previewName');
    const previewBody = document.getElementById('previewBody');
    const nameTarget = document.getElementById('nameTarget');
    const tplBtn = document.getElementById('fillTemplate');
    const copyBtn = document.getElementById('copyLetter');

    function sync(){
      previewName.textContent = toName.value.trim() || 'Valentine';
      nameTarget.textContent = toName.value.trim() || 'Hey you';
      previewBody.textContent = note.value.trim() || 'Every heartbeat spells your name. Be my forever Valentine?';
    }
    toName.addEventListener('input', sync);
    note.addEventListener('input', sync);

    tplBtn.addEventListener('click', ()=>{
      note.value = `I had a million ways to say this, but I chose the simplest:\n\nI like you. A lot.\n\nOn ordinary days you feel like sunshine, and on hard days you feel like home. If you say yes, I promise to bring snacks, songs, and silly smiles. Be my Valentine? 💖`;
      sync();
    });

    copyBtn.addEventListener('click', async ()=>{
      const text = `Dear ${previewName.textContent},\n\n${previewBody.textContent}\n\nYours,\nYou 💗`;
      try{ await navigator.clipboard.writeText(text); copyBtn.textContent = 'Copied ✓'; setTimeout(()=> copyBtn.textContent='Copy letter 📋', 1400) }
      catch(e){ alert('Copy failed. You can select the preview text and copy manually.'); }
    });
  </script>
</body>
</html>
