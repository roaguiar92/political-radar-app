import { DashboardLayout } from "../../layout/dashboard.js";
import "../layout/historico.css";

export function HistoricoPage() {
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
          <select>
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
        <img src="assets/imgs/Gráfico Barras.png" alt="Gráfico de Gastos" />
      </section>

      <section class="lista-gastos">
        <h3>Gastos de Março</h3>

        <article class="item-gasto">
          <div class="descricao-gasto">
            <p class="tipo-despesa">Manutenção de Escritório</p>
            <p class="data-gasto">Data: 15/03/2025</p>
            <p class="valor-gasto">R$ 500,00</p>
          </div>
          <a href="#/detalhes" class="botao-detalhes">Ver detalhes</a>
        </article>

        <article class="item-gasto">
          <div class="descricao-gasto">
            <p class="tipo-despesa">Manutenção de Escritório</p>
            <p class="data-gasto">Data: 15/03/2025</p>
            <p class="valor-gasto">R$ 800,00</p>
          </div>
          <a href="#/detalhes" class="botao-detalhes">Ver detalhes</a>
        </article>

        <a href="#/historico-mais" class="botao-ver-mais">Ver mais</a>
      </section>

    </main>
  `;

  // Retorna o layout do dashboard com o conteúdo injetado
  return DashboardLayout({
    title: "Histórico de Gastos",
    children: content
  });
}
