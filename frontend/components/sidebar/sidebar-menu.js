import { getUserEmail } from "../../layout/dashboard.js";
import { sidebarMenuItems } from "../../layout/sidebar-menu.config.js";

const MOBILE_BREAKPOINT = 768;
const ICON_MENU = 'menu';
const ICON_CLOSE = 'close';

export function SidebarMenu() {
    const nav = createSidebarNav();
    const overlay = getOrCreateOverlay();
    const menuToggleBtn = document.querySelector('.sidebar-menu-toggle');

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function setMenuIcon(isOpen) {
        if (menuToggleBtn) {
            menuToggleBtn.textContent = isMobile() && isOpen ? ICON_CLOSE : ICON_MENU;
        }
    }

    function openMenu() {
        nav.classList.add('open');
        document.body.classList.add('menu-open');
        overlay.style.display = 'block';
        setMenuIcon(true);
    }

    function closeMenu() {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        overlay.style.display = 'none';
        setMenuIcon(false);
    }

    function handleResize() {
        setMenuIcon(nav.classList.contains('open'));
    }

    function handleMenuToggle() {
        if (nav.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function handleNavClick(e) {
        if (e.target.tagName === 'A') {
            closeMenu();
        }
    }

    if (menuToggleBtn) {
        menuToggleBtn.onclick = handleMenuToggle;
        setMenuIcon(nav.classList.contains('open'));
        window.addEventListener('resize', handleResize);
    }

    overlay.onclick = closeMenu;
    overlay.addEventListener('touchmove', closeMenu);
    nav.addEventListener('click', handleNavClick);

    return nav;
}

// Função para criar o nav do sidebar
function createSidebarNav() {
    const nav = document.createElement('nav');
    nav.className = 'dashboard-sidebar';

    nav.appendChild(createMenuList());
    nav.appendChild(createUserBlock());

    return nav;
}

// Função para criar a lista de menus
function createMenuList() {
    const ul = document.createElement('ul');
    ul.className = 'sidebar-menu-list';

    sidebarMenuItems
        .filter(item => item.action !== 'logout')
        .forEach(item => ul.appendChild(createMenuItem(item)));

    return ul;
}

function createMenuItem(item) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.innerHTML = `<span class="material-symbols-outlined">${item.icon}</span> ${item.title}`;
    li.appendChild(a);
    return li;
}

// Função para criar o bloco do usuário
function createUserBlock() {
    const userBlock = document.createElement('div');
    userBlock.className = 'sidebar-user-block';

    const email = getUserEmail();
    const userText = document.createElement('span');
    userText.className = 'dashboard-user-email';
    userText.textContent = email ? `Olá, ${email}` : '';

    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'logout-btn';
    logoutBtn.innerHTML = `<span class="material-symbols-outlined">logout</span> Sair`;
    logoutBtn.onclick = handleLogout;

    userBlock.appendChild(userText);
    userBlock.appendChild(logoutBtn);

    return userBlock;
}

// Função para logout
function handleLogout() {
    try {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.hash = '/';
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}

// Função para criar ou obter o overlay
function getOrCreateOverlay() {
    let overlay = document.querySelector('.dashboard-sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'dashboard-sidebar-overlay';
        overlay.style.display = 'none';
        document.body.appendChild(overlay);
    }
    return overlay;
}