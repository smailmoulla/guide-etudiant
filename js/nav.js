
(() => {

  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");

  if (toggle && links) {
    const setOpen = (open) => {
      links.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    };

    toggle.addEventListener("click", () => setOpen(!links.classList.contains("open")));
    links.addEventListener("click", (e) => e.target.closest("a") && setOpen(false));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
    window
      .matchMedia("(min-width: 1181px)")
      .addEventListener("change", (m) => m.matches && setOpen(false));
  }


  const chips = document.querySelectorAll(".logement-subnav a");

  if (chips.length && "IntersectionObserver" in window) {
    const chipById = new Map([...chips].map((a) => [a.hash.slice(1), a]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          chips.forEach((c) => c.removeAttribute("aria-current"));
          const chip = chipById.get(entry.target.id);
          if (!chip) return;
          chip.setAttribute("aria-current", "location");
          chip.scrollIntoView({ block: "nearest", inline: "center" });
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    chipById.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
