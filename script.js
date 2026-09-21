/* عدّل البيانات هنا فقط */
const DATA={
  groom:'محمد',
  bride:'ميرنا',
  date:'07 . 10 . 2026',
  eventDate:'الأربعاء 7 أكتوبر 2026',
  eventTime:'7:00 مساءً',
  venue:'Le Palace Garden',
  city:'جدة',
  address:'Le Palace Garden',
  maps:'https://maps.app.goo.gl/jPSxf1SN5Nkk1dro9?g_st=ic',
  rsvp:'https://wa.me/966500000000',
  weddingDate:'2026-10-07T19:00:00+03:00'
};
document.getElementById('groom').textContent=DATA.groom;document.getElementById('bride').textContent=DATA.bride;document.getElementById('heroDate').textContent=DATA.date;document.getElementById('eventDate').textContent=DATA.eventDate;document.getElementById('eventTime').textContent=DATA.eventTime;document.getElementById('venue').textContent=DATA.venue;document.getElementById('venueTitle').textContent=DATA.venue;document.getElementById('city').textContent=DATA.city;document.getElementById('address').textContent=DATA.address;document.getElementById('maps').href=DATA.maps;document.getElementById('rsvp').href=DATA.rsvp;
const target=new Date(DATA.weddingDate).getTime();
function tick(){let d=Math.max(0,target-Date.now());const s=Math.floor(d/1000);document.getElementById('days').textContent=String(Math.floor(s/86400)).padStart(2,'0');document.getElementById('hours').textContent=String(Math.floor(s%86400/3600)).padStart(2,'0');document.getElementById('minutes').textContent=String(Math.floor(s%3600/60)).padStart(2,'0');document.getElementById('seconds').textContent=String(s%60).padStart(2,'0')}
tick();setInterval(tick,1000);
const audio=document.getElementById('audio'),btn=document.getElementById('musicBtn');btn.addEventListener('click',async()=>{if(!audio.src||audio.src.endsWith(location.href)){alert('أضف رابط/ملف الموسيقى في script.js داخل DATA أو ضع ملفًا داخل assets ثم اربطه في index.html.');return}if(audio.paused){await audio.play();btn.querySelector('span').textContent='إيقاف الموسيقى'}else{audio.pause();btn.querySelector('span').textContent='تشغيل الموسيقى'}});


// شاشة فتح الدعوة
const openingScreen=document.getElementById('openingScreen');
const openInvitation=document.getElementById('openInvitation');
const invitation=document.getElementById('invitation');
function openWeddingInvitation(){
  openingScreen.classList.add('is-open');
  invitation.setAttribute('aria-hidden','false');
  invitation.classList.add('is-visible');
  document.body.classList.remove('invitation-locked');
  setTimeout(()=>openingScreen.remove(),900);
}
openInvitation.addEventListener('click',openWeddingInvitation);
openingScreen.addEventListener('click',(e)=>{if(e.target===openingScreen || e.target.classList.contains('opening-bg') || e.target.classList.contains('opening-shade')) openWeddingInvitation();});
document.body.classList.add('invitation-locked');
