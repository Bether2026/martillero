/* ═══════════════════════════════════════════════════════════
   IGNACIO FERRÁN · MARTILLERO (demo)
   Remates y propiedades salen de los arreglos de abajo:
   para cargar uno nuevo alcanza con sumar un objeto.
═══════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* WhatsApp de destino (el de Bether Studio, porque es una demo) */
const WHATSAPP='5491145309135';
const DEMO='[Demo martillero] ';
const waLink=t=>'https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(DEMO+t);
const img=(id,w)=>`https://images.unsplash.com/photo-${id}?w=${w||900}&q=70&auto=format&fit=crop`;

/* days: cuántos días faltan desde hoy (así la demo siempre muestra fechas futuras) */
const LOTES=[
  { titulo:'Casa 4 ambientes con parque', lugar:'Banfield Oeste', tipo:'Judicial', days:9, hora:'11:00',
    base:'USD 98.000', m2:'240 m²', amb:'4 amb.', foto:'1721815693498-cc28507c0ba2',
    exhibicion:'Sábado de 10 a 12 h', saldo:'Al aprobarse la subasta', expte:'Expte. N.º 00000/2025 (ficticio)' },
  { titulo:'Departamento 3 ambientes con balcón', lugar:'Lomas de Zamora centro', tipo:'Particular', days:16, hora:'17:30',
    base:'USD 72.000', m2:'74 m²', amb:'3 amb.', foto:'1665249934445-1de680641f50',
    exhibicion:'Jueves y viernes de 15 a 17 h', saldo:'A los 30 días, contra escritura', expte:'' },
  { titulo:'Local comercial en esquina', lugar:'Temperley', tipo:'Judicial', days:23, hora:'10:30',
    base:'USD 145.000', m2:'120 m²', amb:'Planta libre', foto:'1560922604-d08a31f8f7d1',
    exhibicion:'Martes de 9 a 11 h', saldo:'Al aprobarse la subasta', expte:'Expte. N.º 00000/2024 (ficticio)' }
];

const PROPS=[
  { cod:'P-101', op:'venta', tipo:'Casa', titulo:'Casa 5 ambientes con pileta', lugar:'Adrogué', precio:'USD 285.000', m2:320, amb:5, banos:3, foto:'1613977257363-707ba9348227' },
  { cod:'P-102', op:'venta', tipo:'Casa', titulo:'Casa moderna de 4 ambientes', lugar:'Banfield', precio:'USD 198.000', m2:210, amb:4, banos:2, foto:'1600596542815-ffad4c1539a9' },
  { cod:'P-103', op:'venta', tipo:'Departamento', titulo:'Departamento 2 ambientes a estrenar', lugar:'Lomas de Zamora', precio:'USD 89.000', m2:52, amb:2, banos:1, foto:'1628592102751-ba83b0314276' },
  { cod:'P-104', op:'alquiler', tipo:'Departamento', titulo:'Departamento 3 ambientes luminoso', lugar:'Temperley', precio:'$ 650.000', mes:true, m2:78, amb:3, banos:2, foto:'1772797583328-f83bc3f94f80' },
  { cod:'P-105', op:'alquiler', tipo:'Local / Oficina', titulo:'Oficina en torre corporativa', lugar:'Lomas de Zamora', precio:'$ 480.000', mes:true, m2:64, amb:2, banos:1, foto:'1621831337128-35676ca30868' },
  { cod:'P-106', op:'venta', tipo:'Casa', titulo:'Casa con parque y quincho', lugar:'Burzaco', precio:'USD 156.000', m2:260, amb:4, banos:2, foto:'1580587771525-78b9dba3b914' },
  { cod:'P-107', op:'alquiler', tipo:'Departamento', titulo:'Monoambiente amueblado', lugar:'Banfield', precio:'$ 420.000', mes:true, m2:38, amb:1, banos:1, foto:'1630699294897-723e02620662' }
];

const $=s=>document.querySelector(s);
const MES=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const fechaDe=lot=>{ const d=new Date(); d.setDate(d.getDate()+lot.days); const [h,m]=lot.hora.split(':'); d.setHours(+h,+m,0,0); return d; };

/* Links de WhatsApp fijos del HTML */
document.querySelectorAll('[data-wa]').forEach(a=>{ a.href=waLink(a.dataset.wa); a.target='_blank'; a.rel='noopener'; });

/* Encabezado */
const head=$('#head'), burger=$('#burger');
addEventListener('scroll',()=>head.classList.toggle('scrolled',scrollY>10),{passive:true});
burger.addEventListener('click',()=>{ const o=head.classList.toggle('open'); burger.setAttribute('aria-expanded',o); });
document.querySelectorAll('#menu a').forEach(a=>a.addEventListener('click',()=>{ head.classList.remove('open'); burger.setAttribute('aria-expanded','false'); }));

