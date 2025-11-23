import { DashboardLayout } from "../../layout/dashboard.js";
import "../layout/detalhes-despesas.css";

export function DetalhesDespesasPage() {
  // Cria o container principal da página
  const content = document.createElement('div');
  content.classList.add("pagina-detalhes-despesas");

  // Injeta o HTML da página
  content.innerHTML = `
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

          <div class="icon-pdf">
            <img src="icons/Pdf.png" alt="">
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
