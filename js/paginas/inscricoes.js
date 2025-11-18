// js/paginas/inscricoes.js
// Página Inscrições: popula oficinas, aplica chips compactos e pré-seleciona via ?curso=

const OFICINAS = [
  "Clarinete",
  "Trompete",
  "Saxofone",
  "Trombone",
  "Flauta Transversal",
  "Flauta Doce",
  "Percussão",
  "Bateria",
  // acrescente outras aqui se precisar
];

// ---- Monta os chips das oficinas ----
const oficinasGroup = document.getElementById("oficinasGroup");
if (oficinasGroup) {
  oficinasGroup.classList.add("chips-sm"); // deixa os chips menores
  oficinasGroup.innerHTML = OFICINAS.map(nome => `
    <label class="chip">
      <input type="checkbox" name="oficinas[]" value="${nome}" />
      ${nome}
    </label>
  `).join("");
}

// ---- Pré-seleciona oficina a partir do ?curso= na URL ----
const params = new URLSearchParams(location.search);
const curso = params.get("curso"); // ex.: inscricoes.html?curso=Clarinete

if (curso) {
  const alvo = [...document.querySelectorAll('input[name="oficinas[]"]')]
    .find(inp => inp.value.toLowerCase() === curso.toLowerCase());
  if (alvo) {
    alvo.checked = true;
    // rola até o grupo de oficinas para o usuário ver
    oficinasGroup?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// ---- Máscaras simples (CPF e telefones) ----
document.addEventListener('input', (e) => {
  if (e.target && e.target.id === 'cpf') {
    let v = e.target.value.replace(/\D/g, '').slice(0,11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2')
         .replace(/(\d{3})(\d)/, '$1.$2')
         .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = v;
  }
  if (e.target && (e.target.id === 'telefone' || e.target.id === 'telefoneResponsavel')) {
    let v = e.target.value.replace(/\D/g, '').slice(0,11);
    if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    if (v.length >= 10) v = v.replace(/(\(\d{2}\)) (\d{5})(\d{0,4})/, '$1 $2-$3');
    e.target.value = v;
  }
});

// ---- Validação simples de idade para exibir aviso ----
const idade = document.getElementById('idade');
const erroIdade = document.getElementById('erroIdade');
if (idade && erroIdade) {
  const dentroDaFaixa = v => {
    const n = Number(v);
    return Number.isFinite(n) && n >= 11 && n <= 18;
  };
  idade.addEventListener('input', () => {
    erroIdade.style.display = dentroDaFaixa(idade.value) ? 'none' : 'block';
  });
}

// ---- (Opcional) Intercepta submit só para evitar recarregar enquanto você valida/layouta ----
const form = document.getElementById('formMatricula');
if (form) {
  form.addEventListener('submit', (e) => {
    // TODO: aqui entra sua integração com Firebase/Firestore quando quiser.
    e.preventDefault();
    alert('Matrícula enviada! (simulação)\nIntegração com Firebase pode ser ligada aqui.');
  });
}
