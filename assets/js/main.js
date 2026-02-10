// Blog Santos - scripts (busca/filtro + cursor com delay)
// Mantém tudo seguro: se um elemento não existir na página, o script não quebra.

(function () {
  // ===== Busca + filtros (apenas na Home) =====
  const searchInput = document.getElementById("searchInput");
  const chips = Array.from(document.querySelectorAll(".chip"));
  const cards = Array.from(document.querySelectorAll(".card"));

  let activeFilter = "todos";

  function normalize(s) {
    return (s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "");
  }

  function applyFilters() {
    if (!searchInput || cards.length === 0) return;
    const q = normalize(searchInput.value);

    cards.forEach((card) => {
      const tags = normalize(card.getAttribute("data-tags") || "");
      const text = normalize(card.innerText || "");
      const matchesSearch = !q || text.includes(q) || tags.includes(q);
      const matchesFilter = activeFilter === "todos" || tags.includes(activeFilter);

      card.style.display = matchesSearch && matchesFilter ? "" : "none";
    });
  }

  if (chips.length && cards.length) {
    chips.forEach((btn) => {
      btn.addEventListener("click", () => {
        chips.forEach((b) => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        activeFilter = btn.dataset.filter || "todos";
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  // ===== Cursor com delay (Home + Posts) =====
  const cursor = document.querySelector(".custom-cursor");
  const icon = document.querySelector(".cursor-icon");

  if (!cursor || !icon) return;

  let mouseX = 0,
    mouseY = 0,
    cursorX = 0,
    cursorY = 0;

  const speed = 0.06; // menor = mais delay (estilo Envato)

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Ativa efeito em qualquer elemento com .card ou .mini (home/sidebar)
  const hoverTargets = Array.from(document.querySelectorAll(".card, .mini"));

  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("active"));
  });
})();
