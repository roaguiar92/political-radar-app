async function carregarGastos() {
  const seletorAno = document.querySelector(".filtros-historico select:nth-child(1)");
  const anoSelecionado = seletorAno.value;

  // URL da API
  const url = `https://radar-politico-api.onrender.com/api/v1/gastos/top?ano=${anoSelecionado}&limite=10`;

  try {
    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new Error("Erro ao buscar dados");
    }

    const dados = await resposta.json();
    console.log(dados); // veja no console os dados

    preencherLista(dados.resultados);
  } 
  catch (erro) {
    console.error("Erro:", erro);
  }
}

function preencherLista(lista) {
  const container = document.querySelector(".lista-gastos");
  
  // Limpa o conteúdo atual
  container.innerHTML = `<h3>Gastos do Ano</h3>`;

  lista.forEach(item => {
    const artigo = document.createElement("article");
    artigo.classList.add("item-gasto");

    artigo.innerHTML = `
      <div class="descricao-gasto">
        <p class="tipo-despesa">${item.deputado_nome}</p>
        <p class="data-gasto">${item.sigla_partido} - ${item.sigla_uf}</p>
        <p class="valor-gasto">R$ ${item.total_gastos.toLocaleString("pt-BR")}</p>
      </div>
      <a href="detalhes.html" class="botao-detalhes">Ver detalhes</a>
    `;

    container.appendChild(artigo);
  });

  container.innerHTML += `<a href="#" class="botao-ver-mais">Ver mais</a>`;
}

// Atualiza ao trocar o ano
document.querySelector(".filtros-historico").addEventListener("change", carregarGastos);

// Carrega automaticamente ao abrir a página
carregarGastos();
