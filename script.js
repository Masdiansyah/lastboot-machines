const samples = [
  ["#0001","FIRST BOOT"],["#0012","ARCHIVE UNIT"],["#0047","SIGNAL NODE"],["#0138","CONTROL DESK"],
  ["#0420","RECON MODULE"],["#0699","DORMANT"],["#1000","ORIGINAL"],["#5000","MIDPOINT"],
  ["#7314","UNKNOWN"],["#8088","NIGHT SHIFT"],["#9001","LOST SIGNAL"],["#9999","FINAL SIGNAL"]
];

const grid = document.getElementById('machineGrid');
let visible = 8;
function renderCards(){
  grid.innerHTML = samples.slice(0, visible).map(([id,name],i)=>`
    <article class="machine-card" onclick="openRecord('${id.replace('#','')}')">
      <div class="machine-art">
  <img src="assets/machines/${id.replace('#','')}.png" alt="LASTBOOT ${id}">
</div>
      <div class="machine-info"><strong>LASTBOOT ${id}</strong><span>${name}</span></div>
    </article>`).join('');
}
function openRecord(id){
  document.getElementById('searchInput').value = String(id).padStart(4,'0');
  document.getElementById('database').scrollIntoView({behavior:'smooth'});
  queryMachine();
}
function queryMachine(){
  const raw = (document.getElementById('searchInput').value || '0420').replace(/\D/g,'').slice(0,4).padStart(4,'0');
  document.getElementById('machineRecord').innerHTML = `
    <div class="record-image"><div class="machine-glyph">LB</div></div>
    <div class="record-data">
      <p class="eyebrow">RECORD // #${raw}</p>
      <h3>MACHINE #${raw}</h3>
      <div class="status-line"><span class="status">ARCHIVE ONLINE</span><span>GENERATION: ORIGINAL</span></div>
      <div class="traits">
        <div><span>BODY</span><b>ARCHIVE UNIT</b></div>
        <div><span>SCREEN</span><b>MONO CRT</b></div>
        <div><span>HEAD</span><b>RECON MODULE</b></div>
        <div><span>SIGNAL</span><b>UNKNOWN</b></div>
      </div>
      <div class="record-actions"><a class="button ghost" href="#verify">VIEW ONCHAIN</a><a class="button ghost" href="#machines">VIEW COLLECTION</a></div>
    </div>`;
}
document.getElementById('searchBtn').addEventListener('click', queryMachine);
document.getElementById('searchInput').addEventListener('keydown', e=>{if(e.key==='Enter')queryMachine()});
document.getElementById('loadMore').addEventListener('click',()=>{visible = Math.min(12, visible+4); renderCards(); if(visible>=samples.length) document.getElementById('loadMore').style.display='none';});
renderCards();

let n=0;
const bootCount=document.getElementById('bootCount'), progress=document.getElementById('progressBar');
const timer=setInterval(()=>{n+=137;if(n>=10000){n=10000;clearInterval(timer)} bootCount.textContent=String(n).padStart(4,'0');progress.style.width=(n/100)+'%';},45);
