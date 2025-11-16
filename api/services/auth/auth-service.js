import { API_BASE_URL } from "../../api.js";

const API_AUTH_URL = 'api/v1/auth'

export async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/${API_AUTH_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'email ou senha inválidos');
        }
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
        }
        throw new Error(error.message || 'Erro inesperado ao fazer login.');
    }
}

export async function register(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/${API_AUTH_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Email ou senha inválidos');
        }
        return await response.json();
    } catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
        }
        throw new Error(error.message || 'Erro inesperado ao cadastrar.');
    }
}