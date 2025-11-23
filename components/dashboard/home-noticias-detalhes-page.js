import { DashboardLayout } from "../../layout/dashboard.js";

export function HomeNoticiasDetalhesPage() {
  // Cria o container principal da página
  const content = document.createElement('div');
  content.classList.add("pagina-noticias-detalhes");

  // Adiciona o CSS específico da página, se ainda não estiver carregado
  if (!document.getElementById('home-detalhe-css')) {
    const style = document.createElement('style');
    style.id = 'home-detalhe-css';
    style.textContent = `
      /* BASE (MOBILE FIRST) */
      html, body {
        overflow-x: hidden;
        width: 100%;
        max-width: 100%;
      }

      /* Botão voltar */
      .botao-voltar {
        background: none;
        border: none;
      }

      /* Imagem da notícia */
      .imagem-noticia img {
        width: 100%;
        max-width: 100%;
        display: block;
        object-fit: cover;
        margin-top: 48px;
      }

      /* Informações — data, autor, etc */
      .informacoes {
        font-size: 10px;
        color: #828282;
        margin: 4px 0 24px 16px;
      }

      /* Texto da notícia */
      .texto-noticia {
        font-size: 13.5px;
        line-height: 1.6;
        text-align: justify;
        margin: 0 auto 22px;
        width: 85%;
        max-width: 85%;
      }

      /* Título */
      .titulo-noticia {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 24px;
        line-height: 1.3;
        text-align: center;
        color: #004A8F; /* Cor do título */
      }

      /* Subtítulo */
      .subtitulo-noticia {
        font-size: 13px;
        color: #555;
        margin-bottom: 12px;
        line-height: 1.4;
        width: 85%;
        margin-left: auto;
        margin-right: auto;
      }

      /* BOTÃO VER MAIS */
      .botao-ver-mais {
        margin: 20px auto 34px;
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

      .botao-ver-mais span {
        color: #00438B;
        font-weight: 800;
      }

      .botao-ver-mais:hover {
        opacity: .8;
      }

      /* TABLET (≥ 768px) */
      @media (min-width: 768px) {
        .titulo-noticia {
          font-size: 20px;
          margin-bottom: 20px;
        }
        .subtitulo-noticia {
          font-size: 15px;
          width: 75%;
        }
        .texto-noticia {
          font-size: 15px;
          width: 75%;
          max-width: 800px;
        }
        .informacoes {
          font-size: 12px;
          margin-left: 32px;
        }
        .imagem-noticia img {
          margin-top: 32px;
        }
        .botao-ver-mais {
          padding: 10px 32px;
          font-size: 17px;
        }
      }

      /* DESKTOP (≥ 1024px) */
      @media (min-width: 1024px) {
        .titulo-noticia {
          font-size: 24px;
          width: 70%;
          margin: 24px auto;
        }
        .subtitulo-noticia {
          width: 70%;
          font-size: 16px;
        }
        .texto-noticia {
          width: 60%;
          max-width: 900px;
          font-size: 16px;
          line-height: 1.7;
        }
        .informacoes {
          font-size: 13px;
          margin-left: 20%;
        }
        .imagem-noticia img {
          max-width: 900px;
          margin: 40px auto 0;
          display: block;
          border-radius: 8px;
        }
        .botao-ver-mais {
          padding: 12px 40px;
          font-size: 18px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Injeta o HTML da página
  content.innerHTML = `
    <nav class="menu">
      <a href="#/noticias" class="botao-voltar">
        <img src="./assets/home-despesas/chevron-left.png" alt="voltar" class="menu-img" />
      </a>
    </nav>

    <main class="conteudo-detalhe-noticia">
      <figure class="imagem-noticia">
        <img src="./assets/home-despesas/image 2.png" alt="Imagem da notícia" />
      </figure>

      <div class="informacoes">
        <p>Categoria: Meio Ambiente</p>
        <p>Candidato: Marina Silva</p>
      </div>

      <section class="texto-noticia">
        <h1 class="titulo-noticia">
          Marina Silva detalha vetos no PL do licenciamento ambiental no Bom
          Dia, Ministra desta quinta (14)
        </h1>

        <article class="corpo-noticia">
          <p>
            A ministra do Meio Ambiente e Mudança do Clima, Marina Silva, é a
            convidada do “Bom Dia, Ministra” desta quinta-feira, 14 de agosto.
            Durante a conversa com jornalistas de todo o Brasil, ela detalhará
            os 63 vetos do presidente Luiz Inácio Lula da Silva e as
            modificações feitas pelo Executivo no Projeto de Lei nº
            2.159/2021, que institui a Lei Geral do Licenciamento Ambiental.
          </p>
          <p>
            Essas mudanças, anunciadas na última semana, foram feitas a partir
            de avaliações técnicas e jurídicas de diversos órgãos do Poder
            Executivo, um trabalho conjunto que incluiu, além do MMA, a Casa
            Civil e a Secretaria de Relações Institucionais. O projeto foi
            publicado no Diário Oficial na semana passada e segue para a
            aprovação do Congresso Nacional, com urgência constitucional.
          </p>
        </article>
      </section>

      <button class="botao-ver-mais"><span>Saiba mais</span></button>
    </main>
  `;

  // Retorna o layout do dashboard com o conteúdo da página
  return DashboardLayout({
    title: "Notícias - Detalhes",
    children: content
  });
}
