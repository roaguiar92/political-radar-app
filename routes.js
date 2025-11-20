import { Candidates } from './components/dashboard/candidates-page.js';
import { Home } from './components/dashboard/home-component.js';
import { MonitoramentoDeGastos } from './components/dashboard/monitoramento-de-gastos-page.js';
import { ForgotPasswordForm } from './components/forgot-password-component.js';
import { LoginForm } from './components/login-component.js';
import { RegisterForm } from './components/register/register-component.js';
import { isAuthenticated } from './components/utils/is-auth.js';

const AUTH_ROUTES = ['/', '/forgot-password', '/cadastro'];

export const routes = {
    '/': () => {
        const container = document.createElement('div');
        container.className = 'card-section_container';
        container.appendChild(LoginForm());
        return container;
    },
    '/forgot-password': () => {
        const container = document.createElement('div');
        container.className = 'card-section_container';
        container.appendChild(ForgotPasswordForm());
        return container;
    },
    '/cadastro': () => {
        const container = document.createElement('div');
        container.className = 'card-section_container';
        container.appendChild(RegisterForm());
        return container;
    },
    '/home': () => {
        const container = document.createElement('div');
        container.appendChild(Home());
        return container;
    },
    '/404': () => {
        const div = document.createElement('div');
        div.className = 'not-found';
        div.innerHTML = '<h2>Página não encontrada</h2><p>O endereço acessado não existe.</p>';
        return div;
    },
    '/candidates': () => {
        const container = document.createElement('div');
        container.appendChild(Candidates());
        return container;
    },
    '/monitoramento-de-gastos': () => {
        const container = document.createElement('div');
        container.appendChild(MonitoramentoDeGastos());
        return container;
    },
};

function createMobileHeader() {
    if (document.querySelector('.dashboard-header-mobile')) return;
    const header = document.createElement('header');
    header.className = 'dashboard-header-mobile';

    const button = document.createElement('button');
    button.className = 'sidebar-menu-toggle material-symbols-outlined';
    button.setAttribute('aria-label', 'Abrir menu');
    button.textContent = 'menu';

    header.appendChild(button);
    document.body.prepend(header);
}

export function renderRoute() {
    const contentDiv = document.getElementById('content');
    const path = window.location.hash.replace('#', '') || '/';
    const render = routes[path];


    function isDashboardRoute(path) {
        return !AUTH_ROUTES.includes(path) && path !== '/404';
    }

    //Remove header mobile se não for dashboard
    if (!isDashboardRoute(path)) {
        const header = document.querySelector('.dashboard-header-mobile');
        if (header) header.remove();
    }

    // Redireciona para 404 se rota não existe
    if (!render) {
        window.location.hash = '/404';
        return;
    }

    // Bloqueia acesso a rotas protegidas se não autenticado
    if (isDashboardRoute(path) && !isAuthenticated()) {
        window.location.hash = '/';
        return;
    }

    // Cria header mobile se for dashboard
    if (isDashboardRoute(path)) {
        createMobileHeader();
    }

    contentDiv.innerHTML = '';
    contentDiv.appendChild(render());

    document.body.classList.toggle('auth-bg', AUTH_ROUTES.includes(path));
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);