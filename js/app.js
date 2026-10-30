/* ═══════════════════════════════════════════════════════════
   IGNACIO FERRÁN · MARTILLERO (demo)
   Script compartido por todas las páginas. Cada bloque se activa
   solo si su elemento existe. Los datos están en js/datos.js.
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';
const D=window.DATOS, LOTES=D.lotes, PROPS=D.propiedades;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const DEMO='[Demo martillero] ';
const waLink=t=>'https://wa.me/'+D.whatsapp+'?text='+encodeURIComponent(DEMO+t);
const img=(id,w)=>`https://images.unsplash.com/photo-${id}?w=${w||900}&q=70&auto=format&fit=crop`;
const MES=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const REDUCED=matchMedia('(prefers-reduced-motion:reduce)').matches;
const fechaDe=lot=>{ const d=new Date(); d.setDate(d.getDate()+lot.days); const [h,m]=lot.hora.split(':'); d.setHours(+h,+m,0,0); return d; };
const fechaLarga=d=>d.toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long'});

/* ── Comunes ─────────────────────────────────────────────── */
const wireWA=()=>$$('[data-wa]').forEach(a=>{ a.href=waLink(a.dataset.wa); a.target='_blank'; a.rel='noopener'; });
wireWA();
$$('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

const head=$('#head'), burger=$('#burger');
addEventListener('scroll',()=>head.classList.toggle('scrolled',scrollY>10),{passive:true});
burger.addEventListener('click',()=>{ const o=head.classList.toggle('open'); burger.setAttribute('aria-expanded',o); });

/* Cuentas regresivas: <div class="count" data-countdown="índice del lote"> */
function startCountdowns(){
  $$('[data-countdown]').forEach(cd=>{
    if(cd.dataset.on) return; cd.dataset.on=1;
    const target=fechaDe(LOTES[+cd.dataset.countdown]).getTime(), bs=cd.querySelectorAll('b');
    const tick=()=>{ const s=Math.max(0,Math.floor((target-Date.now())/1000)); [s/86400,s%86400/3600,s%3600/60,s%60].forEach((v,k)=>bs[k].textContent=String(Math.floor(v)).padStart(2,'0')); };
    tick(); setInterval(tick,1000);
  });
}
const countHTML=i=>`<div class="count" data-countdown="${i}"><div><b>--</b><small>días</small></div><div><b>--</b><small>horas</small></div><div><b>--</b><small>min</small></div><div><b>--</b><small>seg</small></div></div>`;

/* Fecha del próximo remate en el hero */
$$('[data-lote-fecha]').forEach(e=>{ const d=fechaDe(LOTES[+e.dataset.loteFecha]); e.textContent=fechaLarga(d)+' · '+LOTES[+e.dataset.loteFecha].hora+' h'; });

/* Modal con las condiciones de un remate */
const modal=$('#modal');
if(modal){
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-lote]'); if(!b) return;
    const l=LOTES[+b.dataset.lote], d=fechaDe(l);
    $('#modalBody').innerHTML=`<img src="${img(l.foto,1000)}" alt="">
      <div class="modal__in">
        <span class="kicker">Remate ${l.tipo.toLowerCase()}</span>
        <h3>${l.titulo}</h3>
        <p>${l.lugar}${l.expte?' · '+l.expte:''}</p>
        <ul class="terms">
          <li><span>Fecha</span><b>${fechaLarga(d)} · ${l.hora} h</b></li>
          <li><span>Base</span><b>${l.base}</b></li>
          <li><span>Seña en el acto</span><b>30 %</b></li>
          <li><span>Comisión</span><b>3 % + IVA</b></li>
          <li><span>Sellado</span><b>De ley</b></li>
          <li><span>Saldo de precio</span><b>${l.saldo}</b></li>
          <li><span>Exhibición</span><b>${l.exhibicion}</b></li>
        </ul>
        <p class="modal__note">Las condiciones definitivas son las publicadas en el edicto o en el boleto de remate. Ante cualquier duda, consúlteme antes de ofertar.</p>
        <a class="btn btn--brass btn--full" target="_blank" rel="noopener" href="${waLink(`Hola Ignacio, me interesa el remate "${l.titulo}" en ${l.lugar}. ¿Me pasa más información?`)}">Consultar por este remate</a>
      </div>`;
    modal.showModal();
  });
  $('#modalX').addEventListener('click',()=>modal.close());
  modal.addEventListener('click',e=>{ if(e.target===modal) modal.close(); });
}

