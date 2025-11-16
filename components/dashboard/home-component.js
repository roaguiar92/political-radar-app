export function Home() {
    const section = document.createElement('section');
    section.className = 'home-section';

    const title = document.createElement('h2');
    title.textContent = 'Bem-vindo ao Political Radar!';
    section.appendChild(title);

    const info = document.createElement('p');
    info.textContent = 'Você está autenticado.';
    section.appendChild(info);

    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Sair';
    logoutBtn.className = 'login-separator_button-primary';
    logoutBtn.onclick = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.hash = '/';
    };
    section.appendChild(logoutBtn);

    return section;
}