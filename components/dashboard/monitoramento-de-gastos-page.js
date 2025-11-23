import { DashboardLayout } from "../../layout/dashboard.js";
import "../layout/monitoramento-gastos.css";

export function MonitoramentoDeGastos() {
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
        <img src="assets/imgs/Gráfico pizza.png" alt="" class="grafico-pizza" />
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
        <button>
          <a href="#/historico" class="btn">Ver histórico mensal</a>
        </button>
      </section>
    </main>
  `;

  // Retorna o layout do dashboard com o conteúdo da página
  return DashboardLayout({
    title: "Monitoramento de Gastos",
    children: content
  });
}
