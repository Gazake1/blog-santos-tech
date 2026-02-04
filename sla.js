    const searchInput = document.getElementById("searchInput");
    const chips = Array.from(document.querySelectorAll(".chip"));
    const cards = Array.from(document.querySelectorAll(".card"));

    let activeFilter = "todos";

    function normalize(s){
      return (s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }

    function apply(){
      const q = normalize(searchInput.value);
      cards.forEach(card => {
        const tags = normalize(card.getAttribute("data-tags") || "");
        const text = normalize(card.innerText || "");
        const matchesSearch = !q || text.includes(q) || tags.includes(q);
        const matchesFilter = activeFilter === "todos" || tags.includes(activeFilter);
        card.style.display = (matchesSearch && matchesFilter) ? "" : "none";
      });
    }

    chips.forEach(btn => {
      btn.addEventListener("click", () => {
        chips.forEach(b => b.setAttribute("aria-pressed","false"));
        btn.setAttribute("aria-pressed","true");
        activeFilter = btn.dataset.filter;
        apply();
      });
    });

    searchInput.addEventListener("input", apply);