/* Remates */
$('#lots').innerHTML=LOTES.map((l,i)=>{
  const d=fechaDe(l);
  return `<article class="lot rv">
    <div class="lot__img"><img src="${img(l.foto,800)}" alt="${l.titulo}" loading="lazy">
      <span class="tag${l.tipo==='Particular'?' tag--part':''}">Remate ${l.tipo.toLowerCase()}</span>
      <div class="lot__date"><b>${d.getDate()}</b><small>${MES[d.getMonth()]}</small></div></div>
    <div class="lot__body">
      <h3>${l.titulo}</h3>
      <p class="lot__where">${l.lugar} · ${l.hora} h</p>
      <div class="lot__meta"><span>${l.m2}</span><span>${l.amb}</span><span>Exhibición: ${l.exhibicion.split(' de ')[0]}</span></div>
      <div class="lot__base"><span>Base</span><b>${l.base}</b></div>
      <button class="btn btn--navy btn--full" data-lote="${i}">Ver condiciones</button>
    </div></article>`;
}).join('');

/* Cuenta regresiva del próximo remate */
const cd=$('[data-countdown]');
if(cd){
  const target=fechaDe(LOTES[0]).getTime(), bs=cd.querySelectorAll('b');
  const tick=()=>{ const s=Math.max(0,Math.floor((target-Date.now())/1000)); [s/86400,s%86400/3600,s%3600/60,s%60].forEach((v,k)=>bs[k].textContent=String(Math.floor(v)).padStart(2,'0')); };
  tick(); setInterval(tick,1000);
}

/* Modal de condiciones */
const modal=$('#modal');
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-lote]'); if(!b) return;
  const l=LOTES[+b.dataset.lote], d=fechaDe(l);
  $('#modalBody').innerHTML=`<img src="${img(l.foto,1000)}" alt="">
    <div class="modal__in">
      <span class="kicker">Remate ${l.tipo.toLowerCase()}</span>
      <h3>${l.titulo}</h3>
      <p>${l.lugar}${l.expte?' · '+l.expte:''}</p>
      <ul class="terms">
        <li><span>Fecha</span><b>${d.toLocaleDateString('es-AR',{weekday:'long',day:'numeric',month:'long'})} · ${l.hora} h</b></li>
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

/* Propiedades con filtros y favoritos */
let favs=[];
try{ favs=JSON.parse(localStorage.getItem('ferran_favs')||'[]'); }catch(e){}
const saveFavs=()=>{ try{ localStorage.setItem('ferran_favs',JSON.stringify(favs)); }catch(e){} };
let op='todas', tipo='';
function renderProps(){
  const list=PROPS.filter(p=>(op==='todas'||p.op===op)&&(!tipo||p.tipo===tipo));
  $('#props').innerHTML=list.map(p=>`<article class="prop">
      <div class="prop__img"><img src="${img(p.foto,700)}" alt="${p.titulo}" loading="lazy">
        <span class="tag${p.op==='alquiler'?' tag--part':''}">${p.op==='venta'?'Venta':'Alquiler'}</span>
        <button class="fav${favs.includes(p.cod)?' on':''}" data-fav="${p.cod}" aria-label="Guardar en favoritos" aria-pressed="${favs.includes(p.cod)}">${favs.includes(p.cod)?'♥':'♡'}</button></div>
      <div class="prop__body">
        <div class="prop__price">${p.precio}${p.mes?' <small>/ mes</small>':''}</div>
        <h3>${p.titulo}</h3><p>${p.lugar}</p>
        <div class="prop__feats"><span>${p.m2} m²</span><span>${p.amb} amb.</span><span>${p.banos} baño${p.banos>1?'s':''}</span></div>
        <div class="prop__foot"><code>${p.cod}</code><a target="_blank" rel="noopener" href="${waLink(`Hola Ignacio, me interesa la propiedad ${p.cod} (${p.titulo}, ${p.lugar}). ¿Podemos coordinar una visita?`)}">Consultar →</a></div>
      </div></article>`).join('');
  $('#empty').hidden=list.length>0;
}
$('#filters').addEventListener('click',e=>{
  const b=e.target.closest('button[data-op]'); if(!b) return;
  op=b.dataset.op; document.querySelectorAll('#filters button').forEach(x=>x.classList.toggle('on',x===b)); renderProps();
});
$('#tipo').addEventListener('change',e=>{ tipo=e.target.value; renderProps(); });
$('#props').addEventListener('click',e=>{
  const f=e.target.closest('[data-fav]'); if(!f) return;
  const c=f.dataset.fav; favs=favs.includes(c)?favs.filter(x=>x!==c):[...favs,c]; saveFavs(); renderProps();
});
renderProps();

/* Formulario de tasación */
$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(e.target), v=k=>(d.get(k)||'').toString().trim();
  const t=`Hola Ignacio, soy ${v('nombre')}. Quiero ${v('op').toLowerCase()} un/a ${v('tipo').toLowerCase()} en ${v('loc')}${v('amb')?' de '+v('amb')+' ambientes':''}. Mi teléfono: ${v('tel')}.`;
  open(waLink(t),'_blank','noopener');
});

/* Animaciones de entrada y contadores */
const io=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }),{threshold:.12});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));
const nums=document.querySelectorAll('[data-count]');
const io2=new IntersectionObserver(es=>es.forEach(en=>{
  if(!en.isIntersecting) return; io2.unobserve(en.target);
  const el=en.target, to=+el.dataset.count, plus=el.hasAttribute('data-plus'); let f=0;
  const step=()=>{ f++; const p=1-Math.pow(1-f/50,3); el.textContent=(plus?'+':'')+Math.round(to*p); if(f<50) requestAnimationFrame(step); };
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches) step();
}),{threshold:.6});
nums.forEach(n=>io2.observe(n));

})();
