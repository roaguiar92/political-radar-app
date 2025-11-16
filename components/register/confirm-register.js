export function RegisterSuccess(email) {
    const container = document.createElement('div');
    container.className = 'card-section_container';

    const section = document.createElement('section');
    section.className = 'card-section_login';

    const logo = document.createElement('img');
    logo.src = 'assets/login/logo-radar.svg';
    logo.alt = 'Logo Radar';
    section.appendChild(logo);

    const title = document.createElement('h2');
    title.textContent = 'Verifique seu email';
    title.style.textAlign = 'center';
    section.appendChild(title);

    const info = document.createElement('p');
    info.innerHTML = `Enviamos um link de ativação para <b>${email}</b>.<br>Se não o encontrar, verifique a pasta de spam.`;
    info.style.margin = '1.5rem 0';
    info.style.fontSize = '16px';
    section.appendChild(info);

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Sair';
    backBtn.className = 'login-separator_button-primary';
    backBtn.style.marginTop = '2.5rem';
    backBtn.onclick = () => {
        window.location.hash = '/';
    };
    section.appendChild(backBtn);

    container.appendChild(section);
    return container;
}