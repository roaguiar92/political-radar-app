import { DashboardLayout } from "../../layout/dashboard.js";

export function MonitoramentoDeGastos() {
    const content = document.createElement('div');
    content.innerHTML = `
    <h2>Página de Monitoramento</h2><p>Esta é uma página de teste dentro da dashboard.</p>
    `
        ;
    return DashboardLayout({ children: content });
}