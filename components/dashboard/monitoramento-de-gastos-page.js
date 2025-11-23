import { DashboardLayout } from "../../layout/dashboard.js";

export function MonitoramentoDeGastos() {
  // Carrega o CSS específico da página se ainda não estiver carregado
  if (!document.getElementById('monitoramento-css')) {
    const style = document.createElement('style');
    style.id = 'monitoramento-css';
    style.textContent = `
      /* BASE (MOBILE FIRST) */
      .conteudo-dashboard { padding: 16px; display: grid; gap: 16px; justify-items: center; }
      .secao-titulo { margin-top: 24px; text-align: center; }
      .secao-titulo .titulo-pagina { color: #243343; font-size: 1.4rem; font-weight: bold; }
      .secao-titulo .nome-representante { color: #243343; font-weight: 600; margin-top: 16px; }

      /* VALOR TOTAL */
      .secao-valor-total { margin-top: 32px; text-align: center; }
      .secao-valor-total .valor-total { font-weight: bold; font-size: 1.3rem; }
      .secao-valor-total .descricao-total { margin-top: 12px; font-size: 1rem; }

      /* GRÁFICO */
      .secao-grafico { display: flex; justify-content: center; margin-top: 24px; }
      .secao-grafico img { max-width: 100%; height: auto; display: block; }

      /* LEGENDA */
      .legenda-gastos { margin: 16px auto; max-width: 300px; text-align: left; }
      .legenda-gastos ul { list-style: none; padding: 0; margin: 0; }
      .legenda-gastos li { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; font-size: 16px; color: #243343; }
      .cor { width: 20px; height: 20px; border-radius: 50%; display: inline-block; }
      .cor-gabinete { background-color: #1d3557; }
      .cor-viagens { background-color: #6c7a89; }
      .cor-combustivel { background-color: #457b9d; }
      .cor-hospedagem { background-color: #a8dadc; }
      .cor-outras { background-color: #52796f; }

      /* BOTÃO HISTÓRICO */
      .botao-historico { margin-top: 24px; text-align: center; }
      .botao-historico .btn {
        background: #243343;
        color: #fff;
        text-decoration: none;
        padding: 12px 50px;
        border-radius: 12px;
        font-size: 16px;
        display: inline-block;
        box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .botao-historico .btn:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 14px rgba(0,0,0,0.18);
      }

      /* TABLET (≥ 768px) */
      @media (min-width: 768px) {
        .secao-titulo .titulo-pagina { font-size: 1.8rem; }
        .secao-titulo .nome-representante { font-size: 1.2rem; }
        .secao-valor-total .valor-total { font-size: 1.6rem; }
        .legenda-gastos li { font-size: 17px; }
        .botao-historico .btn { font-size: 18px; padding: 12px 60px; }
      }

      /* DESKTOP (≥ 1024px) */
      @media (min-width: 1024px) {
        .secao-valor-total .valor-total { font-size: 1.8rem; }
        .legenda-gastos ul { font-size: 18px; }
        .secao-grafico { margin-top: 40px; }
      }
    `;
    document.head.appendChild(style);
  }

  // Cria o container principal da página
  const content = document.createElement('div');
  content.classList.add("pagina-monitoramento-gastos");

  // Injeta o HTML da página
  content.innerHTML = `
    <main class="conteudo-dashboard">
      <section class="secao-titulo">
        <h1 class="titulo-pagina">Monitoramento de Gastos</h1>
        <h2 class="nome-representante">Nome do Parlamentar</h2>
      </section>

      <section class="secao-valor-total">
        <p class="valor-total">R$ 1.231.982,00</p>
        <p class="descricao-total">Total de gastos em 2025</p>
      </section>

      <section class="secao-grafico">
        <img src="./assets/home-despesas/Gráfico pizza.png" alt="Gráfico de gastos" />
      </section>

      <section class="legenda-gastos">
        <ul>
          <li><span class="cor cor-gabinete"></span> Verbas de Gabinete</li>
          <li><span class="cor cor-viagens"></span> Viagens</li>
          <li><span class="cor cor-combustivel"></span> Combustíveis</li>
          <li><span class="cor cor-hospedagem"></span> Hospedagem</li>
          <li><span class="cor cor-outras"></span> Outras</li>
        </ul>
      </section>

      <section class="botao-historico">
        <a href="#/historico" class="btn">Ver histórico mensal</a>
      </section>
    </main>
  `;

  // Retorna o layout do dashboard com o conteúdo da página
  return DashboardLayout({
    title: "Monitoramento de Gastos",
    children: content
  });
}
