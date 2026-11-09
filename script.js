(function () {
  var root = document.documentElement;

  // Theme toggle: remembers the choice; without one, the OS preference applies via CSS.
  var btn = document.getElementById("theme-toggle");
  function current() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  }
  if (btn) {
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Project filters: chips are hidden in markup so no-JS visitors see every card.
  var filters = document.getElementById("filters");
  var cards = document.querySelectorAll("#projects .project");
  if (filters) {
    filters.hidden = false;
    filters.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      var f = chip.getAttribute("data-filter");
      filters.querySelectorAll(".chip").forEach(function (c) {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      cards.forEach(function (card) {
        card.hidden = f !== "all" && card.getAttribute("data-cat") !== f;
      });
    });
  }

  // Active-section highlight in the nav.
  var links = document.querySelectorAll('.nav nav a[href^="#"]');
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    links.forEach(function (a) {
      var s = document.querySelector(a.getAttribute("href"));
      if (s) io.observe(s);
    });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
