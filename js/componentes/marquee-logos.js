// Clona o set de logos 1x para loop contínuo.
// Se só tiver 1 logo, replica várias para preencher a faixa.
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-marquee="logos"]');
  if (!track) return;

  const originals = Array.from(track.children);

  // Se só houver 1 logo, duplica para encher a pista
  if (originals.length === 1) {
    for (let i = 0; i < 8; i++) {
      track.appendChild(originals[0].cloneNode(true));
    }
  }

  // Duplicar o set inteiro 1x para viabilizar o loop perfeito (50% no keyframe)
  originals.forEach(node => track.appendChild(node.cloneNode(true)));
});
