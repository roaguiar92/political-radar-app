import { DashboardLayout } from "../../layout/dashboard.js";

export function HomeNoticiasPage() {
  // Carrega o CSS específico da página se ainda não estiver carregado
  if (!document.getElementById('home-noticias-css')) {
    const style = document.createElement('style');
    style.id = 'home-noticias-css';
    style.textContent = `
      /* MOBILE FIRST (padrão) */
      .secao-noticias { margin-top: 78px; }

      .conteudo-noticias {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 40px;
      }

      .titulo-secao {
        font-size: 1.3rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 16px;
        color: #004A8F; /* Cor dos títulos */
      }

      .banner-noticia {
        margin-top: 32px;
      }

      .banner-noticia img {
        width: 100%;
        border-radius: 6px;
        box-shadow: var(--sombra-suave);
      }

      .botao-ver-mais {
        margin: 20px auto 0;
        display: block;
        background: #0356c26b;
        border: none;
        padding: 8px 24px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 32px;
        cursor: pointer;
        box-shadow: #4a4a4a98 0px 2px 4px -1px;
      }

      .botao-ver-mais a {
        color: #00438B;
        font-weight: 800;
        text-decoration: none;
      }

      .botao-ver-mais:hover { opacity: 0.8; }

      .secao-seguindo {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .lista-seguindo {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
        justify-items: center;
      }

      .item-seguindo {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .item-seguindo img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }

      .item-seguindo p {
        margin-top: 6px;
        font-size: 0.9rem;
        font-weight: 600;
        color: #004A8F; /* Cor dos nomes dos seguidos */
      }

      @media (min-width: 768px) {
        .conteudo-noticias { padding: 32px; gap: 48px; }
        .titulo-secao { font-size: 1.6rem; margin-bottom: 20px; }
        .banner-noticia img { max-width: 90%; margin: 0 auto; display: block; }
        .lista-seguindo { grid-template-columns: repeat(4, 1fr); gap: 28px; }
        .item-seguindo img { width: 110px; height: 110px; }
        .item-seguindo p { font-size: 1rem; }
        .botao-ver-mais { font-size: 17px; padding: 10px 32px; }
      }

      @media (min-width: 1024px) {
      .secao-noticias { 
        margin-top: 0px; 
      }

      .conteudo-noticias {
        padding: 0px;
        display: flex;
        flex-direction: column;
        gap: 40px;
      }

        .conteudo-noticias {
          width: 80%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .titulo-secao { font-size: 1.8rem; }
        .banner-noticia { display: flex; justify-content: center; }
        .banner-noticia img { max-width: 800px; }
        .lista-seguindo { grid-template-columns: repeat(6, 1fr); gap: 32px; }
        .item-seguindo img { width: 120px; height: 120px; }
        .item-seguindo p { font-size: 1.05rem; }
        .botao-ver-mais { padding: 12px 40px; font-size: 18px; }
      }
    `;
    document.head.appendChild(style);
  }

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
          <img src="./assets/home-despesas/image 2.png" alt="Notícia" />
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
            <img src="./assets/home-despesas/Ellipse 11 (1).png" alt="foto" />
            <p>Lula</p>
          </li>

          <li class="item-seguindo">
            <img src="./assets/home-despesas/Ellipse 11 (4).png" alt="foto" />
            <p>Marina</p>
          </li>

          <li class="item-seguindo">
            <img src="./assets/home-despesas/Ellipse 11 (5).png" alt="foto" />
            <p>Tarcísio</p>
          </li>

          <li class="item-seguindo">
            <img src="./assets/home-despesas/Ellipse 11 (7).png" alt="foto" />
            <p>Ricardo</p>
          </li>

          <li class="item-seguindo">
            <img src="./assets/home-despesas/Ellipse 11 (9).png" alt="foto" />
            <p>Paula</p>
          </li>

          <li class="item-seguindo">
            <img src="./assets/home-despesas/Ellipse 11 (8).png" alt="foto" />
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
