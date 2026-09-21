const weddingDate = new Date("2026-10-07T20:00:00+03:00").getTime();

const opening = document.getElementById("opening");
const openingCover = document.getElementById("openingCover");
const openingVideoPreview = document.getElementById("openingVideoPreview");
const openingVideoWrap = document.getElementById("openingVideoWrap");
const openingVideo = document.getElementById("openingVideo");
const openBtn = document.getElementById("openBtn");
const invitation = document.getElementById("invitation");
const audio = document.getElementById("weddingAudio");
const musicControl = document.getElementById("musicControl");
const musicLabel = document.getElementById("musicLabel");
const floralFrame = document.querySelector(".floral-frame");

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = String(value).padStart(2,"0");
}

function updateCountdown(){
  const distance = Math.max(0, weddingDate - Date.now());
  setText("days", Math.floor(distance / 86400000));
  setText("hours", Math.floor((distance % 86400000) / 3600000));
  setText("minutes", Math.floor((distance % 3600000) / 60000));
  setText("seconds", Math.floor((distance % 60000) / 1000));
}
updateCountdown();
setInterval(updateCountdown,1000);

async function startMusic(){
  try{
    audio.volume = 0.82;
    await audio.play();
    musicLabel.textContent = "إيقاف الموسيقى";
  }catch(e){
    musicLabel.textContent = "تشغيل الموسيقى";
  }
}

function showInvitation(){
  openingVideoWrap.classList.add("fade");
  setTimeout(()=>{
    opening.classList.add("hidden");
    invitation.classList.add("visible");
    invitation.setAttribute("aria-hidden","false");
    document.body.classList.remove("locked");
    setTimeout(()=>opening.remove(),900);
  },650);
}

async function openInvitation(){
  if(openBtn.disabled) return;
  openBtn.disabled = true;
  openingCover.classList.add("hidden");
  openingVideoWrap.classList.add("active");
  if(openingVideoPreview){ openingVideoPreview.pause(); }
  openingVideo.currentTime = 0;
  startMusic();
  try{
    await openingVideo.play();
  }catch(e){
    showInvitation();
  }
}

openBtn.addEventListener("click",openInvitation);
openingVideo.addEventListener("ended",showInvitation);

musicControl.addEventListener("click",async()=>{
  if(audio.paused){
    await startMusic();
  }else{
    audio.pause();
    musicLabel.textContent = "تشغيل الموسيقى";
  }
});

/* Small scroll-linked parallax for the floral frame and hero image */
let ticking = false;
window.addEventListener("scroll",()=>{
  if(ticking) return;
  ticking = true;
  requestAnimationFrame(()=>{
    const y = Math.min(window.scrollY,900);
    if(floralFrame) floralFrame.style.transform = `translate3d(0,${y * -0.012}px,0)`;
    document.body.classList.toggle("scrolling", window.scrollY > 8);
    ticking = false;
  });
},{passive:true});

/* Add wedding date to the visitor's calendar */
const calendarButton = document.getElementById("calendarButton");

function openGoogleCalendar(){
  const start = "20261007T200000";
  const end = "20261007T230000";
  const title = "زفاف محمد & ميرنا";
  const details = "يسعدنا ويشرفنا دعوتكم لحضور حفل زفاف محمد وميرنا.";
  const location = "مصر - الشرقية - الزقازيق - نازلة كوبري الأحرار";
  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&ctz=Africa/Cairo`;
  window.open(url,"_blank","noopener,noreferrer");
}

function downloadICS(){
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mohamed and Mirna Wedding//AR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:mohamed-mirna-wedding-20261007@wedding-invite",
    "DTSTAMP:20260921T000000Z",
    "DTSTART;TZID=Africa/Cairo:20261007T200000",
    "DTEND;TZID=Africa/Cairo:20261007T230000",
    "SUMMARY:زفاف محمد & ميرنا",
    "DESCRIPTION:يسعدنا ويشرفنا دعوتكم لحضور حفل زفاف محمد وميرنا.",
    "LOCATION:مصر - الشرقية - الزقازيق - نازلة كوبري الأحرار",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], {type:"text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Mohamed-Mirna-Wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

calendarButton.addEventListener("click",()=>{
  const isAppleOrMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isAppleOrMobile){
    downloadICS();
  }else{
    openGoogleCalendar();
  }
});
