// <=============== PROJECT DATA ===============>

const projects = [
  {
    title: "Minesweeper",
    desc: "Developed a console-based Minesweeper game using C++.",
    tech: "C++",
    github: "#",
    demo: "#",
    status: "completed",
  },
  {
    title: "Linux Interface",
    desc: "Created custom shell scripts for system administration.",
    tech: "Shell Scripting",
    github: "#",
    demo: "#",
    status: "completed",
  },
  {
    title: "Portfolio",
    desc: "Built a responsive personal portfolio website.",
    tech: "HTML, CSS, JavaScript",
    github: "#",
    demo: "#",
    status: "in-progress",
  },
];

// <=============== INIT ===============>

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initScroll();
  initTooltips();
  initQuests();
  initAudio();
});

// <=============== HEADER ===============>
const header = document.querySelector("header");
function initHeader() {
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  });
}

// <=============== SCROLL ===============>

function initScroll() {
  document.addEventListener(
    "wheel",
    (e) => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll <= 0 && e.deltaY < 0) return;
      if (currentScroll >= maxScroll && e.deltaY > 0) return;

      e.preventDefault();
      window.scrollBy({
        top: e.deltaY * 0.6,
        behavior: "smooth",
      });
    },
    { passive: false },
  );
}

// <=============== TOOLTIP ===============>

function initTooltips() {
  const globalTooltip = document.getElementById("global-tooltip");

  document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", (e) => {
      const titleElem = item.querySelector(".tooltip-title");
      const title = titleElem.innerText;
      const titleClass = titleElem.className;
      const desc = item.querySelector(".desc").innerText;

      globalTooltip.innerHTML = `
              <p class="${titleClass}">${title}</p>
              <p>${desc}</p>
          `;

      const rect = item.getBoundingClientRect();

      globalTooltip.style.top = rect.top + rect.height / 2 + "px";

      const tooltipWidth = globalTooltip.offsetWidth || 300;
      const screenWidth = window.innerWidth;

      let left = rect.right + 15;
      if (left + tooltipWidth > screenWidth) {
        left = rect.left - tooltipWidth - 15;
      }
      globalTooltip.style.left = left + "px";
      globalTooltip.classList.add("active");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("#global-tooltip") && !e.target.closest(".item")) {
      globalTooltip.classList.remove("active");
    }
  });
}

// <=============== QUESTS ===============>
function initQuests() {
  const container = document.querySelector(".quests");
  projects.forEach((proj) => {
    const div = document.createElement("div");
    div.classList.add("quest", proj.status);

    div.innerHTML = `
          <h3 class="quest-title">${proj.title}</h3>
          <div class="quest-status ${proj.status}">
            ${proj.status === "completed" ? "Completed!" : "In Progress!"}
          </div>

          <div class="quest-details">
              <p class="desc">${proj.desc}</p>
              <p class="tech"><strong>Tech:</strong> ${proj.tech}</p>
              <div class="links">
                  <a href="${proj.github}">GitHub</a>
                  <a href="${proj.demo}">Demo</a>
              </div>
          </div>
      `;
    div.querySelector(".quest-title").addEventListener("click", () => {
      const details = div.querySelector(".quest-details");

      if (div.classList.contains("active")) {
        details.style.maxHeight = null;
        div.classList.remove("active");
      } else {
        details.style.maxHeight = details.scrollHeight + "px";
        div.classList.add("active");
      }
    });
    container.appendChild(div);
  });
  updateXP();
}

// <================ XP =================>
function updateXP() {
  const total = projects.length;
  const completed = projects.filter((p) => p.status === "completed").length;

  const percent = (completed / total) * 100;

  const xpBar = document.querySelector(".xp-fill");
  xpBar.style.width = percent + "%";
}

// <=============== AUDIO ===============>
function initAudio() {
  const btn = document.getElementById("music-toggle");
  const music = document.getElementById("bg-music");

  const clickSound = new Audio("audio/minecraft_click.mp3");
  clickSound.volume = 0.2;

  function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
  }

  // play click sound on links
  const links = document.querySelectorAll(".quest a, .terminal a");
  links.forEach((link) => {
    link.addEventListener("click", playClickSound);
  });

  let isPlaying = false;

  btn.addEventListener("click", () => {
    playClickSound();

    if (!isPlaying) {
      fadeIn(music);
      btn.textContent = "🔇";
    } else {
      fadeOut(music);
      btn.textContent = "🎵";
    }

    isPlaying = !isPlaying;
    btn.classList.toggle("active", isPlaying);
  });
}

// <=========== AUDIO HELPERS ============>
function fadeIn(audio) {
  audio.volume = 0;
  audio.play().catch(() => {});

  let fade = setInterval(() => {
    if (audio.volume < 0.2) {
      audio.volume = Math.min(audio.volume + 0.02, 0.2);
    } else {
      clearInterval(fade);
    }
  }, 100);
}

function fadeOut(audio) {
  let fade = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - 0.02, 0);
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, 150);
}
function fadeOut(audio) {
  let fade = setInterval(() => {
    if (audio.volume > 0) {
      audio.volume = Math.max(audio.volume - 0.02, 0);
    } else {
      audio.pause();
      clearInterval(fade);
    }
  }, 150);
}
