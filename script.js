// ========================================
// محمد & ميرنا — Wedding Invitation
// ========================================

// تاريخ ووقت الفرح
const weddingDate = new Date("2026-10-07T19:00:00+03:00").getTime();


// ========================================
// COUNTDOWN
// ========================================

function updateCountdown() {

  const now = new Date().getTime();

  const distance = Math.max(0, weddingDate - now);

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24))
    / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60))
    / (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60))
    / 1000
  );


  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");


  if (daysElement) {
    daysElement.textContent =
      String(days).padStart(2, "0");
  }

  if (hoursElement) {
    hoursElement.textContent =
      String(hours).padStart(2, "0");
  }

  if (minutesElement) {
    minutesElement.textContent =
      String(minutes).padStart(2, "0");
  }

  if (secondsElement) {
    secondsElement.textContent =
      String(seconds).padStart(2, "0");
  }
}


updateCountdown();

setInterval(updateCountdown, 1000);


// ========================================
// OPEN INVITATION
// ========================================

const openingScreen =
  document.getElementById("openingScreen");

const openInvitation =
  document.getElementById("openInvitation");

const invitation =
  document.getElementById("invitation");


function openWeddingInvitation() {

  if (!openingScreen || !invitation) {
    return;
  }


  openingScreen.classList.add("is-open");

  invitation.classList.add("is-visible");

  invitation.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.remove(
    "invitation-locked"
  );


  // إزالة شاشة الظرف بعد انتهاء الـ animation

  setTimeout(function () {

    if (openingScreen) {
      openingScreen.remove();
    }

  }, 900);
}


// زر اضغط للفتح

if (openInvitation) {

  openInvitation.addEventListener(
    "click",
    function (event) {

      event.preventDefault();

      event.stopPropagation();

      openWeddingInvitation();

    }
  );

}


// الضغط على شاشة الظرف نفسها

if (openingScreen) {

  openingScreen.addEventListener(
    "click",
    function (event) {

      if (
        event.target === openingScreen ||
        event.target.classList.contains("opening-bg") ||
        event.target.classList.contains("opening-shade")
      ) {

        openWeddingInvitation();

      }

    }
  );

}


// ========================================
// MUSIC BUTTON
// ========================================

const musicButton =
  document.getElementById("musicBtn");

const audio =
  document.getElementById("audio");


if (musicButton && audio) {

  musicButton.addEventListener(
    "click",
    async function () {

      if (!audio.src) {

        alert(
          "الموسيقى لم تتم إضافتها بعد 🎵"
        );

        return;

      }


      try {

        if (audio.paused) {

          await audio.play();

          const text =
            musicButton.querySelector("span");

          if (text) {
            text.textContent =
              "إيقاف الموسيقى";
          }

        } else {

          audio.pause();

          const text =
            musicButton.querySelector("span");

          if (text) {
            text.textContent =
              "تشغيل الموسيقى";
          }

        }

      } catch (error) {

        console.log(
          "Music error:",
          error
        );

      }

    }
  );

}


// ========================================
// LOCK PAGE BEFORE OPENING
// ========================================

document.body.classList.add(
  "invitation-locked"
);
