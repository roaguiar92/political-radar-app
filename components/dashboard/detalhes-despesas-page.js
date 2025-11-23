import { DashboardLayout } from "../../layout/dashboard.js";

export function DetalhesDespesasPage() {
  // Carrega o CSS específico da página se ainda não estiver carregado
  if (!document.getElementById('detalhes-css')) {
    const style = document.createElement('style');
    style.id = 'detalhes-css';
    style.textContent = `
      /* BASE (MOBILE FIRST) */
      .titulo-secao {
        margin-top: 0px;
        text-align: center;
        font-size: 1.4rem;
        font-weight: bold;
        color: #243343;
      }

      .conteudo-detalhes {
        padding: 20px;
        display: grid;
        gap: 20px;
        justify-items: center;
      }

      h1 {
        color: #243343;
        font-size: 1.4rem;
        font-weight: bold;
        text-align: center;
        margin-top: 48px;
      }

      /* BLOCO 1 */
      .linha-info {
        margin: 24px 0 32px 0;
        width: 100%;
        max-width: 500px;
      }

      .linha-info p {
        margin-bottom: 12px;
      }

      .linha-info span {
        color: #243343;
        font-weight: bold;
      }

      /* BLOCO 2 (borda verde) */
      .linha-info-2 {
        padding: 12px 10px;
        border-radius: 8px;
        border: 1px solid #2F6A6E;
        width: 100%;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        position: relative;
      }

      .linha-info-2 p {
        margin-bottom: 12px;
      }

      .linha-info-2 span {
        color: #243343;
        font-weight: bold;
      }

      /* ÍCONE PDF */
      .icon-pdf {
        display: flex;
        justify-content: flex-end; /* alinha à direita */
        align-items: center;
        gap: 8px;
        margin-top: 12px;
      }

      .icon-pdf img {
        width: 40px;
      }

      .botao-baixar-nf {
        color: #004A8F;
        font-weight: bold;
        text-decoration: none;
      }

      /* Links */
      .linha-info-2 a {
        text-decoration: none;
        color: inherit;
      }

      /* TABLET (≥ 768px) */
      @media (min-width: 768px) {
        .conteudo-detalhes {
          max-width: 800px;
          margin: auto;
          gap: 28px;
        }

        h1 {
          font-size: 1.8rem;
          margin-top: 32px;
        }

        .linha-info p,
        .linha-info-2 p {
          font-size: 1.1rem;
        }

        .linha-info-2 {
          padding: 16px 14px;
        }

        .icon-pdf img {
          width: 48px;
        }
      }

      /* DESKTOP (≥ 1024px) */
      @media (min-width: 1024px) {
        .conteudo-detalhes {
          max-width: 1100px;
        }

        .linha-info,
        .linha-info-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          font-size: 1.1rem;
        }

        .icon-pdf {
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          gap: 12px;
          grid-column: 1 / -1; /* ocupa toda a largura do grid */
        }

        .icon-pdf img {
          width: 52px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Cria o container principal da página
  const content = document.createElement('div');
  content.classList.add("pagina-detalhes-despesas");

  // Injeta o HTML da página
  content.innerHTML = `
  <nav class="menu">
      <a href="#/historico" class="botao-voltar">
        <img src="./assets/home-despesas/chevron-left.png" alt="voltar" class="menu-img" />
      </a>
    </nav>

    <h1 class="titulo-secao">Detalhes da Despesa</h1>

    <main class="conteudo-detalhes">

      <section class="bloco-informacoes">

        <div class="linha-info">
          <p class="rotulo"><span>Tipo de Despesa:</span> Manutenção de Escritório</p>
          <p class="valor"><span>Deputado:</span> Parlamentar</p>
          <p class="rotulo"><span>Mês/Ano:</span> Março/2025</p>
        </div>

        <div class="linha-info-2">
          <p class="rotulo"><span>Fornecedor:</span> ATTBRASIL SOLUÇÕES EM INFORMÁTICA LTDA-EPP</p>
          <p class="rotulo"><span>CNPJ:</span> 01.309.168/0001-99</p>
          <p class="rotulo"><span>Número do Documento:</span> 130503</p>
          <p class="rotulo"><span>Data de Emissão:</span> 01/03/2025</p>
          <p class="rotulo"><span>Valor da Despesa:</span> R$ 1.583,00 </p>
          <p class="rotulo"><span>Reembolso:</span> R$ 0,00</p>

          <!-- Ícone PDF sempre ao final, alinhado à direita -->
          <div class="icon-pdf">
            <img src="./assets/home-despesas/Pdf.png" alt="PDF">
            <a href="#" class="botao-baixar-nf">Baixar NF</a>
          </div>
        </div>

      </section>

    </main>
  `;

  // Retorna o layout do dashboard com o conteúdo injetado
  return DashboardLayout({
    title: "Detalhes da Despesa",
    children: content
  });
}