/* ── Inicio: testimonio rotativo y propiedades destacadas ── */
const bq=$('.bigquote');
if(bq){
  const qs=[...bq.querySelectorAll('blockquote')], dots=$('#qdots');
  let i=0, t;
  dots.innerHTML=qs.map((_,k)=>`<button aria-label="Testimonio ${k+1}"${k?'':' class="on"'}></button>`).join('');
  const go=n=>{ i=(n+qs.length)%qs.length; qs.forEach((q,k)=>q.classList.toggle('on',k===i)); [...dots.children].forEach((d,k)=>d.classList.toggle('on',k===i)); };
  const auto=()=>{ clearInterval(t); if(!REDUCED) t=setInterval(()=>go(i+1),6500); };
  dots.addEventListener('click',e=>{ const b=e.target.closest('button'); if(b){ go([...dots.children].indexOf(b)); auto(); } });
  go(0); auto();
}

/* ── Tarjeta de propiedad (inicio y listado) ─────────────── */
let favs=[];
try{ favs=JSON.parse(localStorage.getItem('ferran_favs')||'[]'); }catch(e){}
const saveFavs=()=>{ try{ localStorage.setItem('ferran_favs',JSON.stringify(favs)); }catch(e){} };
const propCard=p=>`<article class="prop" data-prop="${p.cod}" tabindex="0" role="button" aria-label="Ver ${p.titulo}">
    <div class="prop__img"><img src="${img(p.gal[0],700)}" alt="${p.titulo}" loading="lazy">
      <span class="tag${p.op==='alquiler'?' tag--part':''}">${p.op==='venta'?'Venta':'Alquiler'}</span>
      <button class="fav${favs.includes(p.cod)?' on':''}" data-fav="${p.cod}" aria-label="Guardar en favoritos" aria-pressed="${favs.includes(p.cod)}">${favs.includes(p.cod)?'♥':'♡'}</button></div>
    <div class="prop__body">
      <div class="prop__price">${p.precio}${p.mes?' <small>/ mes</small>':''}</div>
      <h3>${p.titulo}</h3><p>${p.lugar}</p>
      <div class="prop__feats"><span>${p.m2} m²</span><span>${p.amb} amb.</span><span>${p.banos} baño${p.banos>1?'s':''}</span></div>
      <div class="prop__foot"><code>${p.cod}</code><span class="prop__more">Ver ficha →</span></div>
    </div></article>`;

const featured=$('#featured');
if(featured) featured.innerHTML=PROPS.filter(p=>p.op==='venta').slice(0,3).map(propCard).join('');

/* Ficha con galería */
const sheet=$('#sheet');
function openSheet(cod){
  const p=PROPS.find(x=>x.cod===cod); if(!p||!sheet) return;
  let k=0;
  $('#sheetBody').innerHTML=`<div class="sheet__grid">
      <div class="gal">
        <div class="gal__main">${p.gal.map((g,i)=>`<img src="${img(g,1200)}" alt="${p.titulo}, foto ${i+1}"${i?'':' class="on"'}>`).join('')}
          <button class="gal__nav gal__nav--p" aria-label="Foto anterior">‹</button><button class="gal__nav gal__nav--n" aria-label="Foto siguiente">›</button>
          <span class="gal__count">1 / ${p.gal.length}</span></div>
        <div class="gal__thumbs">${p.gal.map((g,i)=>`<button${i?'':' class="on"'} aria-label="Ver foto ${i+1}"><img src="${img(g,300)}" alt=""></button>`).join('')}</div>
      </div>
      <div class="sheet__info">
        <span class="kicker">${p.op==='venta'?'En venta':'En alquiler'} · ${p.cod}</span>
        <h3>${p.titulo}</h3>
        <p style="margin-top:-6px">${p.lugar}</p>
        <div class="prop__price">${p.precio}${p.mes?' <small>/ mes</small>':''}</div>
        <div class="sheet__feats">
          <div><span>Superficie</span><b>${p.m2} m²</b></div><div><span>Ambientes</span><b>${p.amb}</b></div>
          <div><span>Baños</span><b>${p.banos}</b></div><div><span>Cochera</span><b>${p.cochera}</b></div>
          <div><span>Antigüedad</span><b>${p.antig}</b></div><div><span>Tipo</span><b>${p.tipo}</b></div>
        </div>
        <p>${p.desc}</p>
        <div class="sheet__btns">
          <a class="btn btn--brass btn--full" target="_blank" rel="noopener" href="${waLink(`Hola Ignacio, me interesa la propiedad ${p.cod} (${p.titulo}, ${p.lugar}). ¿Podemos coordinar una visita?`)}">Coordinar una visita</a>
          <button class="btn btn--ghost btn--full" data-fav="${p.cod}">${favs.includes(p.cod)?'♥ Guardada en favoritos':'♡ Guardar en favoritos'}</button>
        </div>
      </div></div>`;
  const imgs=[...sheet.querySelectorAll('.gal__main img')], th=[...sheet.querySelectorAll('.gal__thumbs button')], cnt=sheet.querySelector('.gal__count');
  const show=n=>{ k=(n+imgs.length)%imgs.length; imgs.forEach((im,i)=>im.classList.toggle('on',i===k)); th.forEach((t,i)=>t.classList.toggle('on',i===k)); cnt.textContent=(k+1)+' / '+imgs.length; };
  sheet.querySelector('.gal__nav--p').onclick=()=>show(k-1);
  sheet.querySelector('.gal__nav--n').onclick=()=>show(k+1);
  th.forEach((t,i)=>t.onclick=()=>show(i));
  sheet.onkeydown=e=>{ if(e.key==='ArrowLeft') show(k-1); if(e.key==='ArrowRight') show(k+1); };
  let sx=0; const main=sheet.querySelector('.gal__main');
  main.addEventListener('touchstart',e=>{ sx=e.touches[0].clientX; },{passive:true});
  main.addEventListener('touchend',e=>{ const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>40) show(k+(dx<0?1:-1)); },{passive:true});
  history.replaceState(null,'','#'+p.cod);
  sheet.showModal();
}
if(sheet){
  $('#sheetX').addEventListener('click',()=>sheet.close());
  sheet.addEventListener('click',e=>{ if(e.target===sheet) sheet.close(); });
  sheet.addEventListener('close',()=>history.replaceState(null,'',location.pathname+location.search));
}
document.addEventListener('click',e=>{
  const f=e.target.closest('[data-fav]');
  if(f){
    e.stopPropagation();
    const c=f.dataset.fav; favs=favs.includes(c)?favs.filter(x=>x!==c):[...favs,c]; saveFavs();
    $$(`[data-fav="${c}"]`).forEach(b=>{ const on=favs.includes(c); b.classList.toggle('on',on); b.setAttribute('aria-pressed',on);
      b.textContent=b.classList.contains('fav')?(on?'♥':'♡'):(on?'♥ Guardada en favoritos':'♡ Guardar en favoritos'); });
    if(typeof renderProps==='function') renderProps();
    return;
  }
  const c=e.target.closest('[data-prop]');
  if(c){ if(sheet) openSheet(c.dataset.prop); else location.href='propiedades.html#'+c.dataset.prop; }
});
document.addEventListener('keydown',e=>{ const c=e.target.closest&&e.target.closest('[data-prop]'); if(c&&(e.key==='Enter'||e.key===' ')){ e.preventDefault(); c.click(); } });

