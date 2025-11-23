import { DashboardLayout } from "../../layout/dashboard.js";
import { HomeNoticiasPage } from "./home-noticias-page.js";

export function HomePage(usuarioFake = "usuario@teste.com") {
  const chaveUsuario = `visitouHome_${usuarioFake}`;
  const visitouAntes = localStorage.getItem(chaveUsuario);

  if (visitouAntes) {
    window.location.hash = "#/noticias";
    return HomeNoticiasPage();
  } else {
    localStorage.setItem(chaveUsuario, "true");
  }

  if (!document.getElementById('home-css')) {
    const style = document.createElement('style');
    style.id = 'home-css';
    style.textContent = `
      .conteudo-home { padding: 16px; }

      /* BOAS-VINDAS */
      .boas-vindas {
        margin: 0px 0;
        padding: 16px;
        text-align: center;
        display: grid;
        gap: 20px;
        background-color: #efefef;
      }

      .boas-vindas h1 {
        margin-top: 0; /* removido margin-top */
        font-size: 1.4em;
        font-weight: bold;
        color: #004A8F;
      }

      /* BARRA DE PESQUISA */
      .barra-pesquisa-section {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        padding: 0 12px;
      }

      .barra-pesquisa-container {
        position: relative;
        width: 100%;
        max-width: 260px;
      }

      .barra-pesquisa {
        width: 100%;
        padding: 8px 36px 8px 16px; /* espaço à direita para o ícone */
        border: none;
        border-radius: 16px;
        background-color: rgba(196, 196, 196, 0.43);
      }

      .barra-pesquisa::placeholder {
        color: rgba(40, 40, 54, 0.25);
        opacity: 1;
      }

      .icon-lupa {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 18px;
        pointer-events: none;
      }

      .secao-interesse { 
      padding: 20px 18px; text-align: center; 
      }

      .titulo-interesse { 
      font-size: 20px; font-weight: 700; color: var(--cor-primaria); margin-bottom: 20px; 
      }
      .lista-interesse {
       list-style: none; padding: 0; margin: 0; display: grid; gap: 12px; justify-items: center; 
       }
      .card-interesse { display: grid; grid-template-columns: 70px auto; gap: 10px; align-items: center; padding: 12px; border-radius: 12px; background-color: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.08); width: 100%; max-width: 400px; }
      .foto-interesse { width: 80px; height: 80px; border-radius: 50%; object-fit: cover; }
      .info-interesse { text-align: left; padding-left: 8px; }
      .nome-interesse { font-size: 16px; font-weight: 700; margin-bottom: 2px; color: #004A8F; }
      .cargo-interesse {
       font-size: 14px; color: #4a4a4a; margin-bottom: 4px; 
       }
      .descricao-interesse { font-size: 14px; color: #777; }
      .botao-ver-mais { margin: 20px auto 0; display: block; background: #0356c26b; border: none; padding: 10px 26px; font-size: 16px; font-weight: bold; border-radius: 32px; cursor: pointer; box-shadow: #4a4a4a98 0px 2px 4px -1px; }
      .botao-ver-mais span { color: #00438B; font-weight: 800; }
    `;
    document.head.appendChild(style);
  }

  const content = document.createElement('div');
  content.classList.add("pagina-home");

  content.innerHTML = `
    <main class="conteudo-home">

      <!-- BOAS-VINDAS -->
      <section class="boas-vindas">
        <h1 class="titulo-boas-vindas">Bem-vinda, Letícia.</h1>
        <p class="texto-boas-vindas">
          Acompanhe notícias do candidato de sua preferência em tempo real.
        </p>
      </section>

      <!-- BARRA DE PESQUISA -->
      <section class="barra-pesquisa-section">
        <div class="barra-pesquisa-container">
          <input class="barra-pesquisa" type="text" placeholder="Pesquise o candidato(a)..."/>
          <img class="icon-lupa" src="./assets/home-despesas/image 1.png" alt="Pesquisar" />
        </div>
      </section>

      <!-- LISTA DE INTERESSE -->
      <section class="secao-interesse">
        <h3 class="titulo-interesse">Veja possíveis candidatos do seu interesse</h3>
        <ul class="lista-interesse">
          <li class="card-interesse">
            <img src="./assets/home-despesas/Ellipse 11 (1).png" alt="Candidato" class="foto-interesse" />
            <div class="info-interesse">
              <p class="nome-interesse">Luiz Inácio Lula da Silva</p>
              <p class="cargo-interesse">Presidente do Brasil - PT</p>
              <p class="descricao-interesse">Breve descrição do candidato.</p>
            </div>
          </li>
          <li class="card-interesse">
            <img src="./assets/home-despesas/Ellipse 11 (4).png" alt="Candidato" class="foto-interesse" />
            <div class="info-interesse">
              <p class="nome-interesse">Marina Silva</p>
              <p class="cargo-interesse">Ministra do Meio Ambiente</p>
              <p class="descricao-interesse">Breve descrição do candidato.</p>
            </div>
          </li>
          <li class="card-interesse">
            <img src="./assets/home-despesas/Ellipse 11 (5).png" alt="Candidato" class="foto-interesse" />
            <div class="info-interesse">
              <p class="nome-interesse">Tarcísio de Freitas</p>
              <p class="cargo-interesse">Governador de SP</p>
              <p class="descricao-interesse">Breve descrição do candidato.</p>
            </div>
          </li>
          <li class="card-interesse">
            <img src="./assets/home-despesas/Ellipse 11 (6).png" alt="Candidato" class="foto-interesse" />
            <div class="info-interesse">
              <p class="nome-interesse">Vahan Agopyan</p>
              <p class="cargo-interesse">Secretário de Estado</p>
              <p class="descricao-interesse">Breve descrição do candidato.</p>
            </div>
          </li>
        </ul>

        <button class="botao-ver-mais"><span>Ver mais</span></button>
      </section>

    </main>
  `;

  return DashboardLayout({
    title: "Home",
    children: content
  });
}
