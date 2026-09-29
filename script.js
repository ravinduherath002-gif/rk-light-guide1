const body=document.body;
const pages=[...document.querySelectorAll('.page')];
const navItems=[...document.querySelectorAll('.nav-item')];
const mobileNavItems=[...document.querySelectorAll('.mobile-nav-item')];
const sidebar=document.getElementById('sidebar');
const menuBtn=document.getElementById('menuBtn');
const themeBtn=document.getElementById('themeBtn');
function openPage(id){
  pages.forEach(p=>p.classList.toggle('active',p.id===id));
  navItems.forEach(n=>n.classList.toggle('active',n.dataset.page===id));
  mobileNavItems.forEach(n=>n.classList.toggle('active',n.dataset.page===id));
  sidebar.classList.remove('open');
  history.replaceState(null,'','#'+id);
}
navItems.forEach(i=>i.addEventListener('click',()=>openPage(i.dataset.page)));
mobileNavItems.forEach(i=>i.addEventListener('click',()=>openPage(i.dataset.page)));
if(menuBtn) menuBtn.addEventListener('click',()=>sidebar.classList.toggle('open'));
const initial=location.hash.replace('#','')||'overview';
openPage(document.getElementById(initial)?initial:'overview');
const savedTheme=localStorage.getItem('rk-theme');
if(savedTheme==='light') body.classList.add('light');
themeBtn.addEventListener('click',()=>{
  body.classList.toggle('light');
  localStorage.setItem('rk-theme',body.classList.contains('light')?'light':'dark');
});