/* ── Propiedades: filtros ────────────────────────────────── */
let renderProps=null;
const grid=$('#props');
if(grid){
  const st={op:'todas',tipo:'',amb:0,orden:'rec',soloFav:false};
  renderProps=function(){
    let list=PROPS.filter(p=>(st.op==='todas'||p.op===st.op)&&(!st.tipo||p.tipo===st.tipo)&&p.amb>=st.amb&&(!st.soloFav||favs.includes(p.cod)));
    if(st.orden!=='rec') list=[...list].sort((a,b)=>(a.op===b.op?0:a.op==='venta'?-1:1)||(st.orden==='asc'?a.valor-b.valor:b.valor-a.valor));
    grid.innerHTML=list.map(propCard).join('');
    $('#resN').textContent=list.length;
    $('#favN').textContent=favs.length;
    $('#empty').hidden=list.length>0;
  };
  $('#seg').addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; st.op=b.dataset.op; $$('#seg button').forEach(x=>x.classList.toggle('on',x===b)); renderProps(); });
  $('#fTipo').addEventListener('change',e=>{ st.tipo=e.target.value; renderProps(); });
  $('#fAmb').addEventListener('change',e=>{ st.amb=+e.target.value; renderProps(); });
  $('#fOrden').addEventListener('change',e=>{ st.orden=e.target.value; renderProps(); });
  $('#fFav').addEventListener('click',e=>{ st.soloFav=!st.soloFav; e.currentTarget.classList.toggle('on',st.soloFav); renderProps(); });
  const q=new URLSearchParams(location.search).get('op');
  if(q){ const b=$(`#seg [data-op="${q}"]`); if(b) b.click(); }
  renderProps();
  if(/^#P-\d+$/.test(location.hash)) setTimeout(()=>openSheet(location.hash.slice(1)),300);
}

