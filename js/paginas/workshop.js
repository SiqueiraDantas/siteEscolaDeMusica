import { $, $$ } from '../nucleo/dom.js';

const form = $('#formWorkshop');
if (form){
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form));

    // validação simples
    let ok = true;
    $$('input, select, textarea', form).forEach(el => {
      const msg = el.parentElement.querySelector('.erro');
      if (msg) msg.textContent = '';
      el.classList.remove('is-invalid');
    });

    const req = ['nome','email','instrumento','nivel','horario'];
    req.forEach(id => {
      const el = $('#' + id);
      if (!el?.value?.trim()){
        ok = false;
        el.classList.add('is-invalid');
        el.parentElement.querySelector('.erro').textContent = 'Campo obrigatório.';
      }
    });

    const lgpd = $('#lgpd');
    if (!lgpd.checked){
      ok = false;
      $('[data-for="lgpd"]').textContent = 'É preciso aceitar para continuar.';
    } else {
      $('[data-for="lgpd"]').textContent = '';
    }

    if (!ok) return;

    // 👉 Aqui futuramente entra o Firestore:
    // import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
    // await addDoc(collection(db, 'inscricoes_workshop'), { ...dados, createdAt: serverTimestamp() });

    alert('Inscrição enviada! Entraremos em contato em breve.'); // placeholder
    form.reset();
  });
}
