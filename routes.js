import { Candidates } from './components/dashboard/candidates-page.js';
import { ProjetosePropostas } from './components/dashboard/projetos-e-propostas-page.js';
import { ForgotPasswordForm } from './components/forgot-password-component.js';
import { LoginForm } from './components/login-component.js';
import { RegisterForm } from './components/register/register-component.js';
import { isAuthenticated } from './components/utils/is-auth.js';

// home-despesas
import { HomePage } from './components/dashboard/home-component-page.js';
import { HomeNoticiasPage } from './components/dashboard/home-noticias-page.js';
import { HomeNoticiasDetalhesPage } from './components/dashboard/home-noticias-detalhes-page.js';
import { MonitoramentoDeGastos } from './components/dashboard/monitoramento-de-gastos-page.js';
import { HistoricoPage } from './components/dashboard/historico-page.js';
import { DetalhesDespesasPage } from './components/dashboard/detalhes-despesas-page.js';

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
    container.appendChild(HomePage());
    return container;
  },
  '/historico': () => {
    const container = document.createElement('div');
    container.appendChild(HistoricoPage());
    return container;
  },
  '/detalhes-despesas': () => {
    const container = document.createElement('div');
    container.appendChild(DetalhesDespesasPage());
    return container;
  },
  '/noticias': () => {
    const container = document.createElement('div');
    container.appendChild(HomeNoticiasPage());
    return container;
  },
  '/noticias/detalhes': () => {
    const container = document.createElement('div');
    container.appendChild(HomeNoticiasDetalhesPage());
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
  '/projetos-e-propostas': () => {
    const container = document.createElement('div');
    container.appendChild(ProjetosePropostas());
    return container;
  },
};

// Cria header móvel do dashboard
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

// Renderiza rota atual
export function renderRoute() {
  const contentDiv = document.getElementById('content');
  const path = window.location.hash.replace('#', '') || '/';
  const render = routes[path];

  function isDashboardRoute(path) {
    return !AUTH_ROUTES.includes(path) && path !== '/404';
  }

  // Remove header se não for rota do dashboard
  if (!isDashboardRoute(path)) {
    const header = document.querySelector('.dashboard-header-mobile');
    if (header) header.remove();
  }

  // Rota inexistente -> 404
  if (!render) {
    window.location.hash = '/404';
    return;
  }

  // Bloqueia acesso a rotas do dashboard se não autenticado
  // if (isDashboardRoute(path) && !isAuthenticated()) {
  //   window.location.hash = '/';
  //   return;
  // }

  // Cria header se for rota do dashboard
  if (isDashboardRoute(path)) {
    createMobileHeader();
  }

  // Renderiza o conteúdo
  contentDiv.innerHTML = '';
  contentDiv.appendChild(render());

  // Adiciona ou remove classe de background de autenticação
  document.body.classList.toggle('auth-bg', AUTH_ROUTES.includes(path));
}

// Observa mudanças de hash e carregamento inicial
window.addEventListener('hashchange', renderRoute);
window.addEventListener('DOMContentLoaded', renderRoute);
