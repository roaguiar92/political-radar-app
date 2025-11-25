import { DashboardLayout } from "../../layout/dashboard.js";

export function Home() {
    const content = document.createElement('div');
    content.innerHTML = `


     <img src="../../assets/login/img-boas-vindas.svg" class="img-home-animada" />
    <h2 class="pagina-home-h2">Bem-vindo ao Political Radar!</h2>
    <p class="p">Sua ferramenta para monitorar políticos, gastos e propostas.</p>

    `
    ;
    return DashboardLayout({ title: 'Dashboard', children: content });
}