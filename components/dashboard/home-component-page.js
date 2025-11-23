import { DashboardLayout } from "../../layout/dashboard.js";
import "../layout/home.css";

export function HomePage() {
  // Cria o container principal da página
  const content = document.createElement('div');
  content.classList.add("pagina-home");

  // Injeta o HTML da página
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
        <div>
          <input
            class="barra-pesquisa"
            type="text"
            placeholder="Pesquise o candidato(a)..."
          />
          <img class="icon-lupa" src="assets/icons/image 1.png" alt="Pesquisar" />
        </div>
      </section>

      <!-- LISTA DE INTERESSE -->
      <section class="secao-interesse">
        <h3 class="titulo-interesse">Veja possíveis candidatos do seu interesse</h3>

        <ul class="lista-interesse">

          <li class="card-interesse">
            <img src="assets/imgs/Ellipse 11 (1).png" alt="Candidato" class="foto-interesse" />
            <div class="info-interesse">
              <p class="nome-interesse">Luiz Inácio Lula da Silva</p>
              <p class="cargo-interesse">Presidente do Brasil - PT</p>
              <p class="descricao-interesse">Breve descrição do candidato.</p>
            </div>
          </li>

          <li class="card-interesse">
            <img src="assets/imgs/Ellipse 11 (4).png" alt="Candidato" class="foto-interesse" />
            <div class="info-interesse">
              <p class="nome-interesse">Marina Silva</p>
              <p class="cargo-interesse">Ministra do Meio Ambiente</p>
              <p class="descricao-interesse">Breve descrição do candidato.</p>
            </div>
          </li>

          <li class="card-interesse">
            <img src="assets/imgs/Ellipse 11 (5).png" alt="Candidato" class="foto-interesse" />
            <div class="info-interesse">
              <p class="nome-interesse">Tarcísio de Freitas</p>
              <p class="cargo-interesse">Governador de SP</p>
              <p class="descricao-interesse">Breve descrição do candidato.</p>
            </div>
          </li>

          <li class="card-interesse">
            <img src="assets/imgs/Ellipse 11 (6).png" alt="Candidato" class="foto-interesse" />
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

  // Retorna o layout do dashboard com o conteúdo da página
  return DashboardLayout({
    title: "Home",
    children: content
  });
}
