import { DashboardLayout } from "../../layout/dashboard.js";

export function Candidates() {
    const content = document.createElement('div');
    content.innerHTML = `
    <div class="card">

        <h2 class="h2">Dr. Murillo Lima</h2>

        <img src="../../assets/login/murilo.svg" class="foto">

        <div class="logos">
            <img src="../../assets/login/logo-instagram.svg" class="tamanhoLogo" />
            <img src="../../assets/login/logo-facebook.svg" class="tamanhoLogo" />
            <img src="../../assets/login/logo-whatssap.svg" class="tamanhoLogo" />
        </div>

    </div>
     <div class="alinhamento">
        <p class="textos">
            Filiação: Progressistas (PP).<br>
            Data de Nascimento: 28/04/1990.
        </p>

        <button class="btn-projetos-propostas">Propostas e Projetos</button>
 </div>
    <div class="info-container">
<h2 class="bio-title">Conheça mais...</h2>
    <div class="bio-content">
        <p class="text">
           Murillo de Oliveira Lima é Médico Veterinário, eleito com 113 mil e 823 votos sendo o vereador mais votado da história da causa animal na Câmara Municipal em São Paulo. Conhecido como Dr. Murillo Lima, é embaixador do movimento Cadeia para Maus-Tratos na capital, idealizado pelo seu irmão, Delegado Bruno Lima.
  </p>
      <p class="text">
<em> Dr. Murillo é um combatente aos maus-tratos aos animais. <em> Tem uma trajetória marcada pelo compromisso com a causa animal, o bem-estar da população, a educação e a defesa do meio ambiente. Formado em medicina veterinária pela Universidade Federal de Mato Grosso, assessorou ao longo de sua carreira diversos parlamentares na criação de leis em prol dos direitos dos animais, mostrando sua dedicação para transformar essa causa em prioridade nas pautas legislativas.
Sua entrada na política foi inspirada em seu irmão, Delegado Bruno Lima, a quem auxiliou em resgates e iniciativas de proteção animal; Dr. Murillo trouxe para a vida pública suas experiência e conhecimento em defesa dos direitos animais. Ele continua e continuará empenhado em promover mudanças significativas, atuando para garantir um futuro mais justo e consciente, não apenas para os animais, mas para toda a sociedade e o meio ambiente.
        </p>
           </div>
</div>
    `
        ;
    return DashboardLayout({ children: content });
}
