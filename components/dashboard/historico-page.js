import { DashboardLayout } from "../../layout/dashboard.js";
import { inicializarHistorico } from "../../api/services/despesas/resgate-despesas.js";

export function HistoricoPage() {
  // Carrega o CSS específico da página se ainda não estiver carregado
  if (!document.getElementById('historico-css')) {
    const style = document.createElement('style');
    style.id = 'historico-css';
    style.textContent = `
      /* ESTILO BASE (MOBILE) */
      .conteudo-historico {
        padding: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }

      .secao-historico { text-align: center; }
      .secao-historico .titulo-secao {
        color: #243343;
        font-size: 1.4rem;
        font-weight: bold;
      }
      .secao-historico .nome-representante {
        color: #243343;
        font-weight: 600;
        margin-top: 8px;
      }

      /* FILTROS COM BORDA */
    .filtros-historico {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      padding: 12px 16px;
      border: 2px solid #004A8F; /* borda mais visível */
      border-radius: 10px;
      background-color: #ffffff;
    }

    .filtros-historico label {
      display: flex;
      gap: 6px;
      align-items: center;
      font-size: 14px;
      color: #004A8F; /* mesmo azul do título */
      font-weight: bold;
    }

    .filtros-historico select {
      padding: 7px 10px;
      border-radius: 6px;
      border: 1px solid #004A8F; /* borda visível nos selects */
      background: #ffffff;
      color: #004A8F; /* texto azul para combinar com o título */
      font-size: 14px;
      cursor: pointer;
      min-width: 110px;
    }

      /* GRÁFICO CENTRALIZADO */
      .grafico {
        display: flex;
        justify-content: center;
        margin-top: 20px;
      }

      .grafico img {
        width: 100%;
        max-width: 450px;
        height: auto;
        display: block;
      }

      /* LISTA DE GASTOS EM COLUNA */
      .lista-gastos {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        width: 100%;
        max-width: 500px;
      }

      .lista-gastos h3 {
        text-align: center;
        font-size: 1.2rem;
        color: #243343;
        font-weight: bold;
        margin-bottom: 12px;
      }

      .item-gasto {
        width: 100%;
        border: 1px solid #cfd8dc;
        border-radius: 10px;
        padding: 14px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        background: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      }

      .descricao-gasto {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .tipo-despesa {
        font-size: 15px;
        font-weight: 600;
        color: #243343;
      }

      .data-gasto {
        font-size: 14px;
        color: #546e7a;
      }

      .valor-gasto {
        font-size: 16px;
        font-weight: 700;
        color: #243343;
        margin-top: 8px;
      }

      .botao-detalhes {
        font-size: 14px;
        font-weight: 600;
        color: #004A8F;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .botao-detalhes::after {
        content: "›";
        font-size: 18px;
        color: #004A8F;
      }

      /* BOTÃO VER MAIS CENTRALIZADO */
      .botao-ver-mais {
        display: block;
        margin: 20px auto 0 auto;
        padding: 10px 20px;
        color: #243343;
        text-decoration: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
      }

      /* SEM DADOS */
      .caixa-alerta {
        text-align: center;
        margin-top: 32px;
      }

      .caixa-alerta h1 {
        font-weight: bold;
        color: #243343;
        font-size: 1.3em;
        margin-bottom: 32px;
      }

      .texto-alerta {
        padding: 16px;
        border-radius: 8px;
        background-color: #94000232;
        line-height: 1.8;
      }

      /* TABLETS */
      @media (min-width: 600px) {
        .item-gasto { padding: 18px; }
        .descricao-gasto { gap: 6px; }
      }

      /* DESKTOP */
      @media (min-width: 900px) {
      .conteudo-historico {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }

      h2 {
      margin-bottom: 16px;}

      .secao-historico .titulo-secao {
        color: #243343;
        font-size: 1.4rem;
        font-weight: bold;
      }
      .secao-historico .nome-representante {
        color: #243343;
        font-weight: 600;
        margin-top: 0px;
        margin-bottom: 8px; 
      }
        .grafico img { max-width: 600px; }
        .item-gasto { padding: 20px; }
        .valor-gasto { font-size: 18px; }
      }

      /* WIDE */
      @media (min-width: 1300px) {
        .conteudo-historico { padding: 40px 120px; max-width: 1400px; margin: 0 auto; }
        .grafico img { max-width: 750px; }
      }
    `;
    document.head.appendChild(style);
  }

  // Cria o container principal da página
  const content = document.createElement('div');
  content.classList.add("pagina-historico");

  // Injeta o HTML da página
  content.innerHTML = `
    <main class="conteudo-historico">
      <section class="secao-historico">
        <h2 class="titulo-secao">Histórico de Gastos</h2>
        <p class="nome-representante">Nome do Parlamentar</p>
      </section>

      <form class="filtros-historico">
        <label>
          Ano
          <select id="selectAno">
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </label>

        <label>
          Mês
          <select id="selectMes">
            <option>Janeiro</option>
            <option>Fevereiro</option>
            <option>Março</option>
            <option>Abril</option>
            <option>Maio</option>
            <option>Junho</option>
            <option>Julho</option>
            <option>Agosto</option>
            <option>Setembro</option>
            <option>Outubro</option>
            <option>Novembro</option>
            <option>Dezembro</option>
          </select>
        </label>
      </form>

      <section class="grafico">
        <img src="./assets/home-despesas/Gráfico Barras.png" alt="Gráfico de Gastos" />
      </section>

      <section class="lista-gastos">
        <h3>Gastos de Março</h3>

        <article class="item-gasto">
          <div class="descricao-gasto">
            <p class="tipo-despesa">Manutenção de Escritório</p>
            <p class="data-gasto">Data: 15/03/2025</p>
            <p class="valor-gasto">R$ 500,00</p>
          </div>
          <a href="#/detalhes-despesas" class="botao-detalhes">Ver detalhes</a>
        </article>

        <article class="item-gasto">
          <div class="descricao-gasto">
            <p class="tipo-despesa">Manutenção de Escritório</p>
            <p class="data-gasto">Data: 15/03/2025</p>
            <p class="valor-gasto">R$ 800,00</p>
          </div>
          <a href="#/detalhes-despesas" class="botao-detalhes">Ver detalhes</a>
        </article>

        <a href="#/historico-mais" class="botao-ver-mais">Ver mais</a>
      </section>
    </main>
  `;

    inicializarHistorico(content);

  return DashboardLayout({
    title: "Histórico de Gastos",
    children: content
  });
}
