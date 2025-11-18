// ===================== DADOS DA LINHA DO TEMPO =====================
const eventos = [
  { year: 2009, title: "Fundação da Associação Musical de Madalena — Made In Sertão",
    text: "Criada por músicos e apoiadores da educação musical para democratizar o acesso à música em Madalena.", tag: "Início" },
  { year: 2023, title: "Concerto Natalino em praça pública",
    text: "Evento que reuniu alunos e comunidade, celebrando a música como identidade e pertencimento.", tag: "Evento" },
  { year: 2023, title: "Projeto “Nosso Hino, Nossa História”",
    text: "Aprovado pela Lei Paulo Gustavo (Sec. de Cultura de Madalena).", tag: "Reconhecimento" },
  { year: 2024, title: "II Edital Madalena das Artes — PNAB",
    text: "Premiada na categoria Escolas de Música, pela excelência pedagógica e impacto social.", tag: "Prêmio" },
  { year: 2024, title: "Orquestra de Sopros de Madalena",
    text: "Participações em Jaguaribe, Arneiroz, Santa Quitéria e no programa 'Pra Ver a Banda' (Secult-CE).", tag: "Apresentações" },
  { year: 2025, title: "Expansão de oficinas e prática de conjunto",
    text: "Plano pedagógico por faixas etárias (flauta doce, madeiras, metais e percussão) com 100 alunos/semestre.", tag: "Pedagogia" },
];

// ===================== ELEMENTOS-ALVO =====================
const timelineEl = document.getElementById('timeline');
const indexEl = document.getElementById('yearIndexList');
if (!timelineEl || !indexEl) console.warn('[historia.js] Elementos #timeline ou #yearIndexList não encontrados.');

// ===================== HELPERS =====================
const uniq = (arr) => [...new Set(arr)];
const byNumberAsc = (a, b) => a - b;
const ORDEM_ASC = true;

// ===================== AGRUPAMENTO =====================
const anos = uniq(eventos.map(e => e.year)).sort(byNumberAsc);
const anosOrdenados = ORDEM_ASC ? anos : [...anos].reverse();

// ===================== ÍNDICE LATERAL =====================
if (indexEl) {
  indexEl.innerHTML = anosOrdenados
    .map(y => `<li><a href="#y-${y}" data-year-link="${y}">${y}</a></li>`)
    .join('');
}

// ===================== TIMELINE =====================
if (timelineEl) {
  let html = '';
  anosOrdenados.forEach(year => {
    // <h2> sem texto; CSS mostra via ::before content: attr(data-year)
    html += `<h2 class="tl-year" id="y-${year}" data-year="${year}" aria-label="Ano ${year}"></h2>`;
    eventos
      .filter(e => e.year === year)
      .forEach(e => {
        html += `
          <article class="tl-card">
            <header class="tl-card__head">
              <h3 class="tl-card__title">${e.title}</h3>
              ${e.tag ? `<span class="badge" aria-label="Categoria">${e.tag}</span>` : ``}
            </header>
            <p class="tl-card__text">${e.text}</p>
          </article>
        `;
      });
  });
  timelineEl.innerHTML = html;
}

// ===================== ANIMAÇÃO DE ENTRADA =====================
const enableCardReveal = () => {
  const cards = document.querySelectorAll('.tl-card');
  if (!('IntersectionObserver' in window)) {
    cards.forEach(c => c.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach(c => io.observe(c));
};

// ===================== REALCE DO ANO ATIVO (SCROLL SPY) =====================
const enableYearSpy = () => {
  const headings = document.querySelectorAll('.tl-year');
  const links = [...document.querySelectorAll('[data-year-link]')];
  if (!headings.length || !links.length) return;

  if (!('IntersectionObserver' in window)) {
    links.forEach(a => a.classList.toggle('is-active', a === links[links.length - 1]));
    return;
  }
  const ioYears = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const y = entry.target.getAttribute('data-year');
        links.forEach(a => a.classList.toggle('is-active', a.getAttribute('data-year-link') === y));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  headings.forEach(h => ioYears.observe(h));
};

// ===================== SCROLL SUAVE NO ÍNDICE =====================
const enableIndexScroll = () => {
  if (!indexEl) return;
  indexEl.addEventListener('click', (ev) => {
    const a = ev.target.closest('a[data-year-link]');
    if (!a) return;
    ev.preventDefault();
    const id = `#y-${a.getAttribute('data-year-link')}`;
    const el = document.querySelector(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', id);
  });
};

// ===================== HASH INICIAL (#y-ANO) =====================
const scrollToHashIfPresent = () => {
  if (location.hash && location.hash.startsWith('#y-')) {
    const el = document.querySelector(location.hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
};

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  enableCardReveal();
  enableYearSpy();
  enableIndexScroll();
  scrollToHashIfPresent();
  window.__MIS_TIMELINE__ = { eventos, anos: anosOrdenados };
});
