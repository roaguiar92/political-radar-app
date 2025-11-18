import { DashboardLayout } from "../../layout/dashboard.js";

export function Candidates() {
    const content = document.createElement('div');
    content.innerHTML = `
    <h2>Página de Teste</h2>
    <p>Esta é uma página de teste dentro da dashboard.</p>
    `
        ;
    return DashboardLayout({ children: content });
}