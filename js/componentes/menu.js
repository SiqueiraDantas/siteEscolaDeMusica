// js/componentes/menu.js
const toggle = document.querySelector(".menu__toggle");
const menu = document.querySelector(".menu");

// abre/fecha menu mobile
if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("ativo");
    const ativo = menu.classList.contains("ativo");
    toggle.setAttribute("aria-expanded", ativo);
  });

  // fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (menu.classList.contains("ativo") && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove("ativo");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

// marca automaticamente o link ativo
const links = document.querySelectorAll(".menu a");

const normalizar = (path) => {
  if (path.endsWith("/index.html")) path = path.replace("/index.html", "/");
  if (!path.endsWith("/")) path += "/";
  return path;
};

const atual = normalizar(window.location.pathname);

links.forEach((link) => {
  const href = new URL(link.href).pathname;
  const linkNormalizado = normalizar(href);

  // define ativo para a página atual
  if (atual === linkNormalizado || (atual.startsWith("/workshop/") && linkNormalizado.endsWith("/workshop/"))) {
    link.classList.add("ativo");
    link.setAttribute("aria-current", "page");
  }
});