/* ── Remates: catálogo ───────────────────────────────────── */
const rows=$('#lotrows');
if(rows){
  rows.innerHTML=LOTES.map((l,i)=>{ const d=fechaDe(l); return `<article class="lotrow rv" id="lote-${i+1}">
      <div class="lotrow__img"><img src="${img(l.foto,1000)}" alt="${l.titulo}" loading="lazy"><span class="lotrow__n">Lote ${String(i+1).padStart(2,'0')}</span></div>
      <div class="lotrow__body">
        <div class="lotrow__top"><span class="chip-tag${l.tipo==='Particular'?' chip-tag--part':''}">Remate ${l.tipo.toLowerCase()}</span><time>${fechaLarga(d)} · ${l.hora} h</time></div>
        <h2>${l.titulo}</h2>
        <p class="lotrow__where">${l.lugar}${l.expte?' · '+l.expte:''}</p>
        <p style="color:var(--ink-2)">${l.desc}</p>
        ${countHTML(i)}
        <div class="facts"><div><span>Base</span><b>${l.base}</b></div><div><span>Superficie</span><b>${l.m2}</b></div><div><span>Exhibición</span><b style="font-size:15px;font-family:var(--f-sans);font-weight:600">${l.exhibicion}</b></div></div>
        <div class="lotrow__btns"><button class="btn btn--navy" data-lote="${i}">Ver condiciones</button>
          <a class="btn btn--ghost" target="_blank" rel="noopener" href="${waLink(`Hola Ignacio, quiero visitar el lote ${i+1} (${l.titulo}).`)}">Agendar visita</a></div>
      </div></article>`; }).join('');
}
startCountdowns();

/* ── Tasación: asistente en 3 pasos ─────────────────────── */
const wiz=$('#wiz');
if(wiz){
  const panes=$$('.wiz__pane'), steps=$$('.wiz__steps span'), bar=$('.wiz__bar i'), err=$('#wizErr');
  const f=$('#wizForm'); let cur=0;
  const val=n=>{ const el=f.elements[n]; return el?(el.value||'').trim():''; };
  const show=n=>{
    cur=n; panes.forEach((p,i)=>p.classList.toggle('on',i===n));
    steps.forEach((s,i)=>{ s.classList.toggle('on',i===n); s.classList.toggle('done',i<n); });
    bar.style.width=((n+1)/panes.length*100)+'%';
    $('#wizPrev').style.visibility=n===0||n===3?'hidden':'visible';
    $('#wizNext').hidden=n>=2; $('#wizSend').hidden=n!==2; $('.wiz__nav').hidden=n===3;
    err.textContent='';
    if(n===2) $('#wizSum').innerHTML=`<span>Operación</span><b>${val('op')}</b><span>Propiedad</span><b>${val('tipo')}${val('amb')?' · '+val('amb')+' amb.':''}${val('m2')?' · '+val('m2')+' m²':''}</b><span>Ubicación</span><b>${val('loc')}</b>`;
  };
  const check=n=>{
    if(n===0&&(!val('op')||!val('tipo'))) return 'Elegí la operación y el tipo de propiedad.';
    if(n===1&&!val('loc')) return 'Contame en qué localidad está la propiedad.';
    if(n===2&&(!val('nombre')||!val('tel'))) return 'Dejame tu nombre y un teléfono para contactarte.';
    return '';
  };
  $('#wizNext').addEventListener('click',()=>{ const m=check(cur); if(m){ err.textContent=m; return; } show(cur+1); wiz.scrollIntoView({behavior:REDUCED?'auto':'smooth',block:'start'}); });
  $('#wizPrev').addEventListener('click',()=>show(Math.max(0,cur-1)));
  f.addEventListener('submit',e=>{
    e.preventDefault(); const m=check(2); if(m){ err.textContent=m; return; }
    const t=`Hola Ignacio, soy ${val('nombre')}. Quiero ${val('op').toLowerCase()} un/a ${val('tipo').toLowerCase()} en ${val('loc')}${val('amb')?', '+val('amb')+' ambientes':''}${val('m2')?', '+val('m2')+' m²':''}. ${val('cuando')?'Me gustaría hacerlo '+val('cuando').toLowerCase()+'. ':''}Mi teléfono: ${val('tel')}.`;
    open(waLink(t),'_blank','noopener'); show(3);
  });
  show(0);
}

/* ── Animaciones de entrada y contadores ─────────────────── */
const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }),{threshold:.12});
$$('.rv,.reveal-img').forEach(el=>io.observe(el));
const io2=new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting) return; io2.unobserve(en.target);
  const el=en.target, to=+el.dataset.count, plus=el.hasAttribute('data-plus'); let fr=0;
  if(REDUCED) return;
  const step=()=>{ fr++; const p=1-Math.pow(1-fr/55,3); el.textContent=(plus?'+':'')+Math.round(to*p); if(fr<55) requestAnimationFrame(step); };
  step();
}),{threshold:.6});
$$('[data-count]').forEach(n=>io2.observe(n));

/* Leve parallax de la foto del hero */
const hImg=$('.hero__img, .phero__img');
if(hImg&&!REDUCED) addEventListener('scroll',()=>{ if(scrollY<900) hImg.style.translate='0 '+(scrollY*.25)+'px'; },{passive:true});

})();
