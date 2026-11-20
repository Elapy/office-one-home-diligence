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
function card(item,type){return `<div class="card"><label><input type="checkbox" class="item" data-type="${type}" data-id="${item.id}" data-price="${item.price}" data-name="${item.name}"><span class="box" aria-hidden="true">✓</span><span><strong>${item.name}</strong><br><span class="muted">${item.desc}</span>${type==='partner'?'<br><em>Coordinated partner service</em>':''}</span><span class="price">$${item.price}</span></label></div>`}
$('#research-list').innerHTML=RESEARCH.map(i=>card(i,'research')).join('');
$('#partner-list').innerHTML=PARTNERS.map(i=>card(i,'partner')).join('');
function selected(){return [...document.querySelectorAll('.item:checked')].map(el=>({id:el.dataset.id,type:el.dataset.type,name:el.dataset.name,price:+el.dataset.price}))}
function total(){let items=selected(); if($('#bundle').checked){ // bundle replaces research items pricing
  let partnerTotal=items.filter(i=>i.type==='partner').reduce((a,b)=>a+b.price,0); return BUNDLE_PRICE+partnerTotal;} return items.reduce((a,b)=>a+b.price,0)}
function renderSummary(){let items=selected(); let lines=[];
 if($('#bundle').checked){lines.push(`<div>Full Data Report Bundle — $249</div>`); items.filter(i=>i.type==='research').forEach(i=>lines.push(`<div class="muted">• ${i.name} (in bundle)</div>`));}
 else items.filter(i=>i.type==='research').forEach(i=>lines.push(`<div>${i.name} — $${i.price}</div>`));
 items.filter(i=>i.type==='partner').forEach(i=>lines.push(`<div>${i.name} (partner) — $${i.price}</div>`));
 $('#summary-lines').innerHTML=lines.length?lines.join(''):'<span class="muted">Nothing selected yet.</span>';
 $('#total').textContent='$'+total();
 const ht=$('#hero-total'); if(ht) ht.textContent='$'+total();}
document.addEventListener('change',renderSummary); renderSummary();
function genId(){return 'HD-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase()}
$('#order-form').addEventListener('submit',e=>{e.preventDefault();
 if(total()===0 && !$('#bundle').checked){$('#form-error').textContent='Please select at least one research item, the bundle, or a partner service.';return;}
 const fd=new FormData(e.target);
 const order={id:genId(),createdAt:new Date().toISOString(),address:fd.get('address'),name:fd.get('name'),email:fd.get('email'),closeDate:fd.get('closeDate'),notes:fd.get('notes'),bundle:$('#bundle').checked,items:selected(),total:total(),status:'Received — payment step added at launch'};
 const all=JSON.parse(localStorage.getItem('hd_orders')||'[]'); all.push(order); localStorage.setItem('hd_orders',JSON.stringify(all));
 $('#order').hidden=true; $('#confirmation').hidden=false;
 $('#confirmation-body').innerHTML=`<p>Thank you, ${order.name}.</p><p><strong>Order ID:</strong> ${order.id}</p><p><strong>Property:</strong> ${order.address}</p><p><strong>Email:</strong> ${order.email}</p><p><strong>Target close:</strong> ${order.closeDate||'—'}</p><h3>Items</h3><pre>${(order.bundle?'Full Data Report Bundle — $249\n':'')+order.items.map(i=>`${i.name} — $${i.price}`).join('\n')}</pre><p class="total">Total: $${order.total}</p><p class="muted">Saved locally in this browser (localStorage key: hd_orders). This prototype does not collect payment.</p>`;
 window.scrollTo({top:0,behavior:'smooth'});});
