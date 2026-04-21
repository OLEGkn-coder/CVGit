const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.style.color =
            link.getAttribute("href") === `#${id}` ? "#e8a020" : "";
        });
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((s) => observer.observe(s));

const bars = document.querySelectorAll(".skill-bar__fill");
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fillBar .8s ease both";
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

bars.forEach((b) => {
  b.style.width = "0";
  b.style.animation = "none";
  barObserver.observe(b);
});
