import { DashboardLayout } from "../../layout/dashboard.js";
import "../layout/home-noticias.css";

export function HomeNoticiasDetalhesPage() {
  // Cria o container principal da página
  const content = document.createElement('div');
  content.classList.add("pagina-noticias-detalhes");

  // Injeta o HTML da página
  content.innerHTML = `
    <main class="conteudo-noticias">

      <!-- NOTÍCIAS DA SEMANA -->
      <section class="secao-noticias">
        <h1 class="titulo-secao">Notícias da semana</h1>

        <div class="banner-noticia">
          <img src="assets/imgs/image2.png" alt="Notícia" />
        </div>

        <button class="botao-ver-mais">
          <a href="#/detalhe-noticia">Ver mais</a>
        </button>
      </section>

      <!-- SEGUIDOS POR VOCÊ -->
      <section class="secao-seguindo">
        <h2 class="titulo-secao">Seguidos por você</h2>

        <ul class="lista-seguindo">
          <li class="item-seguindo">
            <img src="assets/imgs/Ellipse 11 (1).png" alt="foto" />
            <p>Lula</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/Ellipse 11 (4).png" alt="foto" />
            <p>Marina</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/Ellipse 11 (5).png" alt="foto" />
            <p>Tarcísio</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/Ellipse 11 (7).png" alt="foto" />
            <p>Ricardo</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/Ellipse 11 (9).png" alt="foto" />
            <p>Paula</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/Ellipse 11 (8).png" alt="foto" />
            <p>Murillo</p>
          </li>
        </ul>
      </section>

    </main>
  `;

  // Retorna o layout do dashboard com o conteúdo da página
  return DashboardLayout({
    title: "Notícias",
    children: content
  });
}
