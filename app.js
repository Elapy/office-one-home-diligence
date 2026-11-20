const RESEARCH=[
 {id:'crime',name:'Crime & Safety Report',price:49,desc:'Local crime context, source limitations stated plainly, and nearby incident data where a licensed source is available.'},
 {id:'schools',name:'School Analysis',price:39,desc:'Assigned / nearby schools, distances, and public enrollment context.'},
 {id:'flood',name:'Flood Risk Report',price:39,desc:'FEMA flood zone for the exact parcel point, plus elevation context.'},
 {id:'noise',name:'Noise & Highway Proximity',price:29,desc:'Distance to motorways, major roads, rail and other noise sources from map data.'},
 {id:'permits',name:'Permit & Code History',price:59,desc:'Public permit/code history search where the city/county publishes it; availability varies by jurisdiction.'},
 {id:'offender',name:'Sex-Offender Proximity Check',price:29,desc:'Proximity check against the public registry source available for the state.'},
 {id:'walkability',name:'Walkability & Transit',price:29,desc:'Nearby amenities, transit stops and everyday destinations within walking distance.'},
 {id:'environment',name:'Environmental & EPA Facilities',price:39,desc:'Nearby EPA-listed facilities and environmental records for the area.'},
];
const PARTNERS=[
 {id:'inspection',name:'Licensed Home Inspection',price:449,partner:'Coordinated partner service',desc:'Full home inspection by a licensed local inspector.'},
 {id:'sewer',name:'Sewer Scope',price:249,partner:'Coordinated partner service',desc:'Camera scope of the main sewer line with video/report.'},
 {id:'radon',name:'Radon Test',price:179,partner:'Coordinated partner service',desc:'Short-term radon test placed and read by a partner pro.'},
 {id:'roof',name:'Roof Inspection',price:199,partner:'Coordinated partner service',desc:'Roof condition inspection by a roofing partner.'},
];
const BUNDLE_PRICE=249;
const $=s=>document.querySelector(s);
// Escape any string before it reaches innerHTML. User-typed fields (name,
// address, email, notes) and anything read back from localStorage are
// untrusted: rendering them raw was a stored-XSS vector (confirmation page
// and orders.html both executed markup typed into the order form).
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
// Canonical catalog: the ONLY source of names/prices. selected() resolves
// checked boxes through this map by id, so a tampered data-price/data-name
// DOM attribute can no longer create $NaN, negative, or discounted totals
// in the displayed summary or the stored order record.
const CATALOG=new Map();
RESEARCH.forEach(i=>CATALOG.set('research:'+i.id,{id:i.id,type:'research',name:i.name,price:i.price}));
PARTNERS.forEach(i=>CATALOG.set('partner:'+i.id,{id:i.id,type:'partner',name:i.name,price:i.price}));
function card(item,type){return `<div class="card"><label><input type="checkbox" class="item" data-type="${type}" data-id="${esc(item.id)}"><span class="box" aria-hidden="true">✓</span><span><strong>${esc(item.name)}</strong><br><span class="muted">${esc(item.desc)}</span>${type==='partner'?'<br><em>Coordinated partner service</em>':''}</span><span class="price">$${item.price}</span></label></div>`}
$('#research-list').innerHTML=RESEARCH.map(i=>card(i,'research')).join('');
$('#partner-list').innerHTML=PARTNERS.map(i=>card(i,'partner')).join('');
function selected(){return [...document.querySelectorAll('.item:checked')].map(el=>CATALOG.get(el.dataset.type+':'+el.dataset.id)).filter(Boolean)}
function total(){let items=selected(); if($('#bundle').checked){ // bundle replaces research items pricing
  let partnerTotal=items.filter(i=>i.type==='partner').reduce((a,b)=>a+b.price,0); return BUNDLE_PRICE+partnerTotal;} return items.reduce((a,b)=>a+b.price,0)}
function renderSummary(){let items=selected(); let lines=[];
 if($('#bundle').checked){lines.push(`<div>Full Data Report Bundle — $249</div>`); items.filter(i=>i.type==='research').forEach(i=>lines.push(`<div class="muted">• ${esc(i.name)} (in bundle)</div>`));}
 else items.filter(i=>i.type==='research').forEach(i=>lines.push(`<div>${esc(i.name)} — $${i.price}</div>`));
 items.filter(i=>i.type==='partner').forEach(i=>lines.push(`<div>${esc(i.name)} (partner) — $${i.price}</div>`));
 $('#summary-lines').innerHTML=lines.length?lines.join(''):'<span class="muted">Nothing selected yet.</span>';
 $('#total').textContent='$'+total();
 const ht=$('#hero-total'); if(ht) ht.textContent='$'+total();}
document.addEventListener('change',renderSummary); renderSummary();
function randSuffix(n){try{const a=new Uint8Array(n);crypto.getRandomValues(a);return [...a].map(b=>'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'[b%36]).join('')}catch(e){let s='';while(s.length<n)s+=Math.random().toString(36).slice(2).toUpperCase().replace(/[^A-Z0-9]/g,'');return s.slice(0,n)}}
function genId(){return 'HD-'+Date.now().toString(36).toUpperCase()+'-'+randSuffix(8)}
// Corrupted or non-array localStorage must never silently kill checkout:
// fall back to an empty list instead of throwing inside the submit handler.
function loadOrders(){try{const v=JSON.parse(localStorage.getItem('hd_orders')||'[]');return Array.isArray(v)?v:[]}catch(e){return[]}}
let submitting=false;
$('#order-form').addEventListener('submit',e=>{e.preventDefault();
 if(submitting) return; // double-submit guard: one click / Enter burst = one order
 if(total()===0 && !$('#bundle').checked){$('#form-error').textContent='Please select at least one research item, the bundle, or a partner service.';return;}
 submitting=true;
 const btn=e.target.querySelector('button[type="submit"]'); if(btn) btn.disabled=true;
 const fd=new FormData(e.target);
 const order={id:genId(),createdAt:new Date().toISOString(),address:fd.get('address'),name:fd.get('name'),email:fd.get('email'),closeDate:fd.get('closeDate'),notes:fd.get('notes'),bundle:$('#bundle').checked,items:selected(),total:total(),status:'Received — payment step added at launch'};
 const all=loadOrders(); all.push(order);
 try{localStorage.setItem('hd_orders',JSON.stringify(all));}
 catch(err){submitting=false; if(btn) btn.disabled=false; $('#form-error').textContent='Your order could not be saved in this browser (storage unavailable or full). Please try again.'; return;}
 $('#order').hidden=true; $('#confirmation').hidden=false;
 const itemLines=order.items.map(i=>order.bundle&&i.type==='research'?`${esc(i.name)} (in bundle)`:`${esc(i.name)} — $${i.price}`).join('\n');
 $('#confirmation-body').innerHTML=`<p>Thank you, ${esc(order.name)}.</p><p><strong>Order ID:</strong> ${esc(order.id)}</p><p><strong>Property:</strong> ${esc(order.address)}</p><p><strong>Email:</strong> ${esc(order.email)}</p><p><strong>Target close:</strong> ${esc(order.closeDate||'—')}</p><h3>Items</h3><pre>${(order.bundle?'Full Data Report Bundle — $249\n':'')+itemLines}</pre><p class="total">Total: $${order.total}</p><p class="muted">Saved locally in this browser (localStorage key: hd_orders). This prototype does not collect payment.</p>`;
 window.scrollTo({top:0,behavior:'smooth'});});
const startAnother=$('#start-another'); if(startAnother) startAnother.addEventListener('click',()=>location.reload());
