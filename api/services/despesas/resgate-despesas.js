const API_URL = "https://radar-politico-api.onrender.com/api/v1/gastos/top";

const selectAno = document.querySelector(".filtros-historico label:nth-child(1) select");
const selectMes = document.querySelector(".filtros-historico label:nth-child(2) select");
const listaGastos = document.querySelector(".lista-gastos");

// Mapa dos meses para número
const mapaMeses = {
  Janeiro: 1, Fevereiro: 2, Março: 3, Abril: 4, Maio: 5, Junho: 6,
  Julho: 7, Agosto: 8, Setembro: 9, Outubro: 10, Novembro: 11, Dezembro: 12
};

selectAno.addEventListener("change", carregarGastos);
selectMes.addEventListener("change", carregarGastos);

async function carregarGastos() {
  const ano = selectAno.value;
  const mesNome = selectMes.value;
  const mes = mapaMeses[mesNome];

  if (!ano) return;

  listaGastos.innerHTML = `<p style="text-align:center;">Carregando...</p>`;

  try {
    // Novo endpoint aplicado aqui
    const response = await fetch(`${API_URL}?ano=${ano}&limite=10`);

    if (!response.ok) {
      throw new Error("Erro na resposta da API");
    }

    const data = await response.json();

    console.log("Resposta da API:", data);

    // O novo endpoint retorna um array diretamente (top gastos)
    const despesas = data || [];

    // Filtra pelo mês selecionado
    const despesasFiltradas = despesas.filter(d => d.mes === mes);

    if (despesasFiltradas.length === 0) {
      return renderizarSemDados(mesNome);
    }

    renderizarGastos(despesasFiltradas, mesNome);

  } catch (error) {
    console.error(error);
    renderizarSemDados(mesNome);
  }
}

function renderizarSemDados(mesNome) {
  listaGastos.innerHTML = `
    <section class="caixa-alerta">
      <h1>Gastos de ${mesNome}</h1>
      <div class="texto-alerta">
        <p><strong>Atenção:</strong></p>
        <p>Nenhuma despesa encontrada para o mês selecionado. Tente outro período.</p>
      </div>
    </section>
  `;
}

function renderizarGastos(gastos, mesNome) {
  listaGastos.innerHTML = `<h3>Gastos de ${mesNome}</h3>`;

  gastos.forEach((item) => {
    listaGastos.innerHTML += `
      <article class="item-gasto">
        <div class="descricao-gasto">
          <p class="tipo-despesa">${item.tipo_despesa}</p>
          <p class="data-gasto">${item.mes}/${item.ano}</p>
          <p class="valor-gasto">R$ ${item.valor_liquido.toLocaleString("pt-BR", {
            minimumFractionDigits: 2
          })}</p>
          <p class="fornecedor">${item.fornecedor}</p>
        </div>
      </article>
    `;
  });
}
