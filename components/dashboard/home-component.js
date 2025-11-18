import { DashboardLayout } from "../../layout/dashboard.js";

export function Home() {
    const content = document.createElement('div');
    content.innerHTML = `
    <h2>Bem-vindo ao Political Radar!</h2>
    <p>Você está autenticado.</p>
    `
    ;
    return DashboardLayout({ title: 'Dashboard', children: content });
}