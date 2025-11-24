import { DashboardLayout } from "../../layout/dashboard.js";
import { obterDeputado, obterDespesasDeputado } from '../../api/services/deputados/deputados-service.js';
import { showToast } from '../ui/toast-component.js';
import { Button } from '../ui/button-component.js';

// Estado interno
let state = {
    deputado: null,
    despesas: null,
    isLoading: true,
    error: null
};

// Extrair ID do deputado da URL
function getDeputadoIdFromUrl() {
    const hash = window.location.hash;
    const match = hash.match(/\/candidates\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;

}

// Carregar dados do deputado
// Carregar dados do deputado
async function loadDeputado() {
    const deputadoId = getDeputadoIdFromUrl();
    console.log('Carregando deputado com ID:', deputadoId)
    
    if (!deputadoId) {
        state.error = 'ID do deputado não encontrado na URL';
        state.isLoading = false;
        renderContent();
        return;
    }
    
    state.isLoading = true;
    state.error = null;
    renderContent();
    
    try {
        const anoAtual = new Date().getFullYear();
        
        // Carregar deputado e despesas em paralelo
        const [dadosDeputado, dadosDespesas] = await Promise.all([
            obterDeputado(deputadoId),
            obterDespesasDeputado(deputadoId, anoAtual).catch(() => null)
        ]);
        
        state.deputado = dadosDeputado;
        state.despesas = dadosDespesas;
    } catch (error) {
        console.error('Erro ao carregar deputado:', error);
        state.error = error.message || 'Erro ao carregar dados do deputado';
        showToast(state.error, 'error');
    } finally {
        state.isLoading = false;
        renderContent();
    }
}

// Renderizar conteúdo
function renderContent() {
    const container = document.getElementById('about-candidate-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Botão voltar
    const backButton = Button({
        text: '← Voltar para Deputados',
        className: 'back-button',
        type: 'button'
    });
    backButton.onclick = () => {
        window.location.hash = '#/candidates';
    };
    container.appendChild(backButton);
    
    if (state.isLoading) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-state';
        loadingDiv.innerHTML = `
            <span class="material-symbols-outlined" style="font-size: 48px; color: #243343; animation: spin 1s linear infinite;">sync</span>
            <p style="margin-top: 1rem; color: #243343;">Carregando dados do deputado...</p>
        `;
        container.appendChild(loadingDiv);
        return;
    }
    
    if (state.error || !state.deputado) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-state';
        errorDiv.innerHTML = `
            <span class="material-symbols-outlined" style="font-size: 64px; color: #e53935;">error_outline</span>
            <p style="margin-top: 1rem; color: #666;">${state.error || 'Deputado não encontrado'}</p>
        `;
        container.appendChild(errorDiv);
        return;
    }
    
    const deputado = state.deputado;
    
    // Container principal do card
    const cardContainer = document.createElement('div');
    cardContainer.className = 'candidate-detail-container';
    
    // Header com foto e nome principal
    const header = document.createElement('div');
    header.className = 'candidate-detail-header';
    
    // Foto grande
    const photoFrame = document.createElement('div');
    photoFrame.className = 'candidate-detail-photo-frame';
    
    const photoContainer = document.createElement('div');
    photoContainer.className = 'candidate-detail-photo';
    
    if (deputado.url_foto) {
        const img = document.createElement('img');
        img.src = deputado.url_foto;
        img.alt = deputado.nome || 'Foto do deputado';
        img.onerror = function() {
            photoContainer.innerHTML = '<span class="material-symbols-outlined">person</span>';
        };
        photoContainer.appendChild(img);
    } else {
        photoContainer.innerHTML = '<span class="material-symbols-outlined">person</span>';
    }
    
    photoFrame.appendChild(photoContainer);
    header.appendChild(photoFrame);
    
    // Nome e partido
    const nameSection = document.createElement('div');
    nameSection.className = 'candidate-detail-name-section';
    
    const name = document.createElement('h1');
    name.className = 'candidate-detail-name';
    name.textContent = deputado.nome || 'Nome não disponível';
    
    const partyInfo = document.createElement('div');
    partyInfo.className = 'candidate-detail-party';
    const partyParts = [];
    if (deputado.sigla_partido) partyParts.push(deputado.sigla_partido);
    if (deputado.sigla_uf) partyParts.push(deputado.sigla_uf);
    partyInfo.textContent = partyParts.join(' • ') || 'Sem informações';
    
    nameSection.appendChild(name);
    nameSection.appendChild(partyInfo);
    header.appendChild(nameSection);
    
    cardContainer.appendChild(header);
    
    // Menu de informações detalhadas
    const infoMenu = document.createElement('div');
    infoMenu.className = 'candidate-detail-menu';
    
    // Email
    if (deputado.email) {
        const emailItem = createInfoItem('mail', 'Email', deputado.email);
        infoMenu.appendChild(emailItem);
    }
    
    // Data de nascimento
    if (deputado.data_nascimento) {
        const formattedDate = formatDate(deputado.data_nascimento);
        const birthItem = createInfoItem('calendar_today', 'Data de Nascimento', formattedDate);
        infoMenu.appendChild(birthItem);
    }
    
    // Escolaridade
    if (deputado.escolaridade) {
        const eduItem = createInfoItem('school', 'Escolaridade', deputado.escolaridade);
        infoMenu.appendChild(eduItem);
    }
    
    // Município de nascimento
    if (deputado.municipio_nascimento) {
        const cityItem = createInfoItem('location_on', 'Cidade de Nascimento', deputado.municipio_nascimento);
        infoMenu.appendChild(cityItem);
    }
    
    // UF de nascimento
    if (deputado.uf_nascimento) {
        const ufItem = createInfoItem('place', 'UF de Nascimento', deputado.uf_nascimento);
        infoMenu.appendChild(ufItem);
    }
    
    cardContainer.appendChild(infoMenu);

// seção de despesas

cardContainer.appendChild(infoMenu);
    
// Seção de despesas (ano vigente)
if (state.despesas && state.despesas.total_gastos !== undefined) {
    const despesasSection = document.createElement('div');
    despesasSection.className = 'candidate-despesas-section';
    
    const despesasTitle = document.createElement('h2');
    despesasTitle.className = 'candidate-despesas-title';
    despesasTitle.textContent = `Despesas ${state.despesas.ano || new Date().getFullYear()}`;
    
    const totalGastos = document.createElement('div');
    totalGastos.className = 'candidate-total-gastos';
    const valorFormatado = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(state.despesas.total_gastos);
    totalGastos.textContent = valorFormatado;
    
    despesasSection.appendChild(despesasTitle);
    despesasSection.appendChild(totalGastos);
    cardContainer.appendChild(despesasSection);
}


    container.appendChild(cardContainer);
}

// Criar item de informação
function createInfoItem(icon, label, value) {
    const item = document.createElement('div');
    item.className = 'candidate-detail-menu-item';
    
    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-symbols-outlined';
    iconSpan.textContent = icon;
    
    const labelSpan = document.createElement('span');
    labelSpan.className = 'candidate-detail-menu-label';
    labelSpan.textContent = label + ':';
    
    const valueSpan = document.createElement('span');
    valueSpan.className = 'candidate-detail-menu-value';
    valueSpan.textContent = value;
    
    item.appendChild(iconSpan);
    item.appendChild(labelSpan);
    item.appendChild(valueSpan);
    
    return item;
}

// Formatar data
function formatDate(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    } catch {
        return dateString;
    }
}

export function AboutCandidate() {
    const content = document.createElement('div');
    content.id = 'about-candidate-content';
    content.className = 'about-candidate-container';
    
    // Carregar dados quando o componente é montado
    loadDeputado();
    
    // Recarregar se a URL mudar (navegação entre candidatos)
    window.addEventListener('hashchange', () => {
        if (window.location.hash.match(/\/candidates\/\d+/) && document.getElementById('about-candidate-content')) {
            loadDeputado();
        }
    });
    
    return DashboardLayout({ children: content });
}