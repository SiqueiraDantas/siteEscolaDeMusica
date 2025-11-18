/* 
  Integração com Firebase Firestore (modular, v10+)
  1) Crie um projeto no Firebase
  2) Em "Configurações do projeto" > "Suas apps" (Web), copie o objeto de config
  3) Substitua abaixo e descomente os imports
*/

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// TODO: substituir pelos dados reais do Firebase
const firebaseConfig = {
  // apiKey: "",
  // authDomain: "",
  // projectId: "",
  // storageBucket: "",
  // messagingSenderId: "",
  // appId: ""
};

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

/* 
  Convenções de coleções (sugestão):
  - "workshops"            (doc do evento atual; programação, data, local)
  - "inscricoes"           (cadastros dos participantes)
  - "materiais"            (partituras/métodos vinculados a oficinas)
  - "presencas"            (check-ins com referência à inscrição)
  - "galeria"              (metadados de fotos/vídeos do evento)
  - "feedbacks"            (pós-evento)
  - "certificados"         (emissões por participante)
  - "gamificacao"          (pontos/insígnias por participante)
*/
