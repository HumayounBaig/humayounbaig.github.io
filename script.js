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

  // Active-section highlight: the last section whose top has passed 45% of the viewport.
  // One scroll-based rule, so the page top (no highlight) and bottom (Contact) stay consistent.
  var links = document.querySelectorAll('.nav nav a[href^="#"]');
  var pairs = [];
  links.forEach(function (a) {
    var s = document.querySelector(a.getAttribute("href"));
    if (s && !s.hidden) pairs.push([a, s]);
  });
  function updateActive() {
    var line = window.innerHeight * 0.45;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    var current = null;
    if (window.scrollY > 40) {
      pairs.forEach(function (p) {
        if (atBottom || p[1].getBoundingClientRect().top <= line) current = p[0];
      });
    }
    links.forEach(function (a) { a.classList.toggle("active", a === current); });
  }
  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);
  updateActive();

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
