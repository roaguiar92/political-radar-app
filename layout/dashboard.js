import { SidebarMenu } from "../components/sidebar/sidebar-menu.js";

export function getUserEmail() {
    const token = localStorage.getItem('access_token');
    if (!token) return '';
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.email || '';
    } catch {
        return '';
    }
}

export function DashboardLayout({ children }) {
    const container = document.createElement('div');
    container.className = 'dashboard-container';

    const mainArea = document.createElement('div');
    mainArea.className = 'dashboard-main-area';

    const sidebar = SidebarMenu({});
    mainArea.appendChild(sidebar);

    const content = document.createElement('main');
    content.className = 'dashboard-content';
    if (children) content.appendChild(children);
    mainArea.appendChild(content);

    container.appendChild(mainArea);

    return container;
}