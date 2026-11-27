// AbodeVet catalogue + enquiry intake.
// The catalogue is the sixty-check services master list, in six groups.
// There are deliberately NO prices in this file: engagements are quoted
// individually as a single facilitation fee. Do not add per-item pricing.
const GROUPS=[
 {n:'01',title:'Core Inspections',sub:'The checks every buyer needs',items:[
  {id:'general-inspection',name:'General Home Inspection',cred:'CREIA / ASHI / InterNACHI certified inspector',tier:'Standard',desc:'The whole-house survey — structure, roof surface, systems, attic and crawlspace; 1,600+ components, non-invasively.'},
  {id:'termite-wdo',name:'Termite & Wood-Destroying Organism Inspection',cred:'Structural Pest Control Board — Branch 3 licensee',tier:'Standard',vetting:true,desc:'Termites, wood-boring beetles, fungus and dry rot, reported in the regulated Section 1 / Section 2 filing.'},
  {id:'roof',name:'Roof Inspection & Remaining-Life Certification',cred:'CSLB C-39 Roofing contractor',tier:'Standard',desc:'A roofer physically on the roof: covering, underlayment, flashing, drainage, and remaining service life.'},
  {id:'sewer-scope',name:'Sewer Lateral Camera Scope',cred:'CSLB C-36 Plumbing contractor',tier:'Standard',desc:'A camera through the private lateral to the city main — roots, cracks, offsets, collapse. Required at point of sale in the City of Ventura.'},
  {id:'disclosure-audit',name:'Statutory Disclosure Audit',cred:'Licensed CA broker / attorney review',tier:'Standard',desc:'Line-by-line review of the seller’s Transfer Disclosure Statement and Natural Hazard Disclosure, checked against what the inspections find.'},
  {id:'walkthrough',name:'Final Walkthrough Verification',cred:'Inspector re-inspection',tier:'Standard',desc:'A last pre-closing pass: agreed repairs truly completed, no new damage, everything included still present and operating.'},
 ]},
 {n:'02',title:'Structural & Systems',sub:'The specialists the general inspection refers out to',items:[
  {id:'structural-pe',name:'Foundation & Structural Engineering Evaluation',cred:'Licensed Professional Engineer (Civil / Structural)',tier:'Situational',desc:'Settlement, crack patterns, floor levels and seismic anchoring — with a stamped engineering opinion on what is cosmetic and what is not.'},
  {id:'geotechnical',name:'Geotechnical / Soils Investigation',cred:'Licensed Geotechnical Engineer / Certified Engineering Geologist',tier:'Situational',desc:'Borings, expansive soils, groundwater and slope stability — what no above-ground inspection can see.'},
  {id:'hvac',name:'HVAC Detailed Evaluation',cred:'CSLB C-20 HVAC contractor',tier:'Situational',desc:'Heat-exchanger integrity, refrigerant, airflow, duct leakage and condition, and honest remaining life.'},
  {id:'electrical',name:'Electrical System Detailed Evaluation',cred:'CSLB C-10 Electrical contractor',tier:'Situational',desc:'Panel, grounding and wiring types throughout — including fire-risk Federal Pacific and Zinsco panels common in California housing stock.'},
  {id:'plumbing',name:'Plumbing System & Water-Heater Compliance',cred:'CSLB C-36 Plumbing contractor',tier:'Situational',desc:'Supply and drain materials, pressure, and water-heater bracing and venting — a California compliance item at sale.'},
  {id:'chimney',name:'Chimney & Fireplace Level 2 Inspection',cred:'CSIA Certified Chimney Sweep',tier:'Situational',vetting:true,desc:'Video inspection of the flue interior — the NFPA 211 Level 2 inspection specified on a property transfer.'},
  {id:'pool',name:'Pool & Spa Inspection + Safety Certification',cred:'CSLB C-53 / certified pool inspector',tier:'Situational',desc:'Equipment, shell, bonding and leaks — plus which of the seven statutory drowning-prevention features the pool actually has.'},
  {id:'solar',name:'Solar System Evaluation',cred:'CSLB C-46 Solar contractor',tier:'Situational',desc:'Output, condition, and ownership — owned, financed, leased or PPA — established before you inherit a contract at escrow.'},
  {id:'drainage',name:'Drainage, Grading & Retaining-Wall Evaluation',cred:'CSLB C-27 / A contractor · PE opinions',tier:'Situational',desc:'Where the water runs, and whether the walls holding the slope are drained, sound, or quietly failing.'},
  {id:'deck-balcony',name:'Deck, Balcony & Elevated-Elements Inspection',cred:'Licensed architect / Structural PE / CSLB B',tier:'Situational',desc:'Ledger attachment, flashing and joist condition — the classic collapse mechanism hides behind the deck surface. SB 326 regime for condominiums.'},
 ]},
 {n:'03',title:'Environmental & Health',sub:'What is in the house, the air, the water and the ground',items:[
  {id:'mold',name:'Mold & Moisture Investigation',cred:'ACAC-certified inspector · accredited laboratory',tier:'Situational',vetting:true,desc:'Moisture mapping and lab sampling. Testing is kept independent of any remediation firm — never the same company on both sides.'},
  {id:'asbestos',name:'Asbestos Survey',cred:'Cal/OSHA Certified Asbestos Consultant',tier:'Situational',desc:'Sampling of suspect materials with lab analysis — essential before any planned renovation of an older home.'},
  {id:'lead',name:'Lead-Based Paint Inspection & Risk Assessment',cred:'CDPH-certified Lead Inspector / Assessor',tier:'Situational',desc:'XRF testing of painted surfaces and hazard assessment — the federal 10-day testing window for pre-1978 homes.'},
  {id:'radon',name:'Radon Testing',cred:'NRPP / NRSB certified professional',tier:'Premium',desc:'A 48-hour measurement in the lowest lived-in level. Coastal Ventura County is low-radon; inland and foothill properties test higher.'},
  {id:'water-quality',name:'Drinking-Water Quality Testing',cred:'State-certified (ELAP) laboratory',tier:'Premium',desc:'Lead, copper and local contaminants — including what the home’s own older plumbing adds after the city water tests clean.'},
  {id:'iaq',name:'Indoor Air Quality & VOC Testing',cred:'ACAC CIE or equivalent',tier:'Premium',desc:'Formaldehyde, VOCs, particulates and combustion patterns — including off-gassing from a remodel finished just before listing.'},
  {id:'meth',name:'Methamphetamine Contamination Testing',cred:'Certified industrial hygienist · accredited lab',tier:'Situational',desc:'Surface-wipe lab analysis for residue absorbed into drywall, carpet and HVAC — undetectable by any visual inspection.'},
  {id:'ust-scan',name:'Buried Tank & Underground Storage Scan',cred:'Environmental / tank-sweep firm',tier:'Situational',desc:'Radar sweep for buried oil tanks plus a records search — a leaking tank is a cleanup liability that attaches to the current owner.'},
  {id:'phase1',name:'Phase I Environmental Site Assessment',cred:'Environmental Professional (ASTM / EPA)',tier:'Premium',desc:'The records-and-interview review: prior uses of the property and its neighbours — the former gas station or orchard nobody mentioned.'},
  {id:'pest-branch2',name:'General Pest & Rodent Inspection',cred:'Structural Pest Control Board — Branch 2 licensee',tier:'Situational',vetting:true,desc:'Rodent entry points, attic contamination and intrusion — a separate license branch and a separate visit most buyers never order.'},
 ]},
 {n:'04',title:'Land & Legal',sub:'Lines, rights, records and obligations',items:[
  {id:'survey',name:'Boundary & ALTA/NSPS Land Survey',cred:'Licensed Professional Land Surveyor (PLS)',tier:'Situational',vetting:true,desc:'True property lines, corners and encroachments, mapped. The fence is not the line.'},
  {id:'title-review',name:'Title Search & Preliminary Report Review',cred:'Title examiner · attorney / broker review',tier:'Standard',desc:'The search happens automatically; the review is what most buyers skip — every lien, easement and exception, explained.'},
  {id:'permit-audit',name:'Permit History & Unpermitted-Work Audit',cred:'Permit researcher / CSLB B / architect',tier:'Standard',desc:'The full permit record compared against what physically exists — including square footage the price was based on that does not legally exist.'},
  {id:'zoning',name:'Zoning, Code & Legal-Use Verification',cred:'Land-use attorney / planning consultant',tier:'Situational',desc:'Zoning, legal use, ADU and rental eligibility, and open code-enforcement cases — verified in writing.'},
  {id:'easement',name:'Easement & Encroachment Legal Review',cred:'California real estate attorney',tier:'Situational',desc:'Every easement of record plotted against the actual property — and against what you plan to build on it.'},
  {id:'flood-cert',name:'Flood Determination & Elevation Certificate',cred:'Flood determination company · PLS',tier:'Situational',vetting:true,desc:'FEMA zone determination, and a surveyor’s elevation certificate where flood-insurance pricing turns on the structure’s true height.'},
  {id:'hazard-ab38',name:'Hazard-Zone & AB 38 Verification',cred:'NHD reporting company · fire authority',tier:'Standard',desc:'Fault, liquefaction and fire-severity zones independently verified — including whether the seller’s defensible-space paperwork is real.'},
  {id:'hoa-review',name:'HOA Document, Financial & Litigation Review',cred:'Broker / attorney / HOA review specialist',tier:'Standard',desc:'CC&Rs, reserves, minutes and litigation — including the special assessment already approved but not yet billed.'},
  {id:'adu-legality',name:'ADU & Rental-Unit Legality Verification',cred:'Permit audit · attorney / broker',tier:'Situational',desc:'Whether the second unit is permitted and legally rentable — and whether the income the price assumes is real.'},
 ]},
 {n:'05',title:'Valuation & Records',sub:'What it is worth, what it will cost, whether it can be insured',items:[
  {id:'lender-appraisal',name:'Licensed Residential Appraisal (Lender)',cred:'BREA-licensed / certified appraiser',tier:'Standard',desc:'The independent valuation your lender orders. We coordinate it and track its conditions — by law, the buyer never chooses this appraiser.'},
  {id:'buyer-appraisal',name:'Buyer-Side Appraisal or Appraisal Review',cred:'BREA-licensed / certified appraiser',tier:'Situational',vetting:true,desc:'For cash buyers, who get no lender appraisal at all — or a review of the lender’s appraisal for wrong comparables and missed adjustments.'},
  {id:'tax-audit',name:'Property Tax, Assessment & Mello-Roos Audit',cred:'Broker / CPA review of county records',tier:'Standard',desc:'Your actual tax bill after the Proposition 13 reset to the purchase price — not the seller’s protected figure — including Mello-Roos districts.'},
  {id:'insurability',name:'Insurability & Loss-History Review',cred:'Licensed insurance broker · CLUE report',tier:'Standard',desc:'Whether the home can be insured, and at what price, in today’s California market — plus the property’s CLUE claims history the seller never mentioned.'},
  {id:'operating-cost',name:'Operating-Cost & Systems-Age Audit',cred:'Compiled from the specialist reports',tier:'Premium',desc:'What the home costs to run and what is about to wear out, assembled into one five-year capital schedule.'},
  {id:'replacement-cost',name:'Replacement-Cost / Cost-to-Rebuild Estimate',cred:'Licensed appraiser / CSLB B / insurer cost service',tier:'Premium',desc:'What rebuilding the home as-is would actually cost — the number insurance coverage should be based on, independent of market value.'},
 ]},
 {n:'06',title:'Situational Add-Ons',sub:'Triggered by the property itself',items:[
  {id:'septic',name:'Septic System (OWTS) Inspection & Pumping',cred:'County-permitted pumper / CSLB C-42',tier:'Situational',desc:'Tank, baffles and leach field, normally with a pump-out so the tank can actually be seen. The county permits these systems but does not assess them for transfers.'},
  {id:'well',name:'Private Well Inspection, Flow Test & Water Certification',cred:'CSLB C-57 Well Drilling · ELAP laboratory',tier:'Situational',desc:'Yield over a sustained test, equipment condition and a full lab panel. California does not regulate private well-water quality — testing is the buyer’s responsibility.'},
  {id:'propane',name:'Propane / Fuel-System Inspection',cred:'Certified propane technician / CSLB C-36',tier:'Situational',desc:'Tank ownership, regulator and line condition, leak test — including tanks that turn out to belong to a supplier.'},
  {id:'generator',name:'Generator & Battery-Storage Evaluation',cred:'CSLB C-10 Electrical contractor',tier:'Situational',desc:'Standby generator condition, transfer switch, service history and permits; battery capacity and warranty standing.'},
  {id:'arborist',name:'Landscape Irrigation & Mature-Tree Assessment',cred:'ISA Certified Arborist · CSLB C-27',tier:'Situational',desc:'Irrigation leaks, and an arborist’s view of mature trees — health, structural risk, and roots already inside the sewer lateral.'},
  {id:'thermography',name:'Infrared Thermography Scan',cred:'Certified thermographer',tier:'Premium',desc:'A whole-house thermal pass: insulation voids, hidden moisture, overheating electrical — pointing the other specialists exactly where to open up.'},
  {id:'energy-audit',name:'Energy Audit (Title 24 / HERS)',cred:'Certified HERS Rater',tier:'Premium',desc:'Blower-door and duct-leakage testing — the difference between the seller’s claimed utility bills and your actual ones.'},
  {id:'manufactured',name:'Manufactured-Home Inspection & HCD Title Verification',cred:'Manufactured-housing inspector · licensed engineer',tier:'Situational',desc:'Piers, anchoring and permanent-foundation (433A) status, plus HCD title — which decides whether the home can be financed as real property at all.'},
  {id:'condo-sb326',name:'Condominium SB 326 & Reserve Review',cred:'Broker / attorney / HOA specialist',tier:'Situational',desc:'The association’s own balcony-inspection reports and reserve funding level, read closely — assessments are arithmetic, not surprises.'},
  {id:'historic',name:'Historic / Character-Home Evaluation',cred:'Historic-property specialist',tier:'Situational',desc:'Original systems, historic-overlay rules and Mills Act obligations — what can and cannot legally be altered.'},
  {id:'luxury-systems',name:'Luxury & Estate Systems Evaluation',cred:'Respective licensed trades',tier:'Premium',desc:'Elevators, wine cellars, automation, guest houses, gates, courts and acreage water features — the systems standard inspections do not cover.'},
  {id:'new-construction',name:'New-Construction Phase Inspections',cred:'CREIA / ASHI / InterNACHI inspector',tier:'Situational',desc:'Foundation, pre-drywall and final inspections, independent of the builder and the city — the last moment rough-in work is visible.'},
  {id:'backflow',name:'Sewer Gas, Backflow & Cross-Connection Check',cred:'CSLB C-36 · certified backflow tester',tier:'Premium',desc:'Backflow preventers, trap and vent integrity — including annual certified testing obligations you may inherit.'},
  {id:'dry-rot',name:'Dry-Rot / Fungus Deep Dive',cred:'CSLB B / C-5 Framing contractor',tier:'Situational',desc:'Where a pest report flags moisture damage: probing and mapping its true extent, so a “minor fungus” line is priced as the repair it actually is.'},
  {id:'gas-co',name:'Gas Appliance & Carbon-Monoxide Safety Check',cred:'CSLB C-20 / C-36 contractor',tier:'Situational',desc:'Venting and combustion checks on furnaces, wall heaters and water heaters, and verification of the alarms the law requires.'},
  {id:'envelope',name:'Window, Door & Building-Envelope Evaluation',cred:'CSLB C-17 Glazing / B contractor',tier:'Premium',desc:'Failed seals, stucco moisture integrity and flashing at every wall penetration.'},
  {id:'slope-bluff',name:'Slope & Coastal-Bluff Engineering Review',cred:'Licensed GE / Certified Engineering Geologist',tier:'Situational',desc:'Slope stability, retaining-wall engineering and bluff erosion — from the records on file before any fieldwork is commissioned.'},
  {id:'smart-home',name:'Smart-Home, Security & Low-Voltage Audit',cred:'CSLB C-7 · BSIS-licensed alarm company',tier:'Premium',desc:'What stays, what works, and what is orphaned — including hub and camera accounts that belong to the seller and can never transfer.'},
  {id:'repair-verification',name:'Repair Verification & Escrow Holdback Inspection',cred:'Original trade specialist (re-inspection)',tier:'Situational',desc:'Negotiated repairs verified as specified — licensed, permitted, evidenced — before escrow releases funds.'},
 ]},
];
const $=s=>document.querySelector(s);
// Escape any string before it reaches innerHTML. User-typed fields (name,
// address, email, notes) and anything read back from localStorage are
// untrusted: rendering them raw was a stored-XSS vector (confirmation page
// and orders.html both executed markup typed into the order form).
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
// Canonical catalog: the ONLY source of service names. selected() resolves
// checked boxes through this map by id, so a tampered DOM attribute can
// no longer invent services in the displayed summary or the stored record.
const CATALOG=new Map();
GROUPS.forEach(g=>g.items.forEach(i=>CATALOG.set('service:'+i.id,{id:i.id,type:'service',name:i.name,group:g.title})));
function card(item){return `<div class="card"><label><input type="checkbox" class="item" data-type="service" data-id="${esc(item.id)}"><span class="box" aria-hidden="true">✓</span><span><strong>${esc(item.name)}</strong> <span class="tag">${esc(item.tier)}</span><br><span class="muted">${esc(item.desc)}</span><br><span class="cred">${esc(item.cred)}</span>${item.vetting?'<br><em>Ventura network: provider vetting in progress — no company named until it clears our standard.</em>':''}</span></label></div>`}
function groupBlock(g){return `<div class="group"><h3><span class="group-n">${esc(g.n)}</span> ${esc(g.title)}</h3><p class="muted group-sub">${esc(g.sub)}</p><div class="stack">${g.items.map(card).join('')}</div></div>`}
$('#catalogue-groups').innerHTML=GROUPS.map(groupBlock).join('');
function selected(){return [...document.querySelectorAll('.item:checked')].map(el=>CATALOG.get(el.dataset.type+':'+el.dataset.id)).filter(Boolean)}
function renderSummary(){const items=selected();
 $('#summary-lines').innerHTML=items.length?items.map(i=>`<div>${esc(i.name)} <span class="muted">(${esc(i.group)})</span></div>`).join(''):'<span class="muted">No checks selected yet — choose from the catalogue above.</span>';
 const c=$('#sel-count'); if(c) c.textContent=items.length;}
