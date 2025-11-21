import { DashboardLayout } from "../../layout/dashboard.js";

export function ProjetosePropostas() {
    const content = document.createElement('div');
    content.innerHTML = `

    <div class="retangulo-propostas">
                PROJETOS E PROPOSTAS
            </div>
<div class="propostas-container">

    <div class="dados-candidato">

        <h2 class="h2-propostas">Dr. Murillo Lima</h2>

        <ul class="lista-projetos">
            <li>Total de projetos: 50</li>
            <li>Não iniciados: 20</li>
            <li>Em andamento: 10</li>
            <li>Concluídos: 20</li>
        </ul>

    </div>

    <img src="../../assets/login/murilo.svg"
         class="foto-circular"
         alt="Dr. Murillo Lima">
</div>    
<div class="espacamento-titulo">    

 <div class="info-container">
<h2 class="bio-title">Meio Ambiente</h2>
    <div class="bio-content">
        <p class="text">
          As propostas voltadas ao meio ambiente do candidato, médico veterinário, têm como foco a proteção da fauna, o uso responsável dos recursos naturais e ações de bem-estar animal. Entre as iniciativas, estão programas de preservação da biodiversidade, fortalecimento de campanhas de vacinação e controle populacional de animais, incentivo a práticas sustentáveis em propriedades rurais e projetos de educação ambiental para a comunidade. O objetivo é promover a saúde única — a integração entre saúde animal, humana e ambiental — garantindo um futuro mais equilibrado e sustentável para todos.
  </p>
      <p class="text">
Além disso, o candidato pretende ampliar ações de fiscalização contra crimes ambientais, apoiar projetos de recuperação de áreas degradadas e incentivar pesquisas voltadas à conservação da fauna local. Também está prevista a criação de parcerias com universidades, ONGs e órgãos ambientais para desenvolver programas contínuos de proteção e monitoramento. Essas medidas reforçam o compromisso com políticas públicas sólidas, que unem conhecimento técnico e responsabilidade ambiental.
        </p>
           </div>
             </div>

             <div class="espacamento-titulo">    

 <div class="info-container">
<h2 class="bio-title-acao-saopaulo">Ação em São Paulo</h2>
  <img src="../../assets/login/foto-meio-ambiente.svg"
         class="foto-meio-ambiente"
         alt="meio-ambiente">
             <h2 class="bio-title-animais">Direito dos Animais</h2>
    <div class="bio-content">
      <p class="text">
O Direito dos Animais é um campo jurídico e uma filosofia ética que busca proteger os animais, não apenas como propriedade ou recursos humanos, mas como seres sencientes (capazes de sentir dor, prazer e emoções) com valor intrínseco.

Historicamente, os animais eram tratados como objetos (coisas). Hoje, o Direito dos Animais representa uma evolução na nossa relação com outras espécies, buscando garantir que os animais não sejam submetidos a sofrimento desnecessário ou cruel.
        </p>
           </div>
               <img src="../../assets/login/foto-animais.svg"
         class="foto-animais"
         alt="meio-ambiente">
             </div>
        
    `
    ;
    return DashboardLayout({ title: 'Dashboard', children: content });
}