import { Candidates } from './components/dashboard/candidates-page.js';
import { Home } from './components/dashboard/home-component.js';
import { MonitoramentoDeGastos } from './components/dashboard/monitoramento-de-gastos-page.js';
import { ForgotPasswordForm } from './components/forgot-password-component.js';
import { LoginForm } from './components/login-component.js';
import { RegisterForm } from './components/register/register-component.js';
import { isAuthenticated } from './components/utils/is-auth.js';

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

    const dashboardRoutes = ['/home', '/candidates', '/monitoramento-de-gastos'];

    if (dashboardRoutes.includes(path)) {
        createMobileHeader();
    } else {
        const header = document.querySelector('.dashboard-header-mobile');
        if (header) header.remove();
    }

    if (!render) {
        window.location.hash = '/404';
        return;
    }

    if (path === '/home' && !isAuthenticated()) {
        window.location.hash = '/';
        return;
    }

    contentDiv.innerHTML = '';
    contentDiv.appendChild(render());

    const authRoutes = ['/', '/forgot-password', '/cadastro', '/monitoramento-de-gastos'];
    document.body.classList.toggle('auth-bg', authRoutes.includes(path));
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);