document.addEventListener('change',renderSummary);
renderSummary();
// ---- Intake delivery (VENTURE-INTAKE-DELIVERY-1) ----------------------
// Orders are delivered to the shared Office One intake backend so the
// business actually receives them; localStorage remains the offline
// fallback. PRODUCTION GATE: INTAKE_API_BASE points at the reserved
// https://intake.invalid host until the intake service is hosted (a
// signup/deploy step) — set window.INTAKE_API_BASE (or this constant) to
// the hosted base URL in the same pass that updates connect-src in
// index.html. While delivery is unreachable the visitor is TOLD their
// order is saved in this browser only — a submission is never silently
// lost: the localStorage copy is written BEFORE delivery is attempted.
const INTAKE_API_BASE=(typeof window!=='undefined'&&window.INTAKE_API_BASE)||'https://intake.invalid';
function deliverOrder(order){
 const ctl=(typeof AbortController!=='undefined')?new AbortController():null;
 const timer=ctl?setTimeout(()=>ctl.abort(),6000):null;
 return fetch(INTAKE_API_BASE+'/api/intake/abodevet',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(order),signal:ctl?ctl.signal:undefined})
  .then(r=>{if(timer)clearTimeout(timer);return r.ok})
  .catch(()=>{if(timer)clearTimeout(timer);return false});
}
function randSuffix(n){try{const a=new Uint8Array(n);crypto.getRandomValues(a);return [...a].map(b=>'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'[b%36]).join('')}catch(e){let s='';while(s.length<n)s+=Math.random().toString(36).slice(2).toUpperCase().replace(/[^A-Z0-9]/g,'');return s.slice(0,n)}}
function genId(){return 'HD-'+Date.now().toString(36).toUpperCase()+'-'+randSuffix(8)}
// Corrupted or non-array localStorage must never silently kill checkout:
// fall back to an empty list instead of throwing inside the submit handler.
function loadOrders(){try{const v=JSON.parse(localStorage.getItem('hd_orders')||'[]');return Array.isArray(v)?v:[]}catch(e){return[]}}
let submitting=false;
$('#order-form').addEventListener('submit',e=>{e.preventDefault();
 if(submitting) return; // double-submit guard: one click / Enter burst = one order
 const items=selected();
 if(!items.length){$('#form-error').textContent='Please select at least one check from the catalogue.';return;}
 submitting=true;
 const btn=e.target.querySelector('button[type="submit"]'); if(btn) btn.disabled=true;
 const fd=new FormData(e.target);
 // Order record shape is unchanged from the previous site (id, createdAt,
 // address, name, email, closeDate, notes, bundle, items, total, status)
 // so orders.html keeps working untouched. There are no prices in the new
 // model: items carry no price and total is null (fee quoted per
 // engagement) — orders.js already degrades a non-finite total to 0.
 const order={id:genId(),createdAt:new Date().toISOString(),address:fd.get('address'),name:fd.get('name'),email:fd.get('email'),closeDate:fd.get('closeDate'),notes:fd.get('notes'),bundle:false,items:items,total:null,status:'Received — facilitation fee quoted per engagement; no payment collected'};
 const all=loadOrders(); all.push(order);
 try{localStorage.setItem('hd_orders',JSON.stringify(all));}
 catch(err){submitting=false; if(btn) btn.disabled=false; $('#form-error').textContent='Your enquiry could not be saved in this browser (storage unavailable or full). Please try again.'; return;}
 $('#enquire').hidden=true; $('#confirmation').hidden=false;
 const itemLines=order.items.map(i=>esc(i.name)).join('\n');
 $('#confirmation-body').innerHTML=`<p>Thank you, ${esc(order.name)}.</p><p><strong>Enquiry ID:</strong> ${esc(order.id)}</p><p><strong>Property:</strong> ${esc(order.address)}</p><p><strong>Email:</strong> ${esc(order.email)}</p><p><strong>Target close:</strong> ${esc(order.closeDate||'—')}</p><h3>Checks requested</h3><pre>${itemLines}</pre><p>We will reply with a scoped engagement and a single facilitation fee. Nothing is booked — and nothing is charged — until you approve the scope.</p><p id="delivery-status" class="muted">Sending your enquiry to AbodeVet…</p>`;
 const statusEl=$('#delivery-status');
 deliverOrder(order).then(ok=>{ if(!statusEl) return;
  statusEl.textContent=ok
   ? 'Received by AbodeVet — your enquiry has been delivered to us and we will be in touch at '+order.email+'.'
   : 'Your enquiry is saved in this browser only — we could not reach our order system just now. Please keep your enquiry ID ('+order.id+') and check the Orders page in this browser; nothing was charged.';
 });
 window.scrollTo({top:0,behavior:'smooth'});});
const startAnother=$('#start-another'); if(startAnother) startAnother.addEventListener('click',()=>location.reload());
