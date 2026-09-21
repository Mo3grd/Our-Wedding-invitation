(function () {
  "use strict";

  const weddingDate = new Date("2026-10-07T20:00:00+03:00").getTime();

  const opening = document.getElementById("opening");
  const openingVideo = document.getElementById("openingVideo");
  const openBtn = document.getElementById("openBtn");
  const videoError = document.getElementById("videoError");
  const invitation = document.getElementById("invitation");
  const audio = document.getElementById("weddingAudio");
  const musicControl = document.getElementById("musicControl");
  const musicLabel = document.getElementById("musicLabel");
  const floralFrame = document.querySelector(".floral-frame");
  const calendarButton = document.getElementById("calendarButton");

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = String(value).padStart(2, "0");
  }

  function updateCountdown() {
    const distance = Math.max(0, weddingDate - Date.now());
    setText("days", Math.floor(distance / 86400000));
    setText("hours", Math.floor((distance % 86400000) / 3600000));
    setText("minutes", Math.floor((distance % 3600000) / 60000));
    setText("seconds", Math.floor((distance % 60000) / 1000));
  }

  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  function startMusic() {
    if (!audio) return;
    audio.volume = 0.82;
    const promise = audio.play();
    if (promise && typeof promise.catch === "function") {
      promise.then(function () {
        if (musicLabel) musicLabel.textContent = "إيقاف الموسيقى";
      }).catch(function () {
        if (musicLabel) musicLabel.textContent = "تشغيل الموسيقى";
      });
    }
  }

  function showInvitation() {
    if (!opening || opening.classList.contains("hidden")) return;
    opening.classList.add("closing");

    window.setTimeout(function () {
      opening.classList.add("hidden");
      invitation.classList.add("visible");
      invitation.setAttribute("aria-hidden", "false");
      document.body.classList.remove("locked");
    }, 700);
  }

  function openInvitation() {
    if (!openBtn || openBtn.disabled) return;
    openBtn.disabled = true;
    openBtn.textContent = "♥";
    startMusic();

    if (!openingVideo || openingVideo.readyState < 1) {
      showInvitation();
      return;
    }

    try {
      openingVideo.currentTime = 0;
    } catch (e) {}

    const playPromise = openingVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {
        // If autoplay/playback is blocked, still allow the invitation to continue.
        showInvitation();
      });
    }
  }

  if (openBtn) openBtn.addEventListener("click", openInvitation);
  if (openingVideo) {
    openingVideo.addEventListener("ended", showInvitation);
    openingVideo.addEventListener("error", function () {
      if (videoError) videoError.hidden = false;
    });
  }

  if (musicControl) {
    musicControl.addEventListener("click", function () {
      if (!audio) return;
      if (audio.paused) {
        startMusic();
      } else {
        audio.pause();
        if (musicLabel) musicLabel.textContent = "تشغيل الموسيقى";
      }
    });
  }

  let ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      const y = Math.min(window.scrollY || 0, 900);
      if (floralFrame) floralFrame.style.transform = "translate3d(0," + (y * -0.012) + "px,0)";
      ticking = false;
    });
  }, { passive: true });

  function openGoogleCalendar() {
    const start = "20261007T200000";
    const end = "20261007T230000";
    const title = "زفاف محمد & ميرنا";
    const details = "يسعدنا ويشرفنا دعوتكم لحضور حفل زفاف محمد وميرنا.";
    const location = "مصر - الشرقية - الزقازيق - نازلة كوبري الأحرار";
    const url = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=" + encodeURIComponent(title) +
      "&dates=" + start + "/" + end +
      "&details=" + encodeURIComponent(details) +
      "&location=" + encodeURIComponent(location) +
      "&ctz=Africa/Cairo";
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function downloadICS() {
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

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Mohamed-Mirna-Wedding.ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  if (calendarButton) {
    calendarButton.addEventListener("click", function () {
      const isAppleOrMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isAppleOrMobile) downloadICS();
      else openGoogleCalendar();
    });
  }
})();
