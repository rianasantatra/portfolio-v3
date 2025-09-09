// ------------------- Theme Toggle -------------------
const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");

// Apply saved theme on load
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.innerHTML = `<i class="bi bi-sun"></i>`;
}

// Toggle and Save Theme
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = `<i class="fa fa-sun"></i>`;
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = `<i class="fa fa-moon"></i>`;
  }
});

// ------------------- Scroll Fade-in Effect -------------------
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    appearOnScroll.unobserve(entry.target);
  });
},
appearOptions);

// Add appear class on scroll
faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});

// ------------------- AJAX Contact Form Submission -------------------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);

    fetch("contact.php", {
      method: "POST",
      body: formData,
    })
      .then((response) =>
        response
          .text()
          .then((text) => ({ status: response.status, message: text }))
      )
      .then((res) => {
        if (res.status === 200) {
          showFormStatus("Message sent successfully!", "success");
          contactForm.reset();
        } else {
          showFormStatus("❌ " + res.message, "error");
        }
      })
      .catch((err) => {
        showFormStatus("❌ Failed to send message. Try again later.", "error");
        console.error(err);
      });
  });
}

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = "form-status " + type;
  formStatus.style.display = "block";

  setTimeout(() => {
    formStatus.style.display = "none";
  }, 5000);
}

// particle Effect
particlesJS("particles-js", {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
});
