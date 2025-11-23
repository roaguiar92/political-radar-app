import { DashboardLayout } from "../../layout/dashboard.js";
import "../../layout/detalhes-noticias.css"; // Corrigido o caminho do CSS

export function HomeNoticiasPage() {
  // Cria o container principal da página
  const content = document.createElement('div');
  content.classList.add("pagina-noticias");

  // Injeta o HTML da página
  content.innerHTML = `
    <main class="conteudo-noticias">

      <!-- NOTÍCIAS DA SEMANA -->
      <section class="secao-noticias">
        <h1 class="titulo-secao">Notícias da semana</h1>

        <div class="banner-noticia">
          <img src="assets/imgs/image2.png" alt="Notícia"/>
        </div>

        <button class="botao-ver-mais">
          <a href="#/noticias/detalhes">Ver mais</a>
        </button>
      </section>

      <!-- SEGUIDOS POR VOCÊ -->
      <section class="secao-seguindo">
        <h2 class="titulo-secao">Seguidos por você</h2>

        <ul class="lista-seguindo">
          <li class="item-seguindo">
            <img src="assets/imgs/lula.png" alt="foto" />
            <p>Lula</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/marina.png" alt="foto" />
            <p>Marina</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/tarcisio.png" alt="foto" />
            <p>Tarcísio</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/ricardo.png" alt="foto" />
            <p>Ricardo</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/paula.png" alt="foto" />
            <p>Paula</p>
          </li>

          <li class="item-seguindo">
            <img src="assets/imgs/murillo.png" alt="foto" />
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
