// ../js/componentes/apoiadores.js
// Faixa de logos com rolagem infinita (marquee) — sem libs

document.addEventListener('DOMContentLoaded', () => {
  const faixa = document.querySelector('.apoiadores__faixa');
  const track = document.querySelector('.apoiadores__logos[data-marquee="logos"]');
  if (!faixa || !track) return;

  // Respeita usuários com redução de movimento
  const reduzMov = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzMov) {
    faixa.style.overflowX = 'auto';
    track.style.animation = 'none';
    return;
  }

  // Permite ajustar velocidade via data-vel="24s" (opcional)
  const vel = track.dataset.vel || track.dataset.speed;
  if (vel) track.style.setProperty('--logos-vel', vel);

  // Garante que exista conteúdo suficiente para o loop
  const originals = Array.from(track.children);

  // Se só houver 1 logo, replica várias vezes para preencher
  if (originals.length === 1) {
    for (let i = 0; i < 8; i++) {
      track.appendChild(originals[0].cloneNode(true));
    }
  }

  // Duplicação do SET inteiro 1x para criar o loop perfeito
  originals.forEach(node => track.appendChild(node.cloneNode(true)));

  // Acessibilidade: pausa quando o usuário interagir
  const pause = () => (track.style.animationPlayState = 'paused');
  const play  = () => (track.style.animationPlayState = 'running');

  faixa.addEventListener('mouseenter', pause);
  faixa.addEventListener('mouseleave', play);
  faixa.addEventListener('focusin',  pause);
  faixa.addEventListener('focusout', play);

  // Reaplica animação ao redimensionar (evita "saltos" raros)
  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => {
      track.style.animation = 'none';
      // força reflow
      void track.offsetWidth;
      track.style.animation = '';
    }, 120);
  });
});
