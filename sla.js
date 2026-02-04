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

    const cursor = document.querySelector('.custom-cursor');
const icon = document.querySelector('.cursor-icon');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

const speed = 0.06; // delay (0.08 = mais lento)

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// animação suave (delay tipo Envato)
function animateCursor(){
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  requestAnimationFrame(animateCursor);
}
animateCursor();

// ativar efeito ao passar no card;

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    cursor.classList.add('active');
  });

  card.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
  });
});
