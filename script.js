const entry = document.querySelector('#entry-screen');
const archive = document.querySelector('#archive');
const enterButton = document.querySelector('[data-enter]');
const indexToggle = document.querySelector('[data-index-toggle]');
const indexPanel = document.querySelector('[data-index-panel]');

function enterArchive(){
  entry.style.display = 'none';
  archive.classList.add('visible');
  archive.setAttribute('aria-hidden','false');
  window.scrollTo({top:0,behavior:'auto'});
}

function setIndex(open){
  indexPanel.classList.toggle('open',open);
  indexPanel.setAttribute('aria-hidden',String(!open));
  indexToggle.textContent = open ? 'CLOSE' : 'INDEX';
  document.body.style.overflow = open ? 'hidden' : '';
}

enterButton?.addEventListener('click',enterArchive);
document.querySelector('.entry-name')?.addEventListener('click',(event)=>{event.preventDefault();enterArchive();});
indexToggle?.addEventListener('click',()=>setIndex(!indexPanel.classList.contains('open')));
indexPanel?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setIndex(false)));
