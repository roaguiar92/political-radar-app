import { DashboardLayout } from "../../layout/dashboard.js";
import { listarDeputados } from '../../api/services/deputados/deputados-service.js';
import { Input } from '../ui/input-component.js';
import { showToast } from '../ui/toast-component.js';
import { DeputadoCard } from '../ui/deputado-card-component.js';
import { Pagination } from '../ui/pagination-component.js';

// Estado interno
let state = {
    currentPage: 1,
    itemsPerPage: 20,
    deputies: [],
    totalPages: 0,
    isLoading: false,
    searchTerm: '',
    searchTimeout: null
};

// Carregar deputados da API
async function loadDeputies() {
    state.isLoading = true;
    renderContent();
    
    try {
        const response = await listarDeputados(
            state.currentPage,
            state.itemsPerPage,
            state.searchTerm || null
        );
        
        state.deputies = response.dados || [];
        
        // Calcular total de páginas
        if (response.total) {
            state.totalPages = Math.ceil(response.total / state.itemsPerPage);
        } else {
            state.totalPages = state.deputies.length < state.itemsPerPage 
                ? state.currentPage 
                : state.currentPage + 1;
        }
        
    } catch (error) {
        console.error('Erro ao carregar deputados:', error);
        showToast(error.message || 'Erro ao carregar deputados', 'error');
        state.deputies = [];
        state.totalPages = 0;
    } finally {
        state.isLoading = false;
        renderContent();
    }
}

// Handler de busca com debounce
function handleSearch(value) {
    state.searchTerm = value;
    state.currentPage = 1;
    
    if (state.searchTimeout) {
        clearTimeout(state.searchTimeout);
    }
    
    state.searchTimeout = setTimeout(() => {
        loadDeputies();
    }, 500);
}

// Handler de mudança de página
function handlePageChange(newPage) {
    if (newPage < 1 || newPage > state.totalPages) return;
    state.currentPage = newPage;
    loadDeputies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderizar conteúdo
function renderContent() {
    const container = document.getElementById('candidates-content');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Header
    const header = document.createElement('div');
    header.className = 'candidates-header';
    
    const title = document.createElement('h1');
    title.className = 'candidates-title';
    title.textContent = 'Deputados';
    header.appendChild(title);
    
    // Input de busca TODO: um componente a parte pra alimentar diferentes páginas/inputs.
    const searchInput = Input({
        id: 'deputy-search',
        type: 'text',
        placeholder: 'Digite o nome do deputado...',
        iconLeft: 'search'
    });
    
    const inputField = searchInput.querySelector('input');
    if (inputField) {
        inputField.value = state.searchTerm;
        inputField.addEventListener('input', (e) => handleSearch(e.target.value));
    }
    
    header.appendChild(searchInput);
    container.appendChild(header);
    
    // Conteúdo principal
    const mainContent = document.createElement('div');
    mainContent.className = 'candidates-main';
    
    if (state.isLoading) {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-state';
        loadingDiv.innerHTML = `
            <span class="material-symbols-outlined" style="font-size: 48px; color: #243343; animation: spin 1s linear infinite;">sync</span>
            <p style="margin-top: 1rem; color: #243343;">Carregando deputados...</p>
        `;
        mainContent.appendChild(loadingDiv);
    } else if (state.deputies.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'empty-state';
        emptyState.innerHTML = `
            <span class="material-symbols-outlined" style="font-size: 64px; color: #999;">search_off</span>
            <p style="margin-top: 1rem; color: #666;">Nenhum deputado encontrado</p>
        `;
        mainContent.appendChild(emptyState);
    } else {
        // Grid de cards
        const grid = document.createElement('div');
        grid.className = 'deputies-grid';
        
        state.deputies.forEach(deputy => {
            grid.appendChild(DeputadoCard(deputy));
        });
        
        mainContent.appendChild(grid);
        
        // Paginação
        if (state.totalPages > 1) {
            const pagination = Pagination({
                currentPage: state.currentPage,
                totalPages: state.totalPages,
                onPageChange: handlePageChange
            });
            mainContent.appendChild(pagination);
        }
    }
    
    container.appendChild(mainContent);
}

export function Candidates() {
    const content = document.createElement('div');
    content.id = 'candidates-content';
    content.className = 'candidates-container';
    
    // Carregar dados iniciais
    loadDeputies();
    
    return DashboardLayout({ children: content });
}