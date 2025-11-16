import { ForgotPasswordForm } from './components/forgot-password-component.js';
import { LoginForm } from './components/login-component.js';
import { RegisterForm } from './components/register-component.js';

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
};

export function renderRoute() {
    const contentDiv = document.getElementById('content');
    const path = window.location.hash.replace('#', '') || '/';
    const render = routes[path] || routes['/'];
    contentDiv.innerHTML = '';
    contentDiv.appendChild(render());

    if (['/', '/forgot-password', '/cadastro'].includes(path)) {
        document.body.classList.add('auth-bg');
    } else {
        document.body.classList.remove('auth-bg');
    }
}

window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);