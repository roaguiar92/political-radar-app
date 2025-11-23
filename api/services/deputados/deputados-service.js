import { API_BASE_URL } from "../../api.js";

const API_DEPUTADOS_URL = 'api/v1/deputados';

/**
 * Lista deputados com paginação e filtros opcionais
 * @param {number} pagina - Número da página (padrão: 1)
 * @param {number} itens - Itens por página (padrão: 5, máx: 100)
 * @param {string} nome - Filtro opcional por nome
 * @returns {Promise<Object>} Resposta da API com dados, pagina, itens e total
 */
export async function listarDeputados(pagina = 1, itens = 5, nome = null) {
    try {
        // Construir URL com query parameters
        const params = new URLSearchParams({
            pagina: pagina.toString(),
            itens: itens.toString()
        });
        
        if (nome && nome.trim()) {
            params.append('nome', nome.trim());
        }
        
        const response = await fetch(`${API_BASE_URL}/${API_DEPUTADOS_URL}?${params.toString()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (!response.ok) {
            // FastAPI retorna erros em 'detail', não 'message'
            const errorMessage = data.detail || data.message || 'Erro ao buscar deputados';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
        }
        // Re-lança o erro se já for um Error com mensagem
        throw error;
    }
}

/**
 * Obtém dados detalhados de um deputado específico
 * @param {number} deputadoId - ID do deputado
 * @returns {Promise<Object>} Dados detalhados do deputado
 */
export async function obterDeputado(deputadoId) {
    try {
        const response = await fetch(`${API_BASE_URL}/${API_DEPUTADOS_URL}/${deputadoId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (!response.ok) {
            // FastAPI retorna erros em 'detail', não 'message'
            const errorMessage = data.detail || data.message || 'Deputado não encontrado';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
        }
        // Re-lança o erro se já for um Error com mensagem
        throw error;
    }
}

/**
 * Obtém despesas de um deputado
 * @param {number} deputadoId - ID do deputado
 * @param {number} ano - Ano das despesas (opcional, padrão: ano atual)
 * @returns {Promise<Object>} Dados de despesas do deputado
 */
export async function obterDespesasDeputado(deputadoId, ano = null) {
    try {
        let url = `${API_BASE_URL}/${API_DEPUTADOS_URL}/${deputadoId}/despesas`;
        
        if (ano) {
            url += `?ano=${ano}`;
        }
        
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMessage = data.detail || data.message || 'Erro ao buscar despesas';
            throw new Error(errorMessage);
        }

        return data;
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
        }
        throw error;
    }
}