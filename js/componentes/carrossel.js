import { $, $$ } from '../nucleo/dom.js';

(function initCarrossel(){
  const carrossel = $('.carrossel');
  if (!carrossel) return;

  const lista = $('.carrossel__lista', carrossel);
  const itens = $$('.carrossel__item', carrossel);
  const prev = $('.carrossel__ctrl--prev', carrossel);
  const next = $('.carrossel__ctrl--next', carrossel);
  const pontosWrap = $('.carrossel__pontos', carrossel);

  let i = 0;
  const total = itens.length;

  // pontos
  const pontos = itens.map((_, idx) => {
    const b = document.createElement('button');
    if (idx === 0) b.classList.add('ativo');
    b.addEventListener('click', () => goTo(idx));
    pontosWrap.appendChild(b);
    return b;
  });

  function goTo(idx){
    i = (idx + total) % total;
    lista.style.transform = `translateX(-${i * 100}%)`;
    pontos.forEach(p => p.classList.remove('ativo'));
    pontos[i].classList.add('ativo');
  }

  prev?.addEventListener('click', () => goTo(i-1));
  next?.addEventListener('click', () => goTo(i+1));

  // auto-play
  const auto = carrossel.dataset.auto === 'true';
  const intervalo = Number(carrossel.dataset.intervalo || 5000);
  if (auto){
    setInterval(() => goTo(i+1), intervalo);
  }
})();
