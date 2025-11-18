// Comportamento simples de abas (sem framework)
import { qsa, qs } from "./util.js";

export function iniciarAbas() {
  const botoes = qsa(".aba");
  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      qsa(".aba").forEach(b => b.classList.remove("ativa"));
      qsa(".aba-conteudo").forEach(sec => sec.classList.remove("ativa"));
      btn.classList.add("ativa");
      const alvo = qs(btn.dataset.alvo);
      if (alvo) alvo.classList.add("ativa");
    });
  });
}
