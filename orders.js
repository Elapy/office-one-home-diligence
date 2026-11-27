// AbodeVet orders viewer. Everything in localStorage is untrusted input:
// order fields were typed by a visitor into the order form, so every value
// is escaped before it reaches innerHTML (the previous version rendered
// name/address/email raw — a stored-XSS hole), and corrupted storage
// degrades to a message instead of a blank, exception-killed page.
function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function loadOrders(){try{const v=JSON.parse(localStorage.getItem('hd_orders')||'[]');return Array.isArray(v)?v:[]}catch(e){return null}}
function render(){const out=document.getElementById('out'); const orders=loadOrders();
 if(orders===null){out.innerHTML='<p>Stored order data is corrupted and could not be read. You can clear it with the button above and start fresh.</p>';return;}
 if(!orders.length){out.innerHTML='<p>No orders yet. Place one on the main page first.</p>';return;}
 const rows=orders.map(o=>{const items=Array.isArray(o.items)?o.items:[]; const t=Number(o.total); const total=Number.isFinite(t)?t:0;
  return `<tr><td>${esc(o.id)}</td><td>${esc(o.createdAt)}</td><td>${esc(o.name)}<br>${esc(o.email)}</td><td>${esc(o.address)}<br>Close: ${esc(o.closeDate||'—')}</td><td>${(o.bundle?'Bundle<br>':'')+items.map(i=>esc(i&&i.name)).join('<br>')}</td><td>$${total.toLocaleString('en-US')}</td><td>${esc(o.status)}</td></tr>`}).join('');
 out.innerHTML='<div class="table-wrap"><table><tr><th>Order ID</th><th>Created</th><th>Customer</th><th>Property</th><th>Items</th><th>Total</th><th>Status</th></tr>'+rows+'</table></div>';}
function exportJSON(){const data=localStorage.getItem('hd_orders')||'[]';const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type:'application/json'}));a.download='home-diligence-orders.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
document.getElementById('export-btn').addEventListener('click',exportJSON);
document.getElementById('clear-btn').addEventListener('click',()=>{if(confirm('Clear all stored orders?')){localStorage.removeItem('hd_orders');render()}});
render